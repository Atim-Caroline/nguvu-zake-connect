import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Share2, Users, Send,
  Mic, MicOff, Gift, Hand, CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const LIVES = [
  { id: "1", host: "Dr. Amara K.", topic: "Healing from Trauma — Live Q&A", photo: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop", viewers: 1243, color: "#7c3aed" },
  { id: "2", host: "Pastor Grace N.", topic: "Finding Your Purpose", photo: "https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop", viewers: 892, color: "#db2777" },
  { id: "3", host: "Sarah M.", topic: "Career Growth Masterclass", photo: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop", viewers: 567, color: "#9333ea" },
];

const EMOJIS = ["❤️", "🔥", "👏", "💜", "✨", "😍", "💪"];

interface FloatingHeart { id: number; x: number; emoji: string }
interface Comment { id: number; user: string; text: string; color: string }

// Simulate: current user is a viewer, not the host
const IS_HOST = false;

export default function LiveStream() {
  const { id } = useParams<{ id: string }>();
  const live = LIVES.find((l) => l.id === id) ?? LIVES[0];
  const roomId = `live-${live.id}`;

  const [viewers, setViewers] = useState(live.viewers);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [muted, setMuted] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [speakRequested, setSpeakRequested] = useState(false);
  const [speakApproved, setSpeakApproved] = useState(false);
  const [showSpeakModal, setShowSpeakModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("You");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Get current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      if (u) {
        setUserId(u.id);
        setUserName(u.user_metadata?.name || u.email?.split("@")[0] || "You");
      }
    });
  }, []);

  // Load existing comments + subscribe to realtime
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("messages")
        .select("id, sender_id, content, created_at")
        .eq("room_id", roomId)
        .eq("type", "text")
        .order("created_at", { ascending: true })
        .limit(50);
      if (data) {
        const colors = ["#db2777", "#7c3aed", "#9333ea", "#be185d", "#6d28d9"];
        setComments(data.map((m: any, i: number) => ({
          id: m.id,
          user: m.sender_id === userId ? userName : "Member",
          text: m.content,
          color: colors[i % colors.length],
        })));
      }
    };
    load();

    const channel = supabase
      .channel(`live-${roomId}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages",
        filter: `room_id=eq.${roomId}`,
      }, (payload) => {
        const m = payload.new as any;
        const colors = ["#db2777", "#7c3aed", "#9333ea", "#be185d", "#6d28d9"];
        setComments(prev => [...prev.slice(-50), {
          id: m.id,
          user: m.sender_id === userId ? userName : "Member",
          text: m.content,
          color: colors[Math.floor(Math.random() * colors.length)],
        }]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId, userId, userName]);

  useEffect(() => {
    const t = setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 5) - 2), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const sendHeart = () => {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const h: FloatingHeart = { id: Date.now(), x: Math.random() * 60 + 20, emoji };
    setHearts((prev) => [...prev, h]);
    setLikes((l) => l + 1);
    setTimeout(() => setHearts((prev) => prev.filter((hh) => hh.id !== h.id)), 2000);
  };

  const sendComment = async () => {
    if (!input.trim() || !userId) return;
    await supabase.from("messages").insert({
      room_id: roomId,
      sender_id: userId,
      content: input,
      type: "text",
    });
    setInput("");
  };

  const requestSpeak = () => {
    setSpeakRequested(true);
    setShowSpeakModal(false);
    setComments((prev) => [...prev, { id: Date.now(), user: "You", text: "✋ raised their hand to speak", color: "#7c3aed" }]);
    // Simulate host approving after 4s
    setTimeout(() => {
      setSpeakApproved(true);
      setComments((prev) => [...prev, { id: Date.now(), user: live.host, text: "✅ You've been approved to speak!", color: "#22c55e" }]);
    }, 4000);
  };

  const gifts = ["🌸", "💎", "👑", "🌟", "🎁", "💐"];

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={live.photo} alt={live.host} className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6) contrast(1.1) saturate(1.15)", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Floating hearts */}
      {hearts.map((h) => (
        <div key={h.id} className="absolute bottom-32 text-2xl pointer-events-none z-30"
          style={{ left: `${h.x}%`, animation: "floatUp 2s ease-out forwards" }}>
          {h.emoji}
        </div>
      ))}

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-4 pb-2">
        <Link to="/events" className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white" style={{ background: "#ff0050" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 text-white text-xs font-semibold backdrop-blur-sm">
            <Users className="h-3.5 w-3.5" /> {viewers.toLocaleString()}
          </div>
        </div>
        <button className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Host info */}
      <div className="relative z-20 px-4 mt-1 flex items-center gap-3">
        <img src={live.photo} alt={live.host}
          className="w-10 h-10 rounded-full object-cover object-top border-2" style={{ borderColor: live.color }} />
        <div>
          <p className="text-white font-bold text-sm leading-tight">{live.host}</p>
          <p className="text-white/70 text-xs">{live.topic}</p>
        </div>
      </div>

      {/* Speak approved banner */}
      {speakApproved && (
        <div className="relative z-20 mx-4 mt-3 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)" }}>
          <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
          <p className="text-green-300 text-xs font-semibold">You're live! Your mic is now active.</p>
        </div>
      )}

      <div className="flex-1" />

      {/* Comments */}
      <div className="relative z-20 px-4 pb-2 max-h-56 overflow-y-auto space-y-2 scrollbar-hide">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-2 animate-fade-in">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
              style={{ background: c.color }}>{c.user[0]}</div>
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-1.5 max-w-[85%]">
              <span className="text-xs font-bold mr-1.5" style={{ color: c.color }}>{c.user}</span>
              <span className="text-white text-xs">{c.text}</span>
            </div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>

      {/* Bottom controls */}
      <div className="relative z-20 px-4 pb-6 pt-2">
        {/* Comment input */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/20">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendComment()}
              placeholder="Say something..."
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/50 outline-none" />
          </div>
          {input.trim() && (
            <button onClick={sendComment}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: live.color }}>
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mic — only shown if approved to speak or is host */}
            {(IS_HOST || speakApproved) && (
              <button onClick={() => setMuted(!muted)}
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-all">
                {muted ? <MicOff className="h-5 w-5 text-red-400" /> : <Mic className="h-5 w-5" />}
              </button>
            )}

            {/* Request to speak — only for viewers who haven't requested yet */}
            {!IS_HOST && !speakApproved && (
              <button
                onClick={() => setShowSpeakModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
                style={{
                  background: speakRequested ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.15)",
                  border: `1.5px solid ${speakRequested ? "#7c3aed" : "rgba(255,255,255,0.3)"}`,
                  color: speakRequested ? "#c4b5fd" : "white",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Hand className="h-4 w-4" />
                {speakRequested ? "Waiting..." : "Request to Speak"}
              </button>
            )}

            {/* Gifts */}
            <button onClick={() => setShowGifts(!showGifts)}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 text-white">
              <Gift className="h-5 w-5" />
            </button>
          </div>

          {/* Heart */}
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm font-semibold">{likes.toLocaleString()}</span>
            <button onClick={sendHeart}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all active:scale-125"
              style={{ background: "linear-gradient(135deg, #ff0050, #7c3aed)" }}>
              ❤️
            </button>
          </div>
        </div>

        {/* Gift picker */}
        {showGifts && (
          <div className="mt-3 p-3 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 flex justify-around">
            {gifts.map((g) => (
              <button key={g} onClick={() => {
                setComments((prev) => [...prev, { id: Date.now(), user: "You", text: `sent ${g}`, color: "#ff0050" }]);
                setShowGifts(false);
              }} className="text-3xl transition-all hover:scale-125 active:scale-150">{g}</button>
            ))}
          </div>
        )}
      </div>

      {/* Request to speak modal */}
      {showSpeakModal && (
        <div className="absolute inset-0 z-40 flex items-end justify-center pb-8 px-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm rounded-3xl overflow-hidden"
            style={{ background: "rgba(20,10,40,0.95)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="px-6 pt-6 pb-4 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(124,58,237,0.2)", border: "2px solid #7c3aed" }}>
                <Hand className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-white font-heading font-bold text-lg mb-1">Request to Speak</h3>
              <p className="text-white/60 text-sm mb-6">
                Raise your hand and {live.host} will approve your request to speak live.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowSpeakModal(false)}
                  className="flex-1 py-3 rounded-full text-sm font-semibold text-white/70 border border-white/20 hover:bg-white/10 transition-all">
                  Cancel
                </button>
                <button onClick={requestSpeak}
                  className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                  ✋ Raise Hand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-180px) scale(1.5); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
