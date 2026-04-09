import { Shield, Users, Video, Briefcase, Globe, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fields = [
  "Technology", "Medicine", "Business", "Education", "Law", "Finance",
  "Engineering", "Arts", "Science", "Leadership", "Entrepreneurship", "Research",
];

const features = [
  {
    icon: Shield,
    title: "Anonymous Safe Space",
    description: "Share your story and seek advice without revealing your identity.",
    href: "/safe-space",
    color: "hsl(330 80% 55%)",
  },
  {
    icon: Users,
    title: "Mentorship Network",
    description: "Connect with verified counselors and professionals for one-on-one guidance.",
    href: "/#mentorship",
    color: "hsl(270 55% 50%)",
  },
  {
    icon: Video,
    title: "Live Events",
    description: "Join live teachings, Q&A sessions, and workshops by community leaders.",
    href: "/events",
    color: "hsl(290 60% 55%)",
  },
  {
    icon: Briefcase,
    title: "Opportunities Hub",
    description: "Jobs, scholarships, volunteer roles, and skill-building programs.",
    href: "/#opportunities",
    color: "hsl(310 70% 55%)",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Navigate in English, Luganda, or Kiswahili.",
    href: "#",
    color: "hsl(250 60% 55%)",
  },
  {
    icon: Heart,
    title: "Support Groups",
    description: "Join groups based on shared challenges. Grow together.",
    href: "/community",
    color: "hsl(340 75% 55%)",
  },
];

const FeaturesSection = () => {
  const navigate = useNavigate();
  const doubled = [...fields, ...fields];

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
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">What We Offer</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Everything You Need to <span className="text-gradient">Thrive</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Built by women, for women — a platform that understands your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <button
              key={feature.title}
              onClick={() => navigate(feature.href)}
              className="group text-left p-8 rounded-2xl bg-card border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${feature.color}20` }}
              >
                <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              <div
                className="mt-5 text-xs font-semibold tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: feature.color }}
              >
                Explore →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
