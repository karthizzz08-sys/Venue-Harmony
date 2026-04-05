import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/bookingStore';
import {
  hallDurations, photoPackages, decorationItems, eventItems,
  salonPackages, bridalPackages, formatPrice,
} from '@/lib/bookingData';

const FloatingTotal = () => {
  const store = useBookingStore();
  const [visible, setVisible] = useState(false);

  const hallPrice = store.hallDuration ? hallDurations.find(d => d.id === store.hallDuration)?.price ?? 0 : 0;
  const photoPrice = store.photoPackageId
    ? (() => {
        const pkg = photoPackages.find(p => p.id === store.photoPackageId);
        return store.photoEventCount === 1 ? pkg?.pricePerEvent ?? 0 : pkg?.priceFor2Events ?? 0;
      })()
    : 0;
  const decorPrice = store.selectedDecorations.reduce((sum, id) => sum + (decorationItems.find(x => x.id === id)?.price ?? 0), 0);
  const salonTotal = store.selectedSalonIds.reduce((sum, id) => sum + (salonPackages.find(x => x.id === id)?.price ?? 0), 0);
  const bridalTotal = store.selectedBridalIds.reduce((sum, id) => sum + (bridalPackages.find(x => x.id === id)?.price ?? 0), 0);
  const eventTotal = store.selectedEventItems.reduce((sum, sel) => {
    const item = eventItems.find(x => x.id === sel.id);
    return sum + (item ? item.basePrice * sel.qty : 0);
  }, 0);

  // 30% discount on bridal+salon+events combined if >= ₹2,00,000
  const discountableTotal = salonTotal + bridalTotal + eventTotal;
  const combinedDiscount = discountableTotal >= 200000 ? Math.round(discountableTotal * 0.3) : 0;

  const total = hallPrice + photoPrice + decorPrice + salonTotal + bridalTotal + eventTotal - combinedDiscount;

  useEffect(() => {
    setVisible(total > 0);
  }, [total]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 gradient-violet p-4 shadow-2xl"
    >
      <div className="container max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <p className="text-primary-foreground/80 text-sm">Estimated Total</p>
          <p className="text-primary-foreground text-2xl font-bold font-display">{formatPrice(total)}</p>
          {combinedDiscount > 0 && (
            <p className="text-primary-foreground/70 text-xs">Incl. 30% bridal+events discount</p>
          )}
        </div>
        <a href="#booking" className="bg-primary-foreground text-primary px-6 py-3 rounded-full font-bold hover:bg-primary-foreground/90 transition-colors">
          Book Now →
        </a>
      </div>
    </motion.div>
  );
};

export default FloatingTotal;
