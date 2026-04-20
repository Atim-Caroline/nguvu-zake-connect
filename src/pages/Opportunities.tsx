import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, GraduationCap, Heart, Wrench, ExternalLink, Search } from "lucide-react";

const opportunities = [
  { id: 1, type: "Job", title: "Software Engineer", org: "Andela Uganda", location: "Kampala, Uganda", deadline: "May 10, 2026", tag: "Technology", link: "https://andela.com" },
  { id: 2, type: "Scholarship", title: "Women in STEM Scholarship", org: "Mastercard Foundation", location: "Pan-Africa", deadline: "May 20, 2026", tag: "Education", link: "https://mastercardfdn.org" },
  { id: 3, type: "Job", title: "Community Health Worker", org: "Marie Stopes Uganda", location: "Kampala, Uganda", deadline: "May 15, 2026", tag: "Health", link: "https://mariestopes.org" },
  { id: 4, type: "Volunteer", title: "Mentorship Program Volunteer", org: "Nguvu Zake", location: "Remote", deadline: "Open", tag: "Community", link: "#" },
  { id: 5, type: "Scholarship", title: "African Women Leadership Fund", org: "UN Women", location: "Pan-Africa", deadline: "June 1, 2026", tag: "Leadership", link: "https://unwomen.org" },
  { id: 6, type: "Training", title: "Digital Skills Bootcamp", org: "Nguvu Academy", location: "Online", deadline: "Rolling", tag: "Technology", link: "#" },
  { id: 7, type: "Job", title: "Finance Officer", org: "BRAC Uganda", location: "Kampala, Uganda", deadline: "May 25, 2026", tag: "Finance", link: "https://brac.net" },
  { id: 8, type: "Training", title: "Entrepreneurship Masterclass", org: "Tony Elumelu Foundation", location: "Online", deadline: "May 30, 2026", tag: "Business", link: "https://tonyelumelufoundation.org" },
];

const typeIcons: Record<string, any> = {
  Job: Briefcase, Scholarship: GraduationCap, Volunteer: Heart, Training: Wrench,
};

const typeColors: Record<string, string> = {
  Job: "bg-blue-100 text-blue-700",
  Scholarship: "bg-purple-100 text-purple-700",
  Volunteer: "bg-pink-100 text-pink-700",
  Training: "bg-green-100 text-green-700",
};

const filters = ["All", "Job", "Scholarship", "Volunteer", "Training"];

export default function Opportunities() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = opportunities.filter(o =>
    (active === "All" || o.type === active) &&
    (o.title.toLowerCase().includes(search.toLowerCase()) ||
     o.org.toLowerCase().includes(search.toLowerCase()) ||
     o.tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold">Opportunities Hub</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Opportunities Hub</h1>
          <p className="text-muted-foreground">Jobs, scholarships, volunteer roles, and skill-building programs — curated for African women.</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search opportunities..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${active === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.map(opp => {
            const Icon = typeIcons[opp.type] ?? Briefcase;
            return (
              <div key={opp.id} className="p-5 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "hsl(var(--primary) / 0.1)" }}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-foreground">{opp.title}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[opp.type]}`}>{opp.type}</span>
                      </div>
                      <p className="text-sm text-primary font-medium">{opp.org}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opp.location} · Deadline: {opp.deadline}</p>
                    </div>
                  </div>
                  <a href={opp.link} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                    Apply <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12 text-sm">No opportunities found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
