import { Star, Calendar, Video, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const mentors = [
  { name: "Dr. Amara K.", role: "Mental Health Counselor", rating: 4.9, sessions: 120, verified: true },
  { name: "Pastor Grace N.", role: "Spiritual Guidance", rating: 4.8, sessions: 95, verified: true },
  { name: "Sarah M.", role: "Career Coach", rating: 4.7, sessions: 68, verified: true },
];

const MentorshipSection = () => {
  return (
    <section id="mentorship" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent tracking-wide uppercase">Mentorship</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Guided by Women Who <span className="text-gradient">Understand</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Book sessions with verified mentors — counselors, pastors, and professionals ready to walk with you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.name} className="p-6 rounded-2xl bg-card border border-border hover:shadow-xl transition-all group">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="font-heading text-2xl font-bold text-secondary">
                  {mentor.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{mentor.name}</h3>
                  {mentor.verified && <CheckCircle className="h-4 w-4 text-secondary" />}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{mentor.role}</p>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-primary fill-primary" /> {mentor.rating}
                  </span>
                  <span>{mentor.sessions} sessions</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" /> Chat
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Video className="h-4 w-4 mr-1" /> Book Call
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
