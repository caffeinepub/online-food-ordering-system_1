import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Customer', path: '/customer' },
    { label: 'Restaurant', path: '/restaurant' },
    { label: 'Delivery', path: '/delivery' },
    { label: 'About', path: '/about' },
    { label: 'Technologies', path: '/technologies' },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => handleNavigation('/')}
          className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span className="hidden sm:inline">Food Ordering System</span>
          <span className="sm:hidden">FOS</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => handleNavigation(item.path)}
              className="text-sm font-medium"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-2 mt-8">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className="justify-start text-base"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
