import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#hall', label: 'Hall' },
    { href: '#photography', label: 'Photography' },
    { href: '#decoration', label: 'Decoration' },
    { href: '#events', label: 'Events' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#booking', label: 'Book Now' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <a href="#" className="font-display text-xl font-bold text-primary">
          Sikara Mahal
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
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
            <SheetTitle className="font-display text-lg text-primary mb-6">Menu</SheetTitle>
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 px-4 py-3 rounded-lg transition-colors"
                >
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
