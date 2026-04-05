import { motion } from 'framer-motion';
import { salonPackages, bridalPackages, formatPrice } from '@/lib/bookingData';
import { useBookingStore } from '@/lib/bookingStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Star, Crown, User } from 'lucide-react';
import beauty1 from '@/assets/beauty-1.jpg';
import beauty2 from '@/assets/beauty-2.jpg';
import beauty3 from '@/assets/beauty-3.jpg';
import beauty4 from '@/assets/beauty-4.jpg';

const packageIcons = {
  'normal-makeup': Sparkles,
  'hd-makeup': Star,
  'traditional-makeup': Crown,
};

const SalonSection = () => {
  const { selectedSalonIds, toggleSalon, selectedBridalIds, toggleBridal } = useBookingStore();

  const groomPkgs = bridalPackages.filter(p => p.type === 'groom');
  const bridePkgs = bridalPackages.filter(p => p.type === 'bride');

  return (
    <section id="salon" className="py-20 px-4 bg-secondary/30">
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
          <h2 className="section-title mt-2">Bridal Section</h2>
          <p className="section-subtitle mt-3">Complete beauty & grooming packages for the couple</p>
        </motion.div>

        {/* Beauty showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 rounded-2xl overflow-hidden">
          <img src={beauty1} alt="Bridal makeup" className="w-full h-40 sm:h-52 object-cover rounded-xl" loading="lazy" width={768} height={512} />
          <img src={beauty2} alt="HD makeup" className="w-full h-40 sm:h-52 object-cover rounded-xl" loading="lazy" width={768} height={512} />
          <img src={beauty3} alt="Mehndi" className="w-full h-40 sm:h-52 object-cover rounded-xl" loading="lazy" width={768} height={512} />
          <img src={beauty4} alt="Groom grooming" className="w-full h-40 sm:h-52 object-cover rounded-xl" loading="lazy" width={768} height={512} />
        </div>

        {/* Salon/Makeup Packages */}
        <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> Makeup Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {salonPackages.map((pkg, i) => {
            const isSelected = selectedSalonIds.includes(pkg.id);
            const Icon = packageIcons[pkg.id as keyof typeof packageIcons] || Sparkles;
            return (
              <motion.label
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                  isSelected ? 'ring-2 ring-primary bg-accent' : ''
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Checkbox checked={isSelected} onCheckedChange={() => toggleSalon(pkg.id)} />
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-lg font-bold text-foreground">{pkg.name}</h3>
                    </div>
                    <p className="text-primary font-bold text-2xl mt-2">{formatPrice(pkg.price)}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 ml-7">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-primary">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.label>
            );
          })}
        </div>

        {/* Groom & Bride Packages */}
        <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
          <Crown className="w-5 h-5 text-primary" /> Bride & Groom Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Groom Packages
            </h4>
            <div className="grid gap-4">
              {groomPkgs.map((pkg, i) => {
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
              })}
            </div>
          </div>
          <div>
            <h4 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" /> Bride Packages
            </h4>
            <div className="grid gap-4">
              {bridePkgs.map((pkg, i) => {
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
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonSection;
