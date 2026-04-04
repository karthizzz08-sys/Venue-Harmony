import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { CalendarCheck, CheckCircle2, XCircle } from 'lucide-react';

const bookedDates = [
  new Date(2026, 3, 10),
  new Date(2026, 3, 15),
  new Date(2026, 3, 22),
  new Date(2026, 4, 5),
  new Date(2026, 4, 12),
];

const AvailabilityChecker = () => {
  const [selected, setSelected] = useState<Date | undefined>();

  const isBooked = selected
    ? bookedDates.some(d => d.toDateString() === selected.toDateString())
    : null;

  return (
    <section id="availability" className="py-20 px-4">
      <div className="container max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            <CalendarCheck className="inline w-4 h-4 mr-1" /> Availability
          </span>
          <h2 className="section-title mt-2">Check Availability</h2>
          <p className="section-subtitle mt-3">Select a date to check hall availability</p>
        </motion.div>

        <div className="glass-card p-6 flex flex-col items-center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            disabled={(date) => date < new Date()}
            className="p-3 pointer-events-auto"
            modifiers={{ booked: bookedDates }}
            modifiersStyles={{
              booked: { backgroundColor: 'hsl(0 84.2% 60.2% / 0.2)', color: 'hsl(0 84.2% 60.2%)' },
            }}
          />

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm ${
                isBooked
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {isBooked ? (
                <><XCircle className="w-4 h-4" /> Already booked on this date</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Available! Book now</>
              )}
            </motion.div>
          )}

          <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-destructive/20 border border-destructive/40" /> Booked
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-100 border border-green-400" /> Available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityChecker;
