import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, Shield, ArrowLeft, Send } from "lucide-react";

const categories = ["All", "Relationships", "Mental Health", "Personal Growth", "Career", "Health"];

const initialPosts = [
  { id: 1, category: "Relationships", text: "How do you deal with family pressure about marriage? I'm 28 and feel like I can't breathe...", replies: 24, hearts: 67, time: "2h ago" },
  { id: 2, category: "Mental Health", text: "Some days I feel like I'm carrying the weight of everyone around me. Does anyone else feel this?", replies: 41, hearts: 103, time: "5h ago" },
  { id: 3, category: "Personal Growth", text: "I just got my first job after 2 years of trying. Don't give up, sisters! 💛", replies: 89, hearts: 245, time: "8h ago" },
];

const SafeSpace = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal Growth");

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), category: selectedCategory, text: newPost, replies: 0, hearts: 0, time: "Just now" }, ...posts]);
    setNewPost("");
  };

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
            <Shield className="h-3 w-3" /> Your post will be anonymous
          </p>
          <Textarea
            placeholder="Share something on your mind..."
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
              <Send className="h-4 w-4 mr-1" /> Post
            </Button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filtered.map(post => (
            <div key={post.id} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">{post.time}</span>
              </div>
              <p className="text-foreground leading-relaxed mb-4">{post.text}</p>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" /> {post.replies}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> {post.hearts}
                </span>
                <span className="ml-auto text-xs italic">Anonymous</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafeSpace;
