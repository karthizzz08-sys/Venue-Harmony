import { motion } from 'framer-motion';
import { eventPackage, formatPrice } from '@/lib/bookingData';
import { useBookingStore } from '@/lib/bookingStore';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const EventPackageSection = () => {
  const { eventSelected, setEventSelected, eventGuestCount, setEventGuestCount } = useBookingStore();

  return (
    <section id="events" className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">🎉 Full Package</span>
          <h2 className="section-title mt-2">{eventPackage.name}</h2>
          <p className="section-subtitle mt-3">All-inclusive package at {formatPrice(eventPackage.pricePerHead)} per head</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          {/* Toggle */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">Include Event Package</h3>
              <p className="text-muted-foreground text-sm">Base: 500 guests @ {formatPrice(750)}/head</p>
            </div>
            <Switch checked={eventSelected} onCheckedChange={setEventSelected} />
          </div>

          {eventSelected && (
            <>
              {/* Guest count */}
              <div className="mb-8 flex items-center gap-4">
                <label className="font-semibold text-foreground whitespace-nowrap">Number of Guests:</label>
                <Input
                  type="number"
                  min={500}
                  value={eventGuestCount}
                  onChange={(e) => setEventGuestCount(Math.max(500, Number(e.target.value)))}
                  className="w-32"
                />
                {eventGuestCount > 500 && (
                  <span className="text-sm text-muted-foreground">
                    +{eventGuestCount - 500} extra guests = {formatPrice((eventGuestCount - 500) * 750)}
                  </span>
                )}
              </div>

              {/* Package sections */}
              <Accordion type="multiple" defaultValue={[eventPackage.sections[0].title]} className="w-full">
                {eventPackage.sections.map((section) => (
                  <AccordionItem key={section.title} value={section.title}>
                    <AccordionTrigger className="font-display text-lg font-semibold text-foreground">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="text-primary">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Timing & notes */}
              <div className="mt-6 p-4 bg-accent rounded-lg">
                <p className="text-sm font-semibold text-accent-foreground">⏰ Timing: 10:00 AM to 4:30 PM</p>
                <p className="text-sm text-muted-foreground mt-1">🎁 Surprise gift from Sikara Events included!</p>
                <p className="text-sm text-muted-foreground mt-1">⚠️ Extra guests: {formatPrice(750)}/head beyond 500</p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-primary font-display">
                  Total: {formatPrice(eventGuestCount * 750)}
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default EventPackageSection;
