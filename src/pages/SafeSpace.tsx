import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, Shield, ArrowLeft, Send, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

const CATEGORIES_EN = ["All", "Relationships", "Mental Health", "Personal Growth", "Career", "Health"];

type Reply = { id: number; content: string; created_at: string };
type Post = {
  id: number; category: string; content: string;
  replies: number; hearts: number; created_at: string;
  liked?: boolean; replyList?: Reply[];
};

const timeAgo = (ts: string) => {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const SafeSpace = () => {
  const { t } = useLang();
  const categories = CATEGORIES_EN;
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal Growth");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts((data as Post[]) ?? []);
    setLoading(false);
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const { data } = await supabase
      .from("posts")
      .insert({ category: selectedCategory, content: newPost })
      .select()
      .single();
    if (data) setPosts(prev => [data as Post, ...prev]);
    setNewPost("");
  };

  const handleLike = async (post: Post) => {
    if (post.liked) return;
    const newHearts = post.hearts + 1;
    await supabase.from("posts").update({ hearts: newHearts }).eq("id", post.id);
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, hearts: newHearts, liked: true } : p));
  };

  const toggleReplies = async (post: Post) => {
    if (expandedPost === post.id) { setExpandedPost(null); return; }
    setExpandedPost(post.id);
    if (!post.replyList) {
      const { data } = await supabase
        .from("replies")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, replyList: (data as Reply[]) ?? [] } : p));
    }
  };

  const handleReply = async (post: Post) => {
    const text = replyText[post.id]?.trim();
    if (!text) return;
    const { data } = await supabase
      .from("replies")
      .insert({ post_id: post.id, content: text })
      .select()
      .single();
    if (data) {
      await supabase.from("posts").update({ replies: post.replies + 1 }).eq("id", post.id);
      setPosts(prev => prev.map(p => p.id === post.id
        ? { ...p, replies: p.replies + 1, replyList: [...(p.replyList ?? []), data as Reply] }
        : p
      ));
    }
    setReplyText(prev => ({ ...prev, [post.id]: "" }));
  };

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            <span className="font-heading font-semibold">Safe Space</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* New post */}
        <div className="p-5 rounded-2xl border border-border bg-card mb-6">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <Shield className="h-3 w-3" /> {t("yourPostAnon")}
          </p>
          <Textarea
            placeholder={t("shareOnMind")}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="mb-3 resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground"
            >
              {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
            </select>
            <Button size="sm" onClick={handlePost}>
              <Send className="h-4 w-4 mr-1" /> {t("post")}
            </Button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm">{t("loadingPosts")}</div>
        ) : (
          <div className="space-y-4">
            {filtered.map(post => (
              <div key={post.id} className="rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{timeAgo(post.created_at)}</span>
                  </div>
                  <p className="text-foreground leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm">
                    {/* Reply toggle */}
                    <button
                      onClick={() => toggleReplies(post)}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" /> {post.replies}
                      {expandedPost === post.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                    {/* Like */}
                    <button
                      onClick={() => handleLike(post)}
                      className={`flex items-center gap-1.5 transition-colors ${post.liked ? "text-pink-500" : "text-muted-foreground hover:text-pink-500"}`}
                    >
                      <Heart className={`h-4 w-4 ${post.liked ? "fill-pink-500" : ""}`} /> {post.hearts}
                    </button>
                    <span className="ml-auto text-xs italic text-muted-foreground">Anonymous</span>
                  </div>
                </div>

                {/* Replies section */}
                {expandedPost === post.id && (
                  <div className="border-t border-border bg-muted/30 px-6 py-4 space-y-3">
                    {(post.replyList ?? []).length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No replies yet. Be the first to respond.</p>
                    ) : (
                      post.replyList!.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Shield className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-foreground leading-relaxed">{reply.content}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(reply.created_at)}</p>
                          </div>
                        </div>
                      ))
                    )}
                    {/* Reply input */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Write an anonymous reply..."
                        value={replyText[post.id] ?? ""}
                        onChange={e => setReplyText(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && handleReply(post)}
                        className="flex-1 text-sm px-3 py-2 rounded-xl border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <button
                        onClick={() => handleReply(post)}
                        className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeSpace;
