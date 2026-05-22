import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Heart, MessageCircle, Star, CheckCircle, Loader2, X, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";

const groups = [
  { name: "Mothers & Caregivers", slug: "mothers-caregivers", members: 1240, description: "A space for mothers navigating parenthood, work, and self-care.", tag: "Family", rules: ["Be kind and supportive", "No judgment", "Share experiences freely", "Respect privacy"], highlights: ["Weekly parenting tips", "Work-life balance discussions", "Self-care challenges", "Peer support"] },
  { name: "Young Professionals", slug: "young-professionals", members: 890, description: "Career growth, networking, and navigating the workplace as a woman.", tag: "Career", rules: ["Share opportunities", "No spam", "Support each other's growth", "Keep it professional"], highlights: ["Job opportunities shared daily", "CV review sessions", "Networking events", "Mentorship connections"] },
  { name: "Mental Wellness Circle", slug: "mental-wellness-circle", members: 2100, description: "Safe conversations around anxiety, depression, healing, and self-love.", tag: "Mental Health", rules: ["This is a safe space", "No toxic positivity", "Trigger warnings when needed", "Seek professional help when necessary"], highlights: ["Anonymous sharing welcome", "Weekly check-ins", "Guided breathing exercises", "Professional counselor Q&As"] },
  { name: "Entrepreneurs Hub", slug: "entrepreneurs-hub", members: 670, description: "Women building businesses — share wins, challenges, and resources.", tag: "Business", rules: ["Share resources freely", "No MLM or pyramid schemes", "Celebrate wins", "Ask for help openly"], highlights: ["Business idea feedback", "Funding opportunities", "Pitch practice sessions", "Supplier & client referrals"] },
  { name: "Faith & Spirituality", slug: "faith-spirituality", members: 530, description: "Grounded in faith, growing together through prayer and encouragement.", tag: "Spirituality", rules: ["Respect all faiths", "No preaching", "Encouragement only", "Prayer requests welcome"], highlights: ["Daily devotionals", "Prayer request board", "Faith-based encouragement", "Spiritual growth resources"] },
  { name: "Students & Scholars", slug: "students-scholars", members: 410, description: "Academic support, scholarships, and peer encouragement for students.", tag: "Education", rules: ["Share scholarships and opportunities", "Help each other study", "No cheating advice", "Celebrate academic wins"], highlights: ["Scholarship alerts", "Study group sessions", "Exam tips & resources", "University application help"] },
];

const tagColors: Record<string, string> = {
  Family: "bg-pink-100 text-pink-700",
  Career: "bg-purple-100 text-purple-700",
  "Mental Health": "bg-fuchsia-100 text-fuchsia-700",
  Business: "bg-violet-100 text-violet-700",
  Spirituality: "bg-indigo-100 text-indigo-700",
  Education: "bg-rose-100 text-rose-700",
};

type Group = typeof groups[0];

const Community = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>(
    Object.fromEntries(groups.map(g => [g.name, g.members]))
  );
  const [loading, setLoading] = useState<string | null>(null);
  const [preview, setPreview] = useState<Group | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      setUserId(data.session.user.id);
      const { data: memberships } = await supabase
        .from("group_members").select("group_name").eq("user_id", data.session.user.id);
      if (memberships) setJoined(new Set(memberships.map(m => m.group_name)));
    });
  }, []);

  const handleJoin = async (group: Group) => {
    if (!userId) { navigate("/signin"); return; }
    setLoading(group.name);
    if (joined.has(group.name)) {
      await supabase.from("group_members").delete().eq("user_id", userId).eq("group_name", group.name);
      setJoined(prev => { const s = new Set(prev); s.delete(group.name); return s; });
      setMemberCounts(prev => ({ ...prev, [group.name]: prev[group.name] - 1 }));
    } else {
      await supabase.from("group_members").insert({ user_id: userId, group_name: group.name });
      setJoined(prev => new Set([...prev, group.name]));
      setMemberCounts(prev => ({ ...prev, [group.name]: prev[group.name] + 1 }));
    }
    setLoading(null);
  };

  const handleEnterChat = (group: Group) => {
    if (!userId) { navigate("/signin"); return; }
    navigate(`/group/${group.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold">Community</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Support Groups</h1>
          <p className="text-muted-foreground">Find your people. Join a group that speaks to your journey.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {groups.map((group) => {
            const isJoined = joined.has(group.name);
            const isLoading = loading === group.name;
            return (
              <div key={group.name} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[group.tag] ?? "bg-muted text-muted-foreground"}`}>
                    {group.tag}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> {memberCounts[group.name].toLocaleString()} members
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{group.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{group.description}</p>

                <div className="flex gap-2">
                  {isJoined ? (
                    <button onClick={() => handleEnterChat(group)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                      <MessageCircle className="h-4 w-4" /> Open Chat
                    </button>
                  ) : (
                    <button onClick={() => handleJoin(group)} disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Heart className="h-4 w-4" /> Join Group</>}
                    </button>
                  )}
                  <button onClick={() => setPreview(group)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold border-2 border-border hover:bg-muted transition-all"
                    style={{ color: "hsl(var(--foreground))" }}>
                    <MessageCircle className="h-4 w-4" /> Preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create group */}
        <div className="mt-10 p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
          <Star className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading text-xl font-semibold mb-2">Start Your Own Group</h3>
          <p className="text-muted-foreground text-sm mb-4">Have a topic close to your heart? Create a community around it.</p>
          <Button onClick={() => setShowCreate(!showCreate)}>Create a Group</Button>
          {showCreate && (
            <div className="mt-5 text-left space-y-3">
              <input type="text" placeholder="Group name" value={newGroupName} onChange={e => setNewGroupName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea placeholder="What is this group about?" value={newGroupDesc} onChange={e => setNewGroupDesc(e.target.value)} rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <Button className="w-full" disabled={!newGroupName.trim()} onClick={() => { setShowCreate(false); setNewGroupName(""); setNewGroupDesc(""); }}>
                Submit for Review
              </Button>
              <p className="text-xs text-muted-foreground text-center">Groups are reviewed before going live.</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setPreview(null)}>
          <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between"
              style={{ background: "linear-gradient(135deg, hsl(270 55% 45%), hsl(330 80% 55%))" }}>
              <div>
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">{preview.tag}</span>
                <h2 className="font-heading text-xl font-bold text-white mt-1">{preview.name}</h2>
                <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {memberCounts[preview.name].toLocaleString()} members
                </p>
              </div>
              <button onClick={() => setPreview(null)} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{preview.description}</p>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">What happens here</h4>
                <div className="grid grid-cols-2 gap-2">
                  {preview.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-xl px-3 py-2">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Group Rules</h4>
                <ul className="space-y-1.5">
                  {preview.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                {joined.has(preview.name) ? (
                  <button onClick={() => { setPreview(null); handleEnterChat(preview); }}
                    className="flex-1 py-3 rounded-full text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                    Open Chat
                  </button>
                ) : (
                  <button onClick={() => { handleJoin(preview); setPreview(null); }}
                    className="flex-1 py-3 rounded-full text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                    Join Group
                  </button>
                )}
                <button onClick={() => setPreview(null)}
                  className="flex-1 py-3 rounded-full text-sm font-semibold border-2 border-border hover:bg-muted transition-all">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
