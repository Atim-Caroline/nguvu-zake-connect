import { Star, Video, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mentors = [
  {
    id: "1",
    name: "Dr. Amara K.",
    role: "Mental Health Counselor",
    rating: 4.9,
    sessions: 120,
    verified: true,
    photo: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop",
    specialty: "Anxiety · Trauma · Relationships",
  },
  {
    id: "2",
    name: "Pastor Grace N.",
    role: "Spiritual Guidance",
    rating: 4.8,
    sessions: 95,
    verified: true,
    photo: "https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop",
    specialty: "Faith · Purpose · Healing",
  },
  {
    id: "3",
    name: "Sarah M.",
    role: "Career Coach",
    rating: 4.7,
    sessions: 68,
    verified: true,
    photo: "https://images.pexels.com/photos/8471939/pexels-photo-8471939.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop",
    specialty: "Career Growth · Leadership · CV",
  },
];

const MentorshipSection = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    // redirect to sign in — auth guard
    navigate("/signin");
  };

  return (
    <section id="mentorship" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent tracking-widest uppercase">Mentorship</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Guided by Women Who <span className="text-gradient">Understand</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Book sessions with verified mentors — counselors, pastors, and professionals ready to walk with you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.name} className="rounded-2xl bg-card border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  style={{
                    filter: "contrast(1.1) saturate(1.2) brightness(1.03)",
                    imageRendering: "auto",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{mentor.name}</h3>
                  {mentor.verified && (
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                      <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <p className="text-sm text-primary font-medium mb-1">{mentor.role}</p>
                <p className="text-xs text-muted-foreground mb-4">{mentor.specialty}</p>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {mentor.rating}
                  </span>
                  <span className="text-xs">{mentor.sessions} sessions</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/chat/${mentor.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all hover:bg-muted"
                    style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
                  >
                    <MessageCircle className="h-4 w-4" /> Chat
                  </button>
                  <button
                    onClick={handleAction}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}
                  >
                    <Video className="h-4 w-4" /> Book Call
                  </button>
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
