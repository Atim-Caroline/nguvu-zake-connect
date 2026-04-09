import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Heart, MessageCircle, Star } from "lucide-react";

const groups = [
  { name: "Mothers & Caregivers", members: 1240, description: "A space for mothers navigating parenthood, work, and self-care.", tag: "Family" },
  { name: "Young Professionals", members: 890, description: "Career growth, networking, and navigating the workplace as a woman.", tag: "Career" },
  { name: "Mental Wellness Circle", members: 2100, description: "Safe conversations around anxiety, depression, healing, and self-love.", tag: "Mental Health" },
  { name: "Entrepreneurs Hub", members: 670, description: "Women building businesses — share wins, challenges, and resources.", tag: "Business" },
  { name: "Faith & Spirituality", members: 530, description: "Grounded in faith, growing together through prayer and encouragement.", tag: "Spirituality" },
  { name: "Students & Scholars", members: 410, description: "Academic support, scholarships, and peer encouragement for students.", tag: "Education" },
];

const tagColors: Record<string, string> = {
  Family: "bg-pink-100 text-pink-700",
  Career: "bg-purple-100 text-purple-700",
  "Mental Health": "bg-fuchsia-100 text-fuchsia-700",
  Business: "bg-violet-100 text-violet-700",
  Spirituality: "bg-indigo-100 text-indigo-700",
  Education: "bg-rose-100 text-rose-700",
};

const Community = () => {
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
          {groups.map((group) => (
            <div key={group.name} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[group.tag] ?? "bg-muted text-muted-foreground"}`}>
                  {group.tag}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> {group.members.toLocaleString()} members
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{group.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{group.description}</p>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-1" /> Join Group
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-1" /> Preview
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
          <Star className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-heading text-xl font-semibold mb-2">Start Your Own Group</h3>
          <p className="text-muted-foreground text-sm mb-4">Have a topic close to your heart? Create a community around it.</p>
          <Button>Create a Group</Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
