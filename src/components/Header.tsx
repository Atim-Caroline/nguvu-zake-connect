import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Safe Space", href: "#safe-space" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Events", href: "/events" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Community", href: "/community" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Nguvu Zake"
            className="h-10 w-auto"
            style={{ mixBlendMode: "multiply" }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/signin")}>Sign In</Button>
          <Button size="sm" onClick={() => navigate("/signup")}>Join Free</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-border px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate("/signin"); setMobileOpen(false); }}>Sign In</Button>
              <Button size="sm" className="flex-1" onClick={() => { navigate("/signup"); setMobileOpen(false); }}>Join Free</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
