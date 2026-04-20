import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Video, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const mentors = [
  { id: "1", name: "Dr. Amara K.", role: "Mental Health Counselor", rating: 4.9, sessions: 120, verified: true, photo: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop", specialty: "Anxiety · Trauma · Relationships" },
  { id: "2", name: "Pastor Grace N.", role: "Spiritual Guidance", rating: 4.8, sessions: 95, verified: true, photo: "https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop", specialty: "Faith · Purpose · Healing" },
  { id: "3", name: "Sarah M.", role: "Career Coach", rating: 4.7, sessions: 68, verified: true, photo: "https://images.pexels.com/photos/8471939/pexels-photo-8471939.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop", specialty: "Career Growth · Leadership · CV" },
  { id: "4", name: "Dr. Fatima O.", role: "Women's Health", rating: 4.9, sessions: 143, verified: true, photo: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop", specialty: "Health · Wellness · Nutrition" },
  { id: "5", name: "Advocate Lena O.", role: "Legal Advisor", rating: 4.6, sessions: 52, verified: true, photo: "https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop", specialty: "Rights · Law · Advocacy" },
  { id: "6", name: "Coach Zara T.", role: "Life Coach", rating: 4.8, sessions: 87, verified: true, photo: "https://images.pexels.com/photos/8471939/pexels-photo-8471939.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop", specialty: "Self-Love · Boundaries · Growth" },
];

export default function Mentorship() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
  }, []);

  const goProtected = (path: string) => {
    if (authed) navigate(path);
    else { sessionStorage.setItem("nz_redirect", path); navigate("/signin"); }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <span className="font-heading font-semibold">Mentorship Network</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Guided by Women Who Understand</h1>
          <p className="text-muted-foreground text-lg">Book sessions with verified mentors — counselors, pastors, and professionals ready to walk with you.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <div key={mentor.id} className="rounded-2xl bg-card border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img src={mentor.photo} alt={mentor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: "contrast(1.1) saturate(1.2)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{mentor.name}</h3>
                  {mentor.verified && (
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                      <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <p className="text-sm text-primary font-medium mb-0.5">{mentor.role}</p>
                <p className="text-xs text-muted-foreground mb-3">{mentor.specialty}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {mentor.rating}</span>
                  <span className="text-xs">{mentor.sessions} sessions</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => goProtected(`/chat/${mentor.id}`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                    <MessageCircle className="h-4 w-4" /> Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
