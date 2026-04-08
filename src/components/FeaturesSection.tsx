import { Shield, Users, Video, Briefcase, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Anonymous Safe Space",
    description: "Share your story, ask questions, and seek advice without revealing your identity. Your privacy is sacred.",
  },
  {
    icon: Users,
    title: "Mentorship Network",
    description: "Connect with verified counselors, professionals, and peer mentors for one-on-one guidance.",
  },
  {
    icon: Video,
    title: "Live Events",
    description: "Join live teachings, Q&A sessions, and workshops hosted by community leaders and experts.",
  },
  {
    icon: Briefcase,
    title: "Opportunities Hub",
    description: "Discover jobs, scholarships, volunteer roles, and skill-building programs curated for you.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Navigate in English, Luganda, or Kiswahili. Content adapts to your language preference.",
  },
  {
    icon: Heart,
    title: "Support Groups",
    description: "Join groups based on shared challenges or interests. Grow together in a supportive environment.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">What We Offer</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Everything You Need to <span className="text-gradient">Thrive</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Built by women, for women — a platform that understands your journey and supports every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
