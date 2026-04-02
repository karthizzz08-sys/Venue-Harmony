import { motion } from 'framer-motion';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';

const images = [
  { src: gallery1, alt: 'Wedding Photography', label: 'Photography' },
  { src: gallery2, alt: 'Wedding Hall', label: 'Hall Setup' },
  { src: gallery3, alt: 'Wedding Catering', label: 'Grand Feast' },
  { src: gallery4, alt: 'Stage Decoration', label: 'Decoration' },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">📷 Gallery</span>
          <h2 className="section-title mt-2">Our Moments</h2>
          <p className="section-subtitle mt-3">A glimpse of unforgettable celebrations at Sikara Mahal</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
