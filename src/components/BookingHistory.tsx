import { motion } from 'framer-motion';
import { useBookingStore, BookingRecord } from '@/lib/bookingStore';
import { formatPrice } from '@/lib/bookingData';

const statusColors = {
  pending: 'bg-gold/20 text-gold-foreground',
  confirmed: 'bg-primary/15 text-primary',
  completed: 'bg-green-100 text-green-700',
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
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">📜 History</span>
          <h2 className="section-title mt-2">Your Bookings</h2>
        </motion.div>

        <div className="space-y-4">
          {bookingHistory.map((b) => (
            <div key={b.id} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{b.customerName}</h3>
                  <p className="text-muted-foreground text-sm">📅 {b.date} • 📱 {b.phone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[b.status]}`}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>
              <ul className="text-sm text-foreground space-y-1 mb-3">
                {b.selections.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
              <div className="flex gap-6 text-sm border-t border-border pt-3">
                <span>Total: <strong className="text-primary">{formatPrice(b.totalAmount)}</strong></span>
                <span>Advance: <strong>{formatPrice(b.advanceAmount)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingHistory;
