import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/lib/bookingStore';
import {
  hallDurations, photoPackages, decorationItems, eventItems,
  salonPackages, cateringPackages, formatPrice,
} from '@/lib/bookingData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Check, ChevronLeft, ChevronRight, Upload, MessageCircle, ClipboardList, UserCircle, CreditCard, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import paymentQr from '@/assets/payment-qr.jpeg';

const WHATSAPP_NUMBER = '919698678450';

const BookingWizard = () => {
  const [step, setStep] = useState(0);
  const store = useBookingStore();

  // Hall
  const hallPrice = store.hallDuration
    ? hallDurations.find(d => d.id === store.hallDuration)?.price ?? 0
    : 0;
  const hallTiming = store.hallDuration
    ? hallDurations.find(d => d.id === store.hallDuration)?.timing ?? ''
    : '';
  // Photo
  const photoPrice = store.photoPackageId
    ? (() => {
        const pkg = photoPackages.find(p => p.id === store.photoPackageId);
        return store.photoEventCount === 1 ? pkg?.pricePerEvent ?? 0 : pkg?.priceFor2Events ?? 0;
      })()
    : 0;
  // Decor
  const decorPrice = store.selectedDecorations.reduce((sum, id) => sum + (decorationItems.find(x => x.id === id)?.price ?? 0), 0);
  // Salon (Bridal)
  const salonTotal = store.selectedSalonIds.reduce((sum, id) => sum + (salonPackages.find(x => x.id === id)?.price ?? 0), 0);
  // Catering
  const cateringTotal = store.selectedCatering.reduce((sum, sel) => {
    const pkg = cateringPackages.find(x => x.id === sel.packageId);
    return sum + (pkg ? pkg.pricePerHead * sel.headCount : 0);
  }, 0);
  // Event items
  const eventTotal = store.selectedEventItems.reduce((sum, sel) => {
    const item = eventItems.find(x => x.id === sel.id);
    return sum + (item ? item.basePrice * sel.qty : 0);
  }, 0);

  // DJ price (from event items)
  const djEventIds = ['dj-dance', 'chariot-entry'];
  const djTotal = store.selectedEventItems
    .filter(sel => djEventIds.includes(sel.id))
    .reduce((sum, sel) => {
      const item = eventItems.find(x => x.id === sel.id);
      return sum + (item ? item.basePrice * sel.qty : 0);
    }, 0);

  // Discount: 10% on (bridal + events + DJ) if >= ₹3,00,000
  const discountableTotal = salonTotal + eventTotal + djTotal  +photoPrice + decorPrice + hallPrice + cateringTotal ;
  const combinedDiscount = discountableTotal >= 300000 ? Math.round(discountableTotal * 0.3) : 0;

  const grandTotal = hallPrice + photoPrice + decorPrice + salonTotal + cateringTotal + eventTotal - combinedDiscount;
  const advanceAmount = Math.round(grandTotal * 0.1);

  const getSelectionSummary = () => {
    const items: string[] = [];
    if (store.hallDuration) {
      const h = hallDurations.find(d => d.id === store.hallDuration);
      items.push(`Hall: ${h?.label} (${h?.timing})`);
    }
    if (store.photoPackageId) {
      const p = photoPackages.find(x => x.id === store.photoPackageId);
      items.push(`Photography: ${p?.name} (${store.photoEventCount} event${store.photoEventCount > 1 ? 's' : ''})`);
    }
    store.selectedDecorations.forEach(id => {
      const d = decorationItems.find(x => x.id === id);
      if (d) items.push(`Decoration: ${d.name}`);
    });
    store.selectedSalonIds.forEach(id => {
      const s = salonPackages.find(x => x.id === id);
      if (s) items.push(`Bridal Makeup: ${s.name}`);
    });
    store.selectedCatering.forEach(sel => {
      const c = cateringPackages.find(x => x.id === sel.packageId);
      if (c) items.push(`Catering: ${c.name} x${sel.headCount} heads = ${formatPrice(c.pricePerHead * sel.headCount)}`);
    });
    store.selectedEventItems.forEach(sel => {
      const e = eventItems.find(x => x.id === sel.id);
      if (e) items.push(`Event: ${e.name} x${sel.qty}`);
    });
    if (combinedDiscount > 0) items.push(`Discount (10% on Bridal+Events+DJ+h
      
      ): -${formatPrice(combinedDiscount)}`);
    return items;
  };

  const handleSubmit = async () => {
    if (!store.customerName || !store.customerPhone || !store.transactionId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selections = getSelectionSummary();
    const booking = {
      id: Date.now().toString(),
      date: store.eventDate ? format(store.eventDate, 'dd/MM/yyyy') : 'TBD',
      customerName: store.customerName,
      phone: store.customerPhone,
      totalAmount: grandTotal,
      advanceAmount,
      status: 'confirmed' as const,
      selections,
      discount: combinedDiscount,
    };
    store.addBooking(booking);

    const msg = encodeURIComponent(
      `🏛️ *Sikara Mahal Booking*\n\n` +
      `👤 Name: ${store.customerName}\n` +
      `📱 Phone: ${store.customerPhone}\n` +
      `📧 Email: ${store.customerEmail || 'N/A'}\n` +
      `📅 Date: ${booking.date}\n` +
      (hallTiming ? `⏰ Timing: ${hallTiming}\n` : '') +
      `\n📋 *Selections:*\n${selections.map(s => `• ${s}`).join('\n')}\n\n` +
      `💰 *Total: ${formatPrice(grandTotal)}*\n` +
      `💳 *Advance (10%): ${formatPrice(advanceAmount)}*\n` +
      `🧾 Transaction ID: ${store.transactionId}\n\n` +
      (store.paymentScreenshot ? `📎 Payment screenshot: ${store.paymentScreenshot.name}\n\n` : '') +
      `Please confirm my booking. Thank you!`
    );

    if (store.paymentScreenshot && navigator.share && navigator.canShare) {
      try {
        const file = store.paymentScreenshot;
        const shareData = {
          text: decodeURIComponent(msg),
          files: [new File([file], file.name, { type: file.type })],
        };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success('Booking submitted! Screenshot shared.');
          store.resetSelections();
          setStep(0);
          return;
        }
      } catch {
        // fall through
      }
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    toast.success('Booking submitted! Redirecting to WhatsApp...');
    store.resetSelections();
    setStep(0);
  };

  const steps = [
    { title: 'Review', icon: ClipboardList },
    { title: 'Details', icon: UserCircle },
    { title: 'Payment', icon: CreditCard },
    { title: 'Confirm', icon: CheckCircle2 },
  ];

  if (grandTotal === 0) {
    return (
      <section id="booking" className="py-20 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="section-title">Book Now</h2>
          <p className="text-muted-foreground mt-4">Please select at least one package above to start your booking.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4">
      <div className="container max-w-2xl mx-auto">
        <h2 className="section-title text-center mb-8">Book Now</h2>

        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i <= step && setStep(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    i === step ? 'gradient-violet text-primary-foreground shadow-lg'
                    : i < step ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </button>
                {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-8">
            {step === 0 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Your Selections</h3>
                <ul className="space-y-3 mb-6">
                  {getSelectionSummary().map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <span className="text-primary">✓</span> {s}
                    </li>
                  ))}
                </ul>
                {hallTiming && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Timing</span>
                    <span className="font-semibold text-foreground">{hallTiming}</span>
                  </div>
                )}
                {store.eventDate && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Event Date</span>
                    <span className="font-semibold text-foreground">{format(store.eventDate, 'PPP')}</span>
                  </div>
                )}
                <div className="border-t border-border pt-4 space-y-2">
                  {combinedDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount (10% on overall)</span>
                      <span className="font-semibold text-destructive">-{formatPrice(combinedDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-foreground">Grand Total</span>
                    <span className="font-bold text-primary text-2xl">{formatPrice(grandTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Advance (10%)</span>
                    <span className="font-semibold text-foreground">{formatPrice(advanceAmount)}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Your Details</h3>
                <div>
                  <label className="text-sm font-semibold text-foreground">Name *</label>
                  <Input value={store.customerName} onChange={e => store.setCustomerName(e.target.value)} placeholder="Enter your full name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Phone *</label>
                  <Input value={store.customerPhone} onChange={e => store.setCustomerPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Email</label>
                  <Input value={store.customerEmail} onChange={e => store.setCustomerEmail(e.target.value)} placeholder="your@email.com" className="mt-1" />
                </div>
                {store.eventDate && (
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm font-semibold text-foreground">📅 Selected Event Date: {format(store.eventDate, 'PPP')}</p>
                    <p className="text-xs text-muted-foreground mt-1">Selected from availability checker</p>
                  </div>
                )}
                {!store.eventDate && (
                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <p className="text-sm font-semibold text-destructive">⚠️ Please select a date from the Availability Checker above</p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Pay Advance</h3>
                <p className="text-muted-foreground">
                  Pay <span className="font-bold text-primary">{formatPrice(advanceAmount)}</span> (10% advance) via UPI
                </p>
                <div className="bg-muted rounded-xl p-6 text-center">
                  <img src={paymentQr} alt="UPI Payment QR Code" className="w-56 h-auto mx-auto rounded-lg" loading="lazy" width={224} height={280} />
                  <p className="text-sm text-muted-foreground mt-3">Scan to pay via any UPI app</p>
                  <p className="text-xs text-muted-foreground mt-1">UPI ID: s.karthikkumar2008-3@okhdfcbank</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Upload Payment Screenshot *</label>
                  <label className="mt-2 flex items-center gap-3 p-4 bg-muted rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {store.paymentScreenshot ? store.paymentScreenshot.name : 'Click to upload screenshot'}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => store.setPaymentScreenshot(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">Transaction ID *</label>
                  <Input value={store.transactionId} onChange={e => store.setTransactionId(e.target.value)} placeholder="Enter UPI Transaction ID" className="mt-1" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <h3 className="font-display text-2xl font-bold text-foreground">Confirm & Send to WhatsApp</h3>
                <div className="text-left bg-muted rounded-xl p-6 space-y-2">
                  <p><span className="font-semibold">Name:</span> {store.customerName}</p>
                  <p><span className="font-semibold">Phone:</span> {store.customerPhone}</p>
                  <p><span className="font-semibold">Date:</span> {store.eventDate ? format(store.eventDate, 'PPP') : 'TBD'}</p>
                  {hallTiming && <p><span className="font-semibold">Timing:</span> {hallTiming}</p>}
                  <p><span className="font-semibold">Total:</span> {formatPrice(grandTotal)}</p>
                  {combinedDiscount > 0 && <p><span className="font-semibold">Discount:</span> -{formatPrice(combinedDiscount)}</p>}
                  <p><span className="font-semibold">Advance:</span> {formatPrice(advanceAmount)}</p>
                  <p><span className="font-semibold">Txn ID:</span> {store.transactionId}</p>
                  {store.paymentScreenshot && <p><span className="font-semibold">Screenshot:</span> {store.paymentScreenshot.name} ✅</p>}
                </div>
                <Button onClick={handleSubmit} className="gradient-violet text-primary-foreground px-8 py-6 text-lg rounded-full" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Submit & Send to WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          {step < 3 && (
            <Button onClick={() => setStep(s => Math.min(3, s + 1))} className="gradient-violet text-primary-foreground">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingWizard;
