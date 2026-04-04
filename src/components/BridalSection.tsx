import { motion } from 'framer-motion';
import { bridalPackages, formatPrice } from '@/lib/bookingData';
import { useBookingStore } from '@/lib/bookingStore';
import { Crown, User } from 'lucide-react';

const BridalSection = () => {
  const { selectedBridalIds, toggleBridal } = useBookingStore();
  const groomPkgs = bridalPackages.filter(p => p.type === 'groom');
  const bridePkgs = bridalPackages.filter(p => p.type === 'bride');

  const renderCards = (pkgs: typeof bridalPackages) =>
    pkgs.map((pkg, i) => {
      const isSelected = selectedBridalIds.includes(pkg.id);
      return (
        <motion.button
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          onClick={() => toggleBridal(pkg.id)}
          className={`glass-card p-6 text-left transition-all hover:scale-[1.02] cursor-pointer ${
            isSelected ? 'ring-2 ring-primary bg-accent' : ''
          }`}
        >
          <h4 className="font-display text-lg font-bold text-foreground">{pkg.name}</h4>
          <p className="text-primary font-bold text-2xl mt-2">{formatPrice(pkg.price)}</p>
          <div className={`mt-4 py-2 rounded-lg text-center font-semibold text-sm ${
            isSelected ? 'gradient-violet text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            {isSelected ? 'Selected ✓' : 'Select'}
          </div>
        </motion.button>
      );
    });

  return (
    <section id="bridal" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            <Crown className="inline w-4 h-4 mr-1" /> Bridal Packages
          </span>
          <h2 className="section-title mt-2">Bride & Groom Packages</h2>
          <p className="section-subtitle mt-3">Complete grooming packages for the couple</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Groom Packages
            </h3>
            <div className="grid gap-4">{renderCards(groomPkgs)}</div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" /> Bride Packages
            </h3>
            <div className="grid gap-4">{renderCards(bridePkgs)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridalSection;
