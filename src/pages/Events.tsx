import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Calendar, Clock, Users, Radio, X, Bell, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const events = [
  { id: "1", title: "Healing Through Community", host: "Dr. Amara K.", type: "Live Q&A", date: "April 12, 2026", time: "6:00 PM EAT", attendees: 142, tag: "Mental Health", isLive: true },
  { id: "2", title: "Financial Freedom Workshop", host: "Sarah M.", type: "Workshop", date: "April 15, 2026", time: "4:00 PM EAT", attendees: 89, tag: "Career", isLive: false },
  { id: "3", title: "Know Your Rights", host: "Advocate Lena O.", type: "Teaching", date: "April 18, 2026", time: "5:00 PM EAT", attendees: 210, tag: "Empowerment", isLive: false },
  { id: "2", title: "Navigating Motherhood & Career", host: "Pastor Grace N.", type: "Panel", date: "April 22, 2026", time: "7:00 PM EAT", attendees: 175, tag: "Personal Growth", isLive: true },
  { id: "3", title: "Digital Skills Bootcamp", host: "Nguvu Academy", type: "Workshop", date: "April 25, 2026", time: "10:00 AM EAT", attendees: 300, tag: "Skills", isLive: false },
  { id: "1", title: "Self-Love & Boundaries", host: "Coach Zara T.", type: "Live Q&A", date: "April 29, 2026", time: "6:30 PM EAT", attendees: 98, tag: "Mental Health", isLive: false },
];

const tagColors: Record<string, string> = {
  "Mental Health": "bg-pink-100 text-pink-700",
  "Career": "bg-purple-100 text-purple-700",
  "Empowerment": "bg-violet-100 text-violet-700",
  "Personal Growth": "bg-fuchsia-100 text-fuchsia-700",
  "Skills": "bg-indigo-100 text-indigo-700",
};

type Event = typeof events[0];

const RegisterModal = ({ event, onClose }: { event: Event; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { t } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    // TODO: send to backend / notification service
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between"
          style={{ background: "linear-gradient(135deg, hsl(270 55% 45%), hsl(330 80% 55%))" }}>
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">{event.type}</p>
            <h2 className="font-heading text-xl font-bold text-white leading-tight">{event.title}</h2>
            <p className="text-white/80 text-sm mt-1">Hosted by {event.host}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors shrink-0 ml-3">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "hsl(330 80% 55% / 0.1)" }}>
                <CheckCircle className="h-8 w-8" style={{ color: "hsl(330 80% 55%)" }} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{t("youreRegistered")}</h3>
              <p className="text-muted-foreground text-sm mb-1">
                {t("reminderSent")} <span className="font-semibold text-foreground">{email}</span>
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {t("whenGoesLive")}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted rounded-xl px-4 py-3">
                <Bell className="h-4 w-4 text-primary" />
                {t("notificationEmail")}
              </div>
              <button onClick={onClose}
                className="mt-5 w-full py-3 rounded-full font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                {t("done")}
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{event.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{event.time}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-5">
                Fill in your details and we'll notify you the moment this event goes live.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{t("fullName")}</label>
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{t("emailAddress")}</label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all" />
                </div>
                <button type="submit"
                  className="w-full py-3.5 rounded-full font-bold text-white text-sm transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                  <Bell className="h-4 w-4" /> {t("attendGetNotified")}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const { t } = useLang();
  const [registerEvent, setRegisterEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold">Live Events</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">{t("upcomingEvents")}</h1>
          <p className="text-muted-foreground">{t("liveTeachings")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {events.map((event, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[event.tag] ?? "bg-muted text-muted-foreground"}`}>
                  {event.tag}
                </span>
                <div className="flex items-center gap-2">
                  {event.isLive && (
                    <span className="flex items-center gap-1 text-xs font-black text-white px-2.5 py-1 rounded-full"
                      style={{ background: "#ff0050" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{event.type}</span>
                </div>
              </div>

              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">Hosted by {event.host}</p>

              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {event.date}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.time}</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {event.attendees} attending</span>
              </div>

              {event.isLive ? (
                <button
                  onClick={() => navigate(`/live/${event.id}`)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #ff0050, #7c3aed)" }}
                >
                  <Radio className="h-4 w-4 animate-pulse" /> {t("joinLiveNow")}
                </button>
              ) : (
                <button onClick={() => setRegisterEvent(event)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 shadow-md"
                  style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                  <Bell className="h-4 w-4" /> {t("registerToAttend")}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {registerEvent && (
        <RegisterModal event={registerEvent} onClose={() => setRegisterEvent(null)} />
      )}
    </div>
  );
};

export default Events;
