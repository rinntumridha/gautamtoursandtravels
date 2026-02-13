import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Pench Safari", path: "/pench-safari" },
  { label: "Kanha Safari", path: "/kanha-safari" },
  { label: "Hotels & Resorts", path: "/hotels" },
  { label: "Car Rental", path: "/car-rental" },
  { label: "Packages", path: "/packages" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-heading font-bold text-primary">
            Gautam Tours
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-body">& Travels</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="tel:+919325673079" className="hidden md:flex">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-warm-light gap-1">
              <Phone className="h-3.5 w-3.5" />
              Call Now
            </Button>
          </a>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+919325673079" className="mt-2">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-warm-light gap-2">
                <Phone className="h-4 w-4" />
                Call +91 9325673079
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
