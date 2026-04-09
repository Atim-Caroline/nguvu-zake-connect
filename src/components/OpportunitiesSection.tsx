import { Briefcase, GraduationCap, HandHeart, BookOpen, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const opportunities = [
  { type: "Job", icon: Briefcase, title: "Community Manager", org: "WomenTech Africa", location: "Remote", tag: "Full-time" },
  { type: "Scholarship", icon: GraduationCap, title: "Digital Skills Scholarship", org: "UNESCO Women", location: "Online", tag: "Fully Funded" },
  { type: "Volunteer", icon: HandHeart, title: "Youth Mentor Program", org: "She Leads Africa", location: "Kampala, UG", tag: "Part-time" },
  { type: "Training", icon: BookOpen, title: "Financial Literacy Course", org: "Nguvu Academy", location: "Online", tag: "Free" },
];

const OpportunitiesSection = () => {
  const navigate = useNavigate();
  return (
    <section id="opportunities" className="py-24 bg-sand/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent tracking-wide uppercase">Opportunities</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Doors Are Opening <span className="text-gradient">For You</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Jobs, scholarships, volunteer roles, and skill-building programs — all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.title} className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <opp.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-accent">{opp.type}</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">{opp.tag}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{opp.title}</h3>
                <p className="text-sm text-muted-foreground">{opp.org}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {opp.location}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
            </div>
          ))}
        </div>

        {/* Swipe Jobs CTA */}
        <div
          className="mt-8 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, hsl(270 55% 45%), hsl(330 80% 55%))" }}
        >
          <div className="text-white text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-widest uppercase opacity-80">New Feature</span>
            </div>
            <h3 className="font-heading text-xl font-bold">Swipe to Find Your Dream Job</h3>
            <p className="text-white/70 text-sm mt-1">Tinder-style job matching — swipe right to save, left to skip.</p>
          </div>
          <button
            onClick={() => navigate("/jobs")}
            className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
            style={{ background: "white", color: "hsl(270 55% 45%)" }}
          >
            Try Job Swipe
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" size="lg">
            View All Opportunities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
