import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/results", label: "Blood Availability" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/donor-registration", label: "Become a Donor" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Droplet className="h-7 w-7 text-primary fill-primary" />
          <span className="text-foreground">Blood<span className="text-primary">Bank</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-accent ${
                location.pathname === link.to ? "text-primary bg-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to ? "text-primary bg-accent" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t mt-2">
              <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">Login</Button>
              </Link>
              <Link to="/signup" className="flex-1" onClick={() => setOpen(false)}>
                <Button className="w-full" size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
