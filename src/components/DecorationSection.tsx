import { motion } from 'framer-motion';
import { decorationItems, formatPrice } from '@/lib/bookingData';
import { useBookingStore } from '@/lib/bookingStore';
import { Checkbox } from '@/components/ui/checkbox';
import decorStage from '@/assets/decor-stage.jpg';
import decorEntrance from '@/assets/decor-entrance.jpg';
import decorTable from '@/assets/decor-table.jpg';

const decorImages: Record<string, string> = {
  'stage-basic': decorStage,
  'stage-premium': decorEntrance,
  'stage-grand': decorStage,
  'entrance': decorEntrance,
  'table-decor': decorTable,
  'car-decor': decorEntrance,
};

const DecorationSection = () => {
  const { selectedDecorations, toggleDecoration } = useBookingStore();

  return (
    <section id="decoration" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">✨ Decoration</span>
          <h2 className="section-title mt-2">Elegant Decorations</h2>
          <p className="section-subtitle mt-3">Silver & White themed décor for your special day</p>
        </motion.div>

        {/* Showcase images */}
        <div className="grid grid-cols-3 gap-3 mb-12 rounded-2xl overflow-hidden">
          <img src={decorStage} alt="Stage decoration" className="w-full h-32 sm:h-48 object-cover" loading="lazy" width={768} height={512} />
          <img src={decorEntrance} alt="Entrance decoration" className="w-full h-32 sm:h-48 object-cover" loading="lazy" width={768} height={512} />
          <img src={decorTable} alt="Table decoration" className="w-full h-32 sm:h-48 object-cover" loading="lazy" width={768} height={512} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {decorationItems.map((item, i) => {
            const isSelected = selectedDecorations.includes(item.id);
            const img = decorImages[item.id];
            return (
              <motion.label
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  isSelected ? 'ring-2 ring-primary bg-accent' : ''
                }`}
              >
                {img && (
                  <img src={img} alt={item.name} className="w-full h-36 object-cover" loading="lazy" width={768} height={512} />
                )}
                <div className="p-5 flex items-start gap-4">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleDecoration(item.id)}
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
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
