import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useLang();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, hsl(270 55% 20%) 0%, hsl(300 50% 25%) 50%, hsl(330 80% 30%) 100%)" }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "hsl(330 80% 55%)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "hsl(270 55% 55%)" }} />

      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ background: "rgba(255,255,255,0.1)", color: "hsl(330 80% 80%)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <Sparkles className="h-3.5 w-3.5" />
          {t("joinThousands")}
        </div>

        <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
          {t("yourJourney")}{" "}
          <span className="italic" style={{ color: "hsl(330 80% 75%)" }}>{t("startsHere")}</span>
        </h2>

        <p className="text-lg max-w-xl mx-auto mb-12 text-white/70">{t("ctaDesc")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate(authed ? "/community" : "/signup")}
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-2xl"
            style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(290 60% 55%))", boxShadow: "0 8px 32px hsl(330 80% 55% / 0.5)" }}>
            {t("joinNguvuFree")} <ArrowRight className="h-5 w-5" />
          </button>
          <button onClick={() => navigate("/safe-space")}
            className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{ border: "2px solid rgba(255,255,255,0.5)", color: "white", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            <Heart className="h-5 w-5" /> {t("enterSafeSpace")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
