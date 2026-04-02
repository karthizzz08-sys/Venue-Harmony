const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
