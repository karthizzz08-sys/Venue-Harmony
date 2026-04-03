import { useState } from 'react';
import { Menu, X, Home, Building2, Camera, Palette, PartyPopper, Images, CalendarCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import sikaraLogo from '@/assets/sikara-logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#', label: 'Home', icon: Home },
    { href: '#hall', label: 'Hall', icon: Building2 },
    { href: '#photography', label: 'Photography', icon: Camera },
    { href: '#decoration', label: 'Decoration', icon: Palette },
    { href: '#events', label: 'Events', icon: PartyPopper },
    { href: '#gallery', label: 'Gallery', icon: Images },
    { href: '#booking', label: 'Book Now', icon: CalendarCheck },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto flex items-center justify-between py-2 px-4">
        <a href="#" className="flex items-center gap-2">
          <img src={sikaraLogo} alt="Sikara Mahal" className="h-12 w-auto" width={48} height={48} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <img src={sikaraLogo} alt="Sikara Mahal" className="h-10 w-auto" width={40} height={40} />
            </div>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 px-4 py-3 rounded-lg transition-colors"
                >
                  <l.icon className="w-5 h-5" />
                  {l.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
