import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, Calendar, Clock, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Healing Through Community",
    host: "Dr. Amara K.",
    type: "Live Q&A",
    date: "April 12, 2026",
    time: "6:00 PM EAT",
    attendees: 142,
    tag: "Mental Health",
  },
  {
    id: 2,
    title: "Financial Freedom Workshop",
    host: "Sarah M.",
    type: "Workshop",
    date: "April 15, 2026",
    time: "4:00 PM EAT",
    attendees: 89,
    tag: "Career",
  },
  {
    id: 3,
    title: "Know Your Rights",
    host: "Advocate Lena O.",
    type: "Teaching",
    date: "April 18, 2026",
    time: "5:00 PM EAT",
    attendees: 210,
    tag: "Empowerment",
  },
  {
    id: 4,
    title: "Navigating Motherhood & Career",
    host: "Pastor Grace N.",
    type: "Panel",
    date: "April 22, 2026",
    time: "7:00 PM EAT",
    attendees: 175,
    tag: "Personal Growth",
  },
  {
    id: 5,
    title: "Digital Skills Bootcamp",
    host: "Nguvu Academy",
    type: "Workshop",
    date: "April 25, 2026",
    time: "10:00 AM EAT",
    attendees: 300,
    tag: "Skills",
  },
  {
    id: 6,
    title: "Self-Love & Boundaries",
    host: "Coach Zara T.",
    type: "Live Q&A",
    date: "April 29, 2026",
    time: "6:30 PM EAT",
    attendees: 98,
    tag: "Mental Health",
  },
];

const tagColors: Record<string, string> = {
  "Mental Health": "bg-pink-100 text-pink-700",
  "Career": "bg-purple-100 text-purple-700",
  "Empowerment": "bg-violet-100 text-violet-700",
  "Personal Growth": "bg-fuchsia-100 text-fuchsia-700",
  "Skills": "bg-indigo-100 text-indigo-700",
};

const Events = () => {
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
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Upcoming Events</h1>
          <p className="text-muted-foreground">Live teachings, workshops, and Q&A sessions — join from anywhere.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {events.map((event) => (
            <div key={event.id} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[event.tag] ?? "bg-muted text-muted-foreground"}`}>
                  {event.tag}
                </span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{event.type}</span>
              </div>

              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">Hosted by {event.host}</p>

              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {event.date}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.time}</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {event.attendees} attending</span>
              </div>

              <Button size="sm" className="w-full">
                <Video className="h-4 w-4 mr-2" /> Register to Attend
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
