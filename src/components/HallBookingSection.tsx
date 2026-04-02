import { motion } from 'framer-motion';
import { hallDurations, additionalCharges, extras, formatPrice } from '@/lib/bookingData';
import { useBookingStore } from '@/lib/bookingStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const HallBookingSection = () => {
  const { hallDuration, setHallDuration, selectedExtras, toggleExtra } = useBookingStore();

  return (
    <section id="hall" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">🏛️ Venue</span>
          <h2 className="section-title mt-2">Mandapam Charges</h2>
          <p className="section-subtitle mt-3">Choose your booking duration</p>
        </motion.div>

        {/* Duration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {hallDurations.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setHallDuration(hallDuration === d.id ? null : d.id)}
              className={`glass-card p-8 text-left transition-all cursor-pointer hover:scale-[1.02] ${
                hallDuration === d.id
                  ? 'ring-2 ring-primary border-primary bg-accent'
                  : ''
              }`}
            >
              <h3 className="font-display text-xl font-bold text-foreground">{d.label}</h3>
              <p className="text-muted-foreground text-sm mt-1">{d.timing}</p>
              <p className="text-3xl font-bold text-primary mt-4">{formatPrice(d.price)}</p>
              <p className="text-muted-foreground text-xs mt-1">+ additional charges</p>
            </motion.button>
          ))}
        </div>

        {/* Additional Charges */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Additional Charges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalCharges.map((c) => (
              <div key={c.id} className="glass-card p-5 flex items-start gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-foreground text-sm">{c.label}</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>{c.unit}</TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-primary font-bold mt-1">{c.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">🎉 Optional Extras</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((e) => (
              <label
                key={e.id}
                className={`glass-card p-5 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01] ${
                  selectedExtras.includes(e.id) ? 'ring-2 ring-primary bg-accent' : ''
                }`}
              >
                <Checkbox
                  checked={selectedExtras.includes(e.id)}
                  onCheckedChange={() => toggleExtra(e.id)}
                />
                <span className="text-2xl">{e.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{e.label}</p>
                  <p className="text-primary font-bold">{formatPrice(e.price)}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HallBookingSection;
