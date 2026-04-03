import { motion } from 'framer-motion';
import { useBookingStore, BookingRecord } from '@/lib/bookingStore';
import { formatPrice } from '@/lib/bookingData';
import { Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const generateBookingPDF = (b: BookingRecord) => {
  const content = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ' SIKARA MAHAL - BOOKING RECEIPT',
    ' Luxury Wedding Hall',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `Booking ID: ${b.id}`,
    `Date: ${b.date}`,
    `Status: Successfully Booked ✓`,
    '',
    '── Customer Details ──────────────────',
    `Name: ${b.customerName}`,
    `Phone: ${b.phone}`,
    '',
    '── Selected Packages ─────────────────',
    ...b.selections.map(s => `  • ${s}`),
    '',
    '── Payment Summary ──────────────────',
    `Total Amount: ${formatPrice(b.totalAmount)}`,
    `Advance Paid (10%): ${formatPrice(b.advanceAmount)}`,
    `Balance Due: ${formatPrice(b.totalAmount - b.advanceAmount)}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '  Thank you for choosing Sikara Mahal!',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ].join('\n');

  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Sikara_Booking_${b.customerName.replace(/\s+/g, '_')}_${b.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

const BookingHistory = () => {
  const { bookingHistory } = useBookingStore();

  if (bookingHistory.length === 0) return null;

  return (
    <section id="history" className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            <ClipboardIcon className="inline w-4 h-4 mr-1" /> History
          </span>
          <h2 className="section-title mt-2">Your Booking History</h2>
        </motion.div>

        <div className="space-y-4">
          {bookingHistory.map((b) => (
            <div key={b.id} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{b.customerName}</h3>
                  <p className="text-muted-foreground text-sm">📅 {b.date} • 📱 {b.phone}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                  <CheckCircle2 className="w-3 h-3" />
                  Successfully Booked
                </span>
              </div>
              <ul className="text-sm text-foreground space-y-1 mb-3">
                {b.selections.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4 text-sm border-t border-border pt-3">
                <span>Total: <strong className="text-primary">{formatPrice(b.totalAmount)}</strong></span>
                <span>Advance: <strong>{formatPrice(b.advanceAmount)}</strong></span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateBookingPDF(b)}
                  className="ml-auto flex items-center gap-1.5 text-primary hover:text-primary"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
);

export default BookingHistory;
