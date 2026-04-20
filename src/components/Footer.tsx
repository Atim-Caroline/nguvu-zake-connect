import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLang } from "@/context/LanguageContext";

const Footer = () => {
  const { t, lang } = useLang();

  const footerLinks = [
    {
      title: t("platform"),
      links: [
        { label: t("safeSpace"), href: "/safe-space" },
        { label: t("mentorship"), href: "/mentorship" },
        { label: t("events"), href: "/events" },
        { label: t("opportunities"), href: "/opportunities" },
      ],
    },
    {
      title: t("community"),
      links: [
        { label: t("supportGroupsFooter"), href: "/community" },
        { label: t("guidelines"), href: "#" },
        { label: t("becomeAMentor"), href: "/mentorship" },
        { label: t("faq"), href: "#" },
      ],
    },
    {
      title: t("languages"),
      links: [
        { label: "English", href: "#" },
        { label: "Luganda", href: "#" },
        { label: "Kiswahili", href: "#" },
      ],
    },
  ];

  const langLabel = lang === "lg" ? "Luganda" : lang === "sw" ? "Kiswahili" : "English";

  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Nguvu Zake" className="h-10 w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("herStrength")}</p>
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
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" /> {langLabel}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
