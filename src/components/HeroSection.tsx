import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

// Black African women actively working in their fields — Pexels verified
const slides = [
  {
    url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    field: "Technology",
    caption: "Breaking barriers in tech, one line of code at a time.",
  },
  {
    url: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    field: "Medicine",
    caption: "Healing communities with knowledge and compassion.",
  },
  {
    url: "https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    field: "Business",
    caption: "Building empires, inspiring generations.",
  },
  {
    url: "https://images.pexels.com/photos/8471939/pexels-photo-8471939.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    field: "Education",
    caption: "Shaping minds, changing futures.",
  },
  {
    url: "https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    field: "Agriculture",
    caption: "Feeding nations, leading with purpose.",
  },
  {
    url: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    field: "Leadership",
    caption: "Leading with strength, grace, and purpose.",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.url}
            alt={slide.field}
            className="w-full h-full object-cover"
            style={{
              transform: i === current && !animating ? "scale(1.03)" : "scale(1)",
              transition: "transform 6s ease-out",
              imageRendering: "auto",
              filter: "contrast(1.08) saturate(1.15) brightness(1.02)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 container mx-auto px-4 pt-36 pb-20">
        <div className="max-w-3xl">
          {/* Field badge */}
          <div
            key={current}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase animate-fade-in"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <Shield className="h-3.5 w-3.5" />
            Women in {slides[current].field}
          </div>

          {/* Headline */}
          <h1
            key={`h-${current}`}
            className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-4 text-white animate-fade-up"
          >
            {t("heroTitle")}{" "}
            <span className="italic" style={{ color: "hsl(330 80% 75%)" }}>{t("heroCommunity")}</span>
          </h1>

          {/* Caption */}
          <p
            key={`c-${current}`}
            className="text-lg md:text-xl text-white/80 mb-4 max-w-xl animate-fade-up delay-100"
          >
            {slides[current].caption}
          </p>

          <p className="text-base text-white/70 mb-10 max-w-xl animate-fade-up delay-200">
            {t("heroSub")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 shadow-2xl hover:-translate-y-1 active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))",
                boxShadow: "0 6px 30px hsl(330 80% 55% / 0.5)",
              }}
            >
              {t("joinCommunity")}
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate("/safe-space")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1 active:scale-95"
              style={{
                border: "2px solid rgba(255,255,255,0.6)",
                color: "white",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Heart className="h-5 w-5" />
              {t("exploreSafeSpace")}
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-8 border-t border-white/15 animate-fade-up delay-400">
            {[
              { value: "10K+", labelKey: "womenConnected" },
              { value: "500+", labelKey: "verifiedMentors" },
              { value: "3", labelKey: "languages" },
            ].map((stat) => (
              <div key={stat.labelKey}>
                <div className="text-3xl font-bold font-heading" style={{ color: "hsl(330 80% 75%)" }}>{stat.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "hsl(330 80% 65%)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20 bg-white/10">
        <div
          key={current}
          className="h-full animate-progress"
          style={{ background: "linear-gradient(90deg, hsl(330 80% 65%), hsl(270 55% 55%))" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
