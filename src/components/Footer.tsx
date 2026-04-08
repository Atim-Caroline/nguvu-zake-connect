import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-heading text-lg font-bold text-background">Nguvu Zake</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Her Strength. A safe digital community empowering women across Africa and beyond.
            </p>
          </div>

          {[
            { title: "Platform", links: ["Safe Space", "Mentorship", "Events", "Opportunities"] },
            { title: "Community", links: ["Support Groups", "Guidelines", "Become a Mentor", "FAQ"] },
            { title: "Languages", links: ["English", "Luganda", "Kiswahili"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-background mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-background transition-colors">
                      {link}
                    </a>
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
