import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HallBookingSection from '@/components/HallBookingSection';
import PhotographySection from '@/components/PhotographySection';
import DecorationSection from '@/components/DecorationSection';
import EventPackageSection from '@/components/EventPackageSection';
import GallerySection from '@/components/GallerySection';
import BookingWizard from '@/components/BookingWizard';
import BookingHistory from '@/components/BookingHistory';
import FloatingTotal from '@/components/FloatingTotal';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HallBookingSection />
      <PhotographySection />
      <DecorationSection />
      <EventPackageSection />
      <GallerySection />
      <BookingWizard />
      <BookingHistory />
      <FloatingTotal />

      {/* Footer */}
      <footer className="bg-foreground py-12 px-4 pb-24">
        <div className="container max-w-4xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
            Sikara Mahal A/C Wedding Hall
          </h3>
          <p className="text-primary-foreground/60 text-sm">
            Making your dream wedding come true ✨
          </p>
          <div className="flex justify-center gap-6 mt-6 text-primary-foreground/50 text-sm">
            <a href="#hall" className="hover:text-primary-foreground transition-colors">Hall</a>
            <a href="#photography" className="hover:text-primary-foreground transition-colors">Photography</a>
            <a href="#decoration" className="hover:text-primary-foreground transition-colors">Decoration</a>
            <a href="#events" className="hover:text-primary-foreground transition-colors">Events</a>
          </div>
          <p className="text-primary-foreground/30 text-xs mt-8">
            © {new Date().getFullYear()} Sikara Mahal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
