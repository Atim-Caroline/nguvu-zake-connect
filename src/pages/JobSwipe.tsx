import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ThumbsUp, ThumbsDown, MapPin, Clock, Briefcase, BookmarkCheck, ChevronRight, Crown, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ALL_JOBS = [
  { id: 1, title: "Software Engineer", company: "TechAfrica Ltd", location: "Nairobi, Kenya", type: "Full-time", salary: "KES 120K–180K/mo", tag: "Technology", color: "#7c3aed", description: "Build scalable web applications using React and Node.js. Remote-friendly team.", skills: ["React", "Node.js", "TypeScript"] },
  { id: 2, title: "Community Health Officer", company: "HealthBridge NGO", location: "Kampala, Uganda", type: "Full-time", salary: "UGX 2.5M–3.5M/mo", tag: "Health", color: "#db2777", description: "Lead community health programs and outreach in underserved areas.", skills: ["Public Health", "Community Outreach", "Data Collection"] },
  { id: 3, title: "Financial Analyst", company: "Equity Bank", location: "Dar es Salaam, TZ", type: "Full-time", salary: "TZS 1.8M–2.5M/mo", tag: "Finance", color: "#9333ea", description: "Analyze financial data and prepare reports for senior management.", skills: ["Excel", "Financial Modeling", "SQL"] },
  { id: 4, title: "Digital Marketing Lead", company: "Jumia Africa", location: "Remote", type: "Remote", salary: "$800–1,200/mo", tag: "Marketing", color: "#e11d48", description: "Drive digital campaigns across social media and email for African markets.", skills: ["SEO", "Social Media", "Analytics"] },
  { id: 5, title: "Legal Aid Lawyer", company: "Women's Rights Initiative", location: "Lagos, Nigeria", type: "Part-time", salary: "NGN 250K–400K/mo", tag: "Law", color: "#6d28d9", description: "Provide legal support to women facing domestic and workplace issues.", skills: ["Family Law", "Advocacy", "Legal Research"] },
  { id: 6, title: "Data Scientist", company: "Andela", location: "Remote", type: "Remote", salary: "$1,500–2,500/mo", tag: "Technology", color: "#7c3aed", description: "Build ML models to solve real-world problems across African markets.", skills: ["Python", "Machine Learning", "SQL"] },
  { id: 7, title: "Primary School Teacher", company: "Bridge International", location: "Kigali, Rwanda", type: "Full-time", salary: "RWF 350K–500K/mo", tag: "Education", color: "#be185d", description: "Teach primary school students using innovative digital curriculum.", skills: ["Teaching", "Curriculum Design", "Child Development"] },
  { id: 8, title: "UX Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "$1,000–1,800/mo", tag: "Design", color: "#a21caf", description: "Design intuitive user experiences for fintech products used across Africa.", skills: ["Figma", "User Research", "Prototyping"] },
];

type Job = typeof ALL_JOBS[0];
const SWIPE_THRESHOLD = 80;

export default function JobSwipe() {
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<Job[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [flyDir, setFlyDir] = useState<"left" | "right" | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [checkingPremium, setCheckingPremium] = useState(true);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("verified")
          .eq("id", data.session.user.id)
          .single();
        setIsPremium(profile?.verified === true);
      }
      setCheckingPremium(false);
    });
  }, []);

  if (checkingPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="container mx-auto px-4 h-14 flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-3">Premium Feature</h2>
            <p className="text-muted-foreground mb-2">Job Swipe is available for <span className="font-semibold text-primary">verified members</span> only.</p>
            <p className="text-muted-foreground text-sm mb-8">Get verified to unlock job matching, exclusive opportunities, and more.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border text-left">
                <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Swipe to match jobs</p>
                  <p className="text-xs text-muted-foreground">Tinder-style job matching</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border text-left">
                <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Save & apply to jobs</p>
                  <p className="text-xs text-muted-foreground">Keep track of your applications</p>
                </div>
              </div>
            </div>
            <Link to="/profile"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white text-sm"
              style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
              <Crown className="h-4 w-4" /> Request Verification
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const current = ALL_JOBS[index];
  const done = index >= ALL_JOBS.length;

  const dismiss = (dir: "left" | "right") => {
    if (!current || flyDir) return;
    setFlyDir(dir);
    setTimeout(() => {
      if (dir === "right") setSaved((s) => [current, ...s]);
      setIndex((i) => i + 1);
      setFlyDir(null);
      setDragX(0);
    }, 350);
  };

  const onDragStart = (clientX: number) => { dragStart.current = clientX; setIsDragging(true); };
  const onDragMove  = (clientX: number) => { if (dragStart.current !== null) setDragX(clientX - dragStart.current); };
  const onDragEnd   = () => {
    setIsDragging(false);
    if (Math.abs(dragX) > SWIPE_THRESHOLD) dismiss(dragX > 0 ? "right" : "left");
    else setDragX(0);
    dragStart.current = null;
  };

  const rotation    = isDragging ? dragX * 0.08 : flyDir === "right" ? 20 : flyDir === "left" ? -20 : 0;
  const translateX  = flyDir === "right" ? 700 : flyDir === "left" ? -700 : isDragging ? dragX : 0;
  const likeOpacity = Math.min(Math.max(dragX / 80, 0), 1);
  const nopeOpacity = Math.min(Math.max(-dragX / 80, 0), 1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-heading font-semibold">Job Swipe</span>
            </div>
          </div>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: showSaved ? "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" : "hsl(var(--muted))",
              color: showSaved ? "white" : "hsl(var(--foreground))",
            }}
          >
            <BookmarkCheck className="h-4 w-4" />
            Saved ({saved.length})
          </button>
        </div>
      </div>

      {showSaved ? (
        /* Saved Jobs */
        <div className="container mx-auto px-4 py-8 max-w-2xl flex-1">
          <h2 className="font-heading text-2xl font-bold mb-6">Jobs You Liked</h2>
          {saved.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ThumbsUp className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No saved jobs yet. Swipe right on jobs you like!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {saved.map((job) => (
                <div key={job.id} className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-lg" style={{ background: job.color }}>
                    {job.title[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                    </div>
                    <p className="text-sm font-semibold mt-1" style={{ color: job.color }}>{job.salary}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Swipe area */
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 select-none">
          {/* Progress */}
          <div className="flex gap-1.5 mb-6">
            {ALL_JOBS.map((_, i) => (
              <div key={i} className="h-1.5 w-6 rounded-full transition-all"
                style={{ background: i < index ? "linear-gradient(90deg, hsl(330 80% 55%), hsl(270 55% 45%))" : "hsl(var(--muted))" }} />
            ))}
          </div>

          {done ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-heading text-2xl font-bold mb-2">You've seen all jobs!</h3>
              <p className="text-muted-foreground mb-6">Check your saved jobs or start over.</p>
              <button
                onClick={() => { setIndex(0); setSaved([]); }}
                className="px-6 py-3 rounded-full font-bold text-white"
                style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}
              >
                Start Over
              </button>
            </div>
          ) : (
            <>
              {/* Single card */}
              <div className="relative w-full max-w-sm" style={{ height: 480 }}>
                <div
                  className="absolute inset-0 rounded-3xl bg-card border border-border shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden"
                  style={{
                    transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
                    transition: flyDir || !isDragging ? "transform 0.35s cubic-bezier(0.25,1,0.5,1)" : "none",
                  }}
                  onMouseDown={(e) => onDragStart(e.clientX)}
                  onMouseMove={(e) => isDragging && onDragMove(e.clientX)}
                  onMouseUp={onDragEnd}
                  onMouseLeave={onDragEnd}
                  onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
                  onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
                  onTouchEnd={onDragEnd}
                >
                  <div className="h-2 w-full" style={{ background: current.color }} />

                  <div className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-xl border-4 font-black text-2xl tracking-widest rotate-[-20deg]"
                    style={{ borderColor: "#22c55e", color: "#22c55e", opacity: likeOpacity }}>LIKE</div>
                  <div className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-xl border-4 font-black text-2xl tracking-widest rotate-[20deg]"
                    style={{ borderColor: "#ef4444", color: "#ef4444", opacity: nopeOpacity }}>NOPE</div>

                  <div className="p-6 flex flex-col h-full">
                    <span className="self-start text-xs font-bold px-3 py-1 rounded-full text-white mb-4" style={{ background: current.color }}>
                      {current.tag}
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-1">{current.title}</h2>
                    <p className="text-base font-medium text-muted-foreground mb-4">{current.company}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{current.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{current.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{current.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {current.skills.map((s) => (
                        <span key={s} className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{ background: `${current.color}18`, color: current.color }}>{s}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">Salary</p>
                      <p className="text-lg font-bold font-heading" style={{ color: current.color }}>{current.salary}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbs up / down only */}
              <div className="flex items-center gap-10 mt-8">
                <button onClick={() => dismiss("left")}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
                  style={{ background: "white", border: "3px solid #ef4444" }}>
                  <ThumbsDown className="h-7 w-7" style={{ color: "#ef4444" }} />
                </button>
                <button onClick={() => dismiss("right")}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95"
                  style={{ background: "white", border: "3px solid #22c55e" }}>
                  <ThumbsUp className="h-7 w-7" style={{ color: "#22c55e" }} />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Swipe right to save · Swipe left to skip · {ALL_JOBS.length - index} remaining
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
