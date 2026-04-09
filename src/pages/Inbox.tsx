import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

const MENTORS = [
  { id: "1", name: "Dr. Amara K.", role: "Mental Health Counselor", photo: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", online: true },
  { id: "2", name: "Pastor Grace N.", role: "Spiritual Guidance", photo: "https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", online: false },
  { id: "3", name: "Sarah M.", role: "Career Coach", photo: "https://images.pexels.com/photos/8471939/pexels-photo-8471939.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", online: true },
];

type LastMessage = { content: string; created_at: string; type: string };

const timeAgo = (ts: string) => {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });
};

const preview = (msg: LastMessage) => {
  if (msg.type === "voice") return "🎤 Voice note";
  if (msg.type === "image") return "📷 Photo";
  if (msg.type === "video") return "🎥 Video";
  if (msg.type === "file") return "📄 Document";
  return msg.content.length > 50 ? msg.content.slice(0, 50) + "…" : msg.content;
};

export default function Inbox() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [lastMessages, setLastMessages] = useState<Record<string, LastMessage>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user.id ?? null));
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchLast = async () => {
      const results: Record<string, LastMessage> = {};
      await Promise.all(
        MENTORS.map(async (m) => {
          const { data } = await supabase
            .from("messages")
            .select("content, created_at, type")
            .eq("room_id", `mentor-${m.id}`)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
          if (data) results[m.id] = data as LastMessage;
        })
      );
      setLastMessages(results);
    };
    fetchLast();
  }, [userId]);

  const filtered = MENTORS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold">Messages</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search mentors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Conversation list */}
        <div className="space-y-2">
          {filtered.map(mentor => {
            const last = lastMessages[mentor.id];
            return (
              <button
                key={mentor.id}
                onClick={() => navigate(`/chat/${mentor.id}`)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
              >
                <div className="relative shrink-0">
                  <img src={mentor.photo} alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-primary/20" />
                  {mentor.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-foreground text-sm">{mentor.name}</p>
                    {last && <span className="text-xs text-muted-foreground shrink-0 ml-2">{timeAgo(last.created_at)}</span>}
                  </div>
                  <p className="text-xs text-primary mb-0.5">{mentor.role}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {last ? preview(last) : "Start a conversation"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
