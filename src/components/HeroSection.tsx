import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-women.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African women community"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 gradient-hero opacity-60" />
      </div>

      <div className="relative container mx-auto px-4 py-32">
        <div className="max-w-2xl animate-fade-up">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Safe · Empowering · Connected</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: 'hsl(38, 50%, 97%)' }}>
            Her Strength.{" "}
            <span style={{ color: 'hsl(36, 80%, 50%)' }}>Her Community.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: 'hsl(38, 40%, 85%)' }}>
            A safe digital space where African women find mentorship, share experiences anonymously, 
            and access life-changing opportunities — together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="text-base" onClick={() => navigate("/signup")}>
              Join the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base" onClick={() => navigate("/safe-space")}>
              <Heart className="mr-2 h-5 w-5" />
              Explore Safe Space
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: '1px solid hsl(38, 50%, 97%, 0.15)' }}>
            {[
              { value: "10K+", label: "Women Connected" },
              { value: "500+", label: "Verified Mentors" },
              { value: "3", label: "Languages" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold font-heading" style={{ color: 'hsl(36, 80%, 50%)' }}>{stat.value}</div>
                <div className="text-xs" style={{ color: 'hsl(38, 40%, 75%)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
