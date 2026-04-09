import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Safe Space", href: "/safe-space" },
      { label: "Mentorship", href: "/#mentorship" },
      { label: "Events", href: "/events" },
      { label: "Opportunities", href: "/#opportunities" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Support Groups", href: "/safe-space" },
      { label: "Guidelines", href: "#" },
      { label: "Become a Mentor", href: "/#mentorship" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Languages",
    links: [
      { label: "English", href: "#" },
      { label: "Luganda", href: "#" },
      { label: "Kiswahili", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Nguvu Zake" className="h-10 w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Her Strength. A safe digital community empowering women across Africa and beyond.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-background mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-muted-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Nguvu Zake. Built with love for women everywhere.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" /> English
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
