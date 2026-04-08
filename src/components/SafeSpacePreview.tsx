import { MessageCircle, Heart, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    category: "Relationships",
    text: "How do you deal with family pressure about marriage? I'm 28 and feel like I can't breathe...",
    replies: 24,
    hearts: 67,
    time: "2h ago",
  },
  {
    category: "Mental Health",
    text: "Some days I feel like I'm carrying the weight of everyone around me. Does anyone else feel this?",
    replies: 41,
    hearts: 103,
    time: "5h ago",
  },
  {
    category: "Personal Growth",
    text: "I just got my first job after 2 years of trying. Don't give up, sisters! 💛",
    replies: 89,
    hearts: 245,
    time: "8h ago",
  },
];

const SafeSpacePreview = () => {
  return (
    <section id="safe-space" className="py-24 bg-sand/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary tracking-wide uppercase">Anonymous & Safe</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Voice Matters.{" "}
              <span className="text-gradient">Your Identity Is Protected.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Share your questions, stories, and challenges without fear. Our moderated safe space ensures 
              every woman is heard, respected, and supported.
            </p>
            <Button size="lg">
              Enter Safe Space
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {posts.map((post, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
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
    </section>
  );
};

export default SafeSpacePreview;
