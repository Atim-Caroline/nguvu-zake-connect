import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Users, Shield, Info } from "lucide-react";
import { supabase } from "@/lib/supabase";

const GROUP_INFO: Record<string, { name: string; description: string; tag: string; rules: string[] }> = {
  "mothers-caregivers": {
    name: "Mothers & Caregivers",
    description: "A space for mothers navigating parenthood, work, and self-care.",
    tag: "Family",
    rules: ["Be kind and supportive", "No judgment", "Share experiences freely", "Respect privacy"],
  },
  "young-professionals": {
    name: "Young Professionals",
    description: "Career growth, networking, and navigating the workplace as a woman.",
    tag: "Career",
    rules: ["Share opportunities", "No spam", "Support each other's growth", "Keep it professional"],
  },
  "mental-wellness-circle": {
    name: "Mental Wellness Circle",
    description: "Safe conversations around anxiety, depression, healing, and self-love.",
    tag: "Mental Health",
    rules: ["This is a safe space", "No toxic positivity", "Trigger warnings when needed", "Seek professional help when necessary"],
  },
  "entrepreneurs-hub": {
    name: "Entrepreneurs Hub",
    description: "Women building businesses — share wins, challenges, and resources.",
    tag: "Business",
    rules: ["Share resources freely", "No MLM or pyramid schemes", "Celebrate wins", "Ask for help openly"],
  },
  "faith-spirituality": {
    name: "Faith & Spirituality",
    description: "Grounded in faith, growing together through prayer and encouragement.",
    tag: "Spirituality",
    rules: ["Respect all faiths", "No preaching", "Encouragement only", "Prayer requests welcome"],
  },
  "students-scholars": {
    name: "Students & Scholars",
    description: "Academic support, scholarships, and peer encouragement for students.",
    tag: "Education",
    rules: ["Share scholarships and opportunities", "Help each other study", "No cheating advice", "Celebrate academic wins"],
  },
};

interface Message {
  id: number;
  room_id: string;
  sender_id: string;
  content: string;
  type: string;
  created_at: string;
  sender_name?: string;
}

interface Member {
  user_id: string;
  name: string;
}

const tagColors: Record<string, string> = {
  Family: "bg-pink-100 text-pink-700",
  Career: "bg-purple-100 text-purple-700",
  "Mental Health": "bg-fuchsia-100 text-fuchsia-700",
  Business: "bg-violet-100 text-violet-700",
  Spirituality: "bg-indigo-100 text-indigo-700",
  Education: "bg-rose-100 text-rose-700",
};

const fmtTime = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const timeAgo = (ts: string) => {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

export default function GroupChat() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const group = GROUP_INFO[slug ?? ""] ?? null;
  const roomId = `group-${slug}`;

  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("Member");
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [text, setText] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { navigate("/signin"); return; }
      const u = data.session.user;
      setUserId(u.id);
      setUserName(u.user_metadata?.name || u.email?.split("@")[0] || "Member");

      // Check membership
      const { data: mem } = await supabase.from("group_members")
        .select("id").eq("user_id", u.id).eq("group_name", group?.name ?? "").single();
      setIsMember(!!mem);
    });
  }, [navigate, group]);

  // Load messages
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true })
        .limit(100);
      setMessages((data as Message[]) ?? []);
    };
    load();

    const channel = supabase
      .channel(`group-${roomId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` },
        (payload) => setMessages(prev => [...prev, payload.new as Message])
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  // Load members
  useEffect(() => {
    if (!group) return;
    const loadMembers = async () => {
      const { data } = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_name", group.name)
        .limit(50);
      if (data) {
        const memberList = await Promise.all(data.map(async (m) => {
          const { data: profile } = await supabase
            .from("profiles").select("name").eq("id", m.user_id).single();
          return { user_id: m.user_id, name: profile?.name || "Member" };
        }));
        setMembers(memberList);
      }
    };
    loadMembers();
  }, [group]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !userId) return;
    await supabase.from("messages").insert({
      room_id: roomId,
      sender_id: userId,
      content: text,
      type: "text",
    });
    setText("");
  };

  const joinGroup = async () => {
    if (!userId || !group) return;
    await supabase.from("group_members").insert({ user_id: userId, group_name: group.name });
    setIsMember(true);
  };

  if (!group) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Group not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border glass-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">
          <Link to="/community" className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-semibold text-foreground text-sm leading-tight">{group.name}</p>
            <p className="text-xs text-muted-foreground">{members.length} members</p>
          </div>
          <button onClick={() => { setShowMembers(true); setShowInfo(false); }}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <Users className="h-5 w-5" />
          </button>
          <button onClick={() => { setShowInfo(true); setShowMembers(false); }}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden container mx-auto max-w-4xl">
        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
            {/* Welcome message */}
            <div className="flex justify-center">
              <div className="px-4 py-2 rounded-full bg-muted text-xs text-muted-foreground text-center max-w-xs">
                Welcome to <span className="font-semibold">{group.name}</span> 💜
              </div>
            </div>

            {messages.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No messages yet. Be the first to say something!
              </p>
            )}

            {messages.map((msg) => {
              const isMe = msg.sender_id === userId;
              const initial = (msg.sender_name || "M")[0].toUpperCase();
              return (
                <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 self-end"
                      style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                      {initial}
                    </div>
                  )}
                  <div className={`max-w-[72%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
                    {!isMe && <span className="text-xs text-muted-foreground px-1">{msg.sender_name || "Member"}</span>}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe ? "rounded-br-sm text-white" : "rounded-bl-sm bg-card border border-border text-foreground"
                    }`}
                      style={isMe ? { background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" } : {}}>
                      {msg.content}
                    </div>
                    <span className="text-xs text-muted-foreground px-1">{fmtTime(msg.created_at)}</span>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {isMember ? (
            <div className="border-t border-border px-4 py-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 flex items-end rounded-2xl border border-border bg-card px-4 py-2.5">
                  <textarea value={text} onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder={`Message ${group.name}...`} rows={1}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none max-h-32"
                    style={{ lineHeight: "1.5" }} />
                </div>
                <button onClick={sendMessage} disabled={!text.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-all hover:scale-110"
                  style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-border px-4 py-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">Join this group to participate in the conversation</p>
              <button onClick={joinGroup}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                Join Group
              </button>
            </div>
          )}
        </div>

        {/* Side panel — Members */}
        {showMembers && (
          <div className="w-72 border-l border-border bg-card/50 flex flex-col hidden md:flex">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-sm">Members ({members.length})</h3>
              <button onClick={() => setShowMembers(false)} className="text-xs text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {members.map(m => (
                <div key={m.user_id} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                    {m.name[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-foreground truncate">{m.name}</span>
                </div>
              ))}
              {members.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No members yet</p>}
            </div>
          </div>
        )}

        {/* Side panel — Info */}
        {showInfo && (
          <div className="w-72 border-l border-border bg-card/50 flex flex-col hidden md:flex">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-sm">About</h3>
              <button onClick={() => setShowInfo(false)} className="text-xs text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[group.tag] ?? "bg-muted text-muted-foreground"}`}>
                {group.tag}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{group.description}</p>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Group Rules</h4>
                <ul className="space-y-1.5">
                  {group.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> {members.length} members
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
