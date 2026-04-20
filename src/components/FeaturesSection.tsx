import { Shield, Users, Video, Briefcase, Globe, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLang, Lang } from "@/context/LanguageContext";

const fields = [
  "Technology", "Medicine", "Business", "Education", "Law", "Finance",
  "Engineering", "Arts", "Science", "Leadership", "Entrepreneurship", "Research",
];

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "lg", label: "Luganda", flag: "🇺🇬" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
];

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [langModal, setLangModal] = useState(false);
  const doubled = [...fields, ...fields];

  const features = [
    { icon: Shield, title: t("anonSafeSpace"), description: t("anonDesc"), href: "/safe-space", color: "hsl(330 80% 55%)" },
    { icon: Users, title: t("mentorNetwork"), description: t("mentorDesc"), href: "/mentorship", color: "hsl(270 55% 50%)" },
    { icon: Video, title: t("liveEvents"), description: t("liveDesc"), href: "/events", color: "hsl(290 60% 55%)" },
    { icon: Briefcase, title: t("opportunitiesHub"), description: t("opportunitiesDesc"), href: "/opportunities", color: "hsl(310 70% 55%)" },
    { icon: Globe, title: t("multiLang"), description: t("multiLangDesc"), href: "lang", color: "hsl(250 60% 55%)" },
    { icon: Heart, title: t("supportGroups"), description: t("supportGroupsDesc"), href: "/community", color: "hsl(340 75% 55%)" },
  ];

  const handleClick = (href: string) => {
    if (href === "lang") { setLangModal(true); return; }
    navigate(href);
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      {/* Ticker */}
      <div className="relative mb-20 py-4 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(270 55% 45%), hsl(330 80% 55%))" }}>
        <div className="flex animate-ticker whitespace-nowrap">
          {doubled.map((field, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-6 text-white font-semibold text-sm tracking-wide">
              <Sparkles className="h-3.5 w-3.5 opacity-70" />
              {field}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">{t("whatWeOffer")}</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">
            {t("everythingToThrive").split("Thrive")[0]}<span className="text-gradient">Thrive</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">{t("builtByWomen")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <button key={feature.title} onClick={() => handleClick(feature.href)}
              className="group text-left p-8 rounded-2xl bg-card border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${feature.color}20` }}>
                <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              <div className="mt-5 text-xs font-semibold tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: feature.color }}>Explore →</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language modal */}
      {langModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setLangModal(false)}>
          <div className="w-full max-w-sm rounded-3xl bg-card border border-border shadow-2xl p-6"
            onClick={e => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-lg mb-1">Choose Language</h3>
            <p className="text-sm text-muted-foreground mb-5">Select your preferred language for the app.</p>
            <div className="space-y-2">
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setLangModal(false); }}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 transition-all text-left"
                  style={{
                    borderColor: lang === l.code ? "hsl(var(--primary))" : "hsl(var(--border))",
                    background: lang === l.code ? "hsl(var(--primary) / 0.08)" : "transparent",
                  }}>
                  <span className="text-2xl">{l.flag}</span>
                  <span className="font-semibold text-foreground">{l.label}</span>
                  {lang === l.code && (
                    <svg className="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="hsl(330 80% 55%)"/>
                      <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
