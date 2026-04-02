import { motion } from 'framer-motion';
import { decorationItems, formatPrice } from '@/lib/bookingData';
import { useBookingStore } from '@/lib/bookingStore';
import { Checkbox } from '@/components/ui/checkbox';
import decorBg from '@/assets/decoration-bg.jpg';

const DecorationSection = () => {
  const { selectedDecorations, toggleDecoration } = useBookingStore();

  return (
    <section id="decoration" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={decorBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1280} height={720} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">🌸 Decoration</span>
          <h2 className="section-title mt-2">Elegant Decorations</h2>
          <p className="section-subtitle mt-3">Silver & White themed décor for your special day</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {decorationItems.map((item, i) => {
            const isSelected = selectedDecorations.includes(item.id);
            return (
              <motion.label
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                  isSelected ? 'ring-2 ring-primary bg-accent' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleDecoration(item.id)}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-display text-lg font-bold text-foreground">{item.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <p className="text-primary font-bold text-xl mt-3">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </motion.label>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DecorationSection;
