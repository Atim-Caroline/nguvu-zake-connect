import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Send, Mic, Paperclip, Image, Video,
  FileText, X, Play, CheckCheck, MoreVertical, Phone,
} from "lucide-react";

const MENTORS = [
  { id: "1", name: "Dr. Amara K.", role: "Mental Health Counselor", photo: "https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", online: true },
  { id: "2", name: "Pastor Grace N.", role: "Spiritual Guidance", photo: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", online: false },
  { id: "3", name: "Sarah M.", role: "Career Coach", photo: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", online: true },
];

type MsgType = "text" | "voice" | "image" | "video" | "file";

interface Message {
  id: number;
  from: "me" | "mentor";
  type: MsgType;
  content: string;
  fileName?: string;
  time: string;
  read: boolean;
}

const initialMessages = (mentorName: string): Message[] => [
  { id: 1, from: "mentor", type: "text", content: `Hi! I'm ${mentorName}. How can I support you today?`, time: "10:00 AM", read: true },
  { id: 2, from: "me", type: "text", content: "Hello! I've been struggling with work-life balance lately.", time: "10:02 AM", read: true },
  { id: 3, from: "mentor", type: "text", content: "That's very common. Let's talk through it — what does a typical day look like for you?", time: "10:03 AM", read: true },
];

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function MentorChat() {
  const { id } = useParams<{ id: string }>();
  const mentor = MENTORS.find((m) => m.id === id) ?? MENTORS[0];

  const [messages, setMessages] = useState<Message[]>(initialMessages(mentor.name));
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [attachMenu, setAttachMenu] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (msg: Omit<Message, "id" | "time" | "read">) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now(), time: now(), read: false }]);
    // simulate mentor reply after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "mentor", type: "text", content: "Thank you for sharing that with me. 💜", time: now(), read: true },
      ]);
    }, 1500);
  };

  const sendText = () => {
    if (!text.trim()) return;
    send({ from: "me", type: "text", content: text });
    setText("");
  };

  const startRecording = () => {
    setRecording(true);
    setRecordSecs(0);
    timerRef.current = setInterval(() => setRecordSecs((s) => s + 1), 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
    send({ from: "me", type: "voice", content: `Voice note (${recordSecs}s)` });
    setRecordSecs(0);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: MsgType) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    send({ from: "me", type, content: url, fileName: file.name });
    e.target.value = "";
    setAttachMenu(false);
  };

  const fmtSecs = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Chat header */}
      <div className="sticky top-0 z-10 border-b border-border glass-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3">
          <Link to="/#mentorship" className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="relative">
            <img src={mentor.photo} alt={mentor.name}
              className="w-10 h-10 rounded-full object-cover object-top border-2 border-primary/30" />
            {mentor.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-heading font-semibold text-foreground text-sm leading-tight">{mentor.name}</p>
            <p className="text-xs text-muted-foreground">{mentor.online ? "Online now" : "Last seen recently"} · {mentor.role}</p>
          </div>

          <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 container mx-auto max-w-2xl">
        {messages.map((msg) => {
          const isMe = msg.from === "me";
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!isMe && (
                <img src={mentor.photo} alt={mentor.name}
                  className="w-8 h-8 rounded-full object-cover object-top shrink-0 self-end" />
              )}

              <div className={`max-w-[72%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "rounded-br-sm text-white"
                      : "rounded-bl-sm bg-card border border-border text-foreground"
                  }`}
                  style={isMe ? { background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" } : {}}
                >
                  {msg.type === "text" && <p>{msg.content}</p>}

                  {msg.type === "voice" && (
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Play className="h-4 w-4 fill-current" />
                      </button>
                      <div className="flex-1">
                        <div className="flex gap-0.5 items-center h-6">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="w-1 rounded-full bg-current opacity-60"
                              style={{ height: `${Math.random() * 16 + 4}px` }} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs opacity-70">{msg.content.match(/\d+s/)?.[0]}</span>
                    </div>
                  )}

                  {msg.type === "image" && (
                    <img src={msg.content} alt="shared" className="rounded-xl max-w-full max-h-48 object-cover" />
                  )}

                  {msg.type === "video" && (
                    <video src={msg.content} controls className="rounded-xl max-w-full max-h-48" />
                  )}

                  {msg.type === "file" && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate max-w-[140px]">{msg.fileName}</p>
                        <p className="text-xs opacity-70">Document</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`flex items-center gap-1 text-xs text-muted-foreground ${isMe ? "flex-row-reverse" : ""}`}>
                  <span>{msg.time}</span>
                  {isMe && <CheckCheck className="h-3.5 w-3.5 text-primary" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 border-t border-border glass-card px-4 py-3">
        <div className="container mx-auto max-w-2xl">
          {recording ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 border border-red-200">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium text-red-600 flex-1">Recording... {fmtSecs(recordSecs)}</span>
              <button onClick={stopRecording}
                className="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors">
                Send
              </button>
              <button onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setRecording(false); setRecordSecs(0); }}
                className="p-1.5 rounded-full hover:bg-red-100 transition-colors text-red-400">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-end gap-2">
              {/* Attach menu */}
              <div className="relative">
                <button
                  onClick={() => setAttachMenu(!attachMenu)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-muted"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <Paperclip className="h-5 w-5" />
                </button>

                {attachMenu && (
                  <div className="absolute bottom-12 left-0 flex flex-col gap-2 p-2 rounded-2xl bg-card border border-border shadow-xl">
                    <button onClick={() => imageRef.current?.click()}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(330 80% 55% / 0.15)" }}>
                        <Image className="h-4 w-4" style={{ color: "hsl(330 80% 55%)" }} />
                      </div>
                      Photo
                    </button>
                    <button onClick={() => videoRef.current?.click()}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(270 55% 45% / 0.15)" }}>
                        <Video className="h-4 w-4" style={{ color: "hsl(270 55% 45%)" }} />
                      </div>
                      Video
                    </button>
                    <button onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(290 60% 55% / 0.15)" }}>
                        <FileText className="h-4 w-4" style={{ color: "hsl(290 60% 55%)" }} />
                      </div>
                      Document
                    </button>
                  </div>
                )}
              </div>

              {/* Text input */}
              <div className="flex-1 flex items-end rounded-2xl border border-border bg-card px-4 py-2.5 gap-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(); } }}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none max-h-32"
                  style={{ lineHeight: "1.5" }}
                />
              </div>

              {/* Voice / Send */}
              {text.trim() ? (
                <button onClick={sendText}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
                  style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                  <Send className="h-4 w-4" />
                </button>
              ) : (
                <button onMouseDown={startRecording} onMouseUp={stopRecording}
                  onTouchStart={startRecording} onTouchEnd={stopRecording}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
                  style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                  <Mic className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, "image")} />
      <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={(e) => handleFile(e, "video")} />
      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" className="hidden" onChange={(e) => handleFile(e, "file")} />
    </div>
  );
}
