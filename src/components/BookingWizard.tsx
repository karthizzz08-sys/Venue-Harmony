import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/lib/bookingStore';
import {
  hallDurations, extras, photoPackages, decorationItems, eventPackage, formatPrice,
} from '@/lib/bookingData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Upload, MessageCircle, ClipboardList, UserCircle, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import paymentQr from '@/assets/payment-qr.jpeg';

const WHATSAPP_NUMBER = '919876543210';

const BookingWizard = () => {
  const [step, setStep] = useState(0);
  const store = useBookingStore();

  const hallPrice = store.hallDuration
    ? hallDurations.find(d => d.id === store.hallDuration)?.price ?? 0
    : 0;
  const extrasPrice = store.selectedExtras.reduce((sum, id) => {
    const e = extras.find(x => x.id === id);
    return sum + (e?.price ?? 0);
  }, 0);
  const photoPrice = store.photoPackageId
    ? (() => {
        const pkg = photoPackages.find(p => p.id === store.photoPackageId);
        return store.photoEventCount === 1 ? pkg?.pricePerEvent ?? 0 : pkg?.priceFor2Events ?? 0;
      })()
    : 0;
  const decorPrice = store.selectedDecorations.reduce((sum, id) => {
    const d = decorationItems.find(x => x.id === id);
    return sum + (d?.price ?? 0);
  }, 0);
  const eventPrice = store.eventSelected ? store.eventGuestCount * eventPackage.pricePerHead : 0;
  const totalPrice = hallPrice + extrasPrice + photoPrice + decorPrice + eventPrice;
  const advanceAmount = Math.round(totalPrice * 0.1);

  const getSelectionSummary = () => {
    const items: string[] = [];
    if (store.hallDuration) {
      const h = hallDurations.find(d => d.id === store.hallDuration);
      items.push(`Hall: ${h?.label}`);
    }
    store.selectedExtras.forEach(id => {
      const e = extras.find(x => x.id === id);
      if (e) items.push(`Extra: ${e.label}`);
    });
    if (store.photoPackageId) {
      const p = photoPackages.find(x => x.id === store.photoPackageId);
      items.push(`Photography: ${p?.name} (${store.photoEventCount} event${store.photoEventCount > 1 ? 's' : ''})`);
    }
    store.selectedDecorations.forEach(id => {
      const d = decorationItems.find(x => x.id === id);
      if (d) items.push(`Decoration: ${d.name}`);
    });
    if (store.eventSelected) {
      items.push(`Event Package: ${store.eventGuestCount} guests`);
    }
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
      totalAmount: totalPrice,
      advanceAmount,
      status: 'confirmed' as const,
      selections,
    };
    store.addBooking(booking);

    const msg = encodeURIComponent(
      `🏛️ *Sikara Mahal Booking*\n\n` +
      `👤 Name: ${store.customerName}\n` +
      `📱 Phone: ${store.customerPhone}\n` +
      `📧 Email: ${store.customerEmail || 'N/A'}\n` +
      `📅 Date: ${booking.date}\n\n` +
      `📋 *Selections:*\n${selections.map(s => `• ${s}`).join('\n')}\n\n` +
      `💰 *Total: ${formatPrice(totalPrice)}*\n` +
      `💳 *Advance (10%): ${formatPrice(advanceAmount)}*\n` +
      `🧾 Transaction ID: ${store.transactionId}\n\n` +
      (store.paymentScreenshot ? `📎 Payment screenshot: ${store.paymentScreenshot.name}\n\n` : '') +
      `Please confirm my booking. Thank you!`
    );

    // If screenshot exists, try sharing via Web Share API
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
      } catch (err) {
        // User cancelled or share failed, fall through to WhatsApp link
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

  if (totalPrice === 0) {
    return (
      <section id="booking" className="py-20 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="section-title">Book Now</h2>
          <p className="text-muted-foreground mt-4">
            Please select at least one package above to start your booking.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4">
      <div className="container max-w-2xl mx-auto">
        <h2 className="section-title text-center mb-8">Book Now</h2>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i <= step && setStep(i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    i === step
                      ? 'gradient-violet text-primary-foreground shadow-lg'
                      : i < step
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8"
          >
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
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary text-2xl">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
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
                <div>
                  <label className="text-sm font-semibold text-foreground">Event Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal mt-1", !store.eventDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {store.eventDate ? format(store.eventDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={store.eventDate ?? undefined}
                        onSelect={(d) => store.setEventDate(d ?? null)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Pay Advance</h3>
                <p className="text-muted-foreground">
                  Pay <span className="font-bold text-primary">{formatPrice(advanceAmount)}</span> (10% advance) via UPI
                </p>

                <div className="bg-muted rounded-xl p-6 text-center">
                  <img
                    src={paymentQr}
                    alt="UPI Payment QR Code - KARTHI.M"
                    className="w-56 h-auto mx-auto rounded-lg"
                    loading="lazy"
                    width={224}
                    height={280}
                  />
                  <p className="text-sm text-muted-foreground mt-3">Scan to pay via any UPI app</p>
                  <p className="text-xs text-muted-foreground mt-1">UPI ID: karthiweb495@okaxis</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">Upload Payment Screenshot *</label>
                  <label className="mt-2 flex items-center gap-3 p-4 bg-muted rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {store.paymentScreenshot ? store.paymentScreenshot.name : 'Click to upload screenshot'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => store.setPaymentScreenshot(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">Transaction ID *</label>
                  <Input
                    value={store.transactionId}
                    onChange={e => store.setTransactionId(e.target.value)}
                    placeholder="Enter UPI Transaction ID"
                    className="mt-1"
                  />
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
                  <p><span className="font-semibold">Total:</span> {formatPrice(totalPrice)}</p>
                  <p><span className="font-semibold">Advance:</span> {formatPrice(advanceAmount)}</p>
                  <p><span className="font-semibold">Txn ID:</span> {store.transactionId}</p>
                  {store.paymentScreenshot && (
                    <p><span className="font-semibold">Screenshot:</span> {store.paymentScreenshot.name} ✅</p>
                  )}
                </div>
                <Button
                  onClick={handleSubmit}
                  className="gradient-violet text-primary-foreground px-8 py-6 text-lg rounded-full"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Submit & Send to WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          {step < 3 && (
            <Button
              onClick={() => setStep(s => Math.min(3, s + 1))}
              className="gradient-violet text-primary-foreground"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingWizard;
