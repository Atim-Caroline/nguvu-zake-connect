import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, CheckCircle, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FIELDS = ["Technology", "Medicine", "Business", "Education", "Law", "Finance", "Engineering", "Arts", "Science", "Leadership", "Entrepreneurship", "Research", "Other"];
const GENDERS = ["Female", "Male", "Prefer not to say"];

type Profile = {
  id: string; name: string; email: string; nickname?: string;
  bio?: string; field?: string; age?: number; gender?: string;
  profession?: string; avatar_url?: string;
  verified?: boolean; verification_requested?: boolean;
};

export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ name: "", nickname: "", bio: "", field: "", age: "", gender: "", profession: "" });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/signin"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
      const p = data as Profile | null;
      const fallback: Profile = {
        id: session.user.id,
        name: session.user.user_metadata?.name || "",
        email: session.user.email || "",
      };
      setProfile(p ?? fallback);
      setAvatarUrl(p?.avatar_url ?? null);
      setForm({
        name: p?.name ?? fallback.name,
        nickname: p?.nickname ?? "",
        bio: p?.bio ?? "",
        field: p?.field ?? "",
        age: p?.age?.toString() ?? "",
        gender: p?.gender ?? "",
        profession: p?.profession ?? "",
      });
    };
    load();
  }, [navigate]);

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setUploading(true);
    const path = `avatars/${profile.id}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("chat-files").upload(path, file, { upsert: true });
    if (data) {
      const { data: urlData } = supabase.storage.from("chat-files").getPublicUrl(data.path);
      setAvatarUrl(urlData.publicUrl);
      await supabase.from("profiles").update({ avatar_url: urlData.publicUrl }).eq("id", profile.id);
    }
    if (error) setError("Failed to upload photo");
    setUploading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError("");
    const { error } = await supabase.from("profiles").upsert({
      id: profile.id,
      email: profile.email,
      name: form.name,
      nickname: form.nickname || null,
      bio: form.bio || null,
      field: form.field || null,
      age: form.age ? parseInt(form.age) : null,
      gender: form.gender || null,
      profession: form.profession || null,
    });
    setSaving(false);
    if (error) { setError(error.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleVerificationRequest = async () => {
    if (!profile) return;
    setRequesting(true);
    await supabase.from("profiles").update({ verification_requested: true }).eq("id", profile.id);
    setProfile(prev => prev ? { ...prev, verification_requested: true } : prev);
    setRequesting(false);
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <span className="font-heading font-semibold">Edit Profile</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 bg-muted flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-primary">{profile.name?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <button onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          <p className="text-sm text-muted-foreground mt-2">Tap to change photo</p>

          {/* Verified badge */}
          {profile.verified && (
            <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              <CheckCircle className="h-3.5 w-3.5" /> Verified Member
            </div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-5 bg-card border border-border rounded-2xl p-6">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
          </div>

          <div className="space-y-1.5">
            <Label>Nickname <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input value={form.nickname} onChange={e => setForm(p => ({ ...p, nickname: e.target.value }))} placeholder="What should we call you?" />
          </div>

          <div className="space-y-1.5">
            <Label>Bio <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Tell the community about yourself..." rows={3} className="resize-none" />
          </div>

          <div className="space-y-1.5">
            <Label>Profession</Label>
            <Input value={form.profession} onChange={e => setForm(p => ({ ...p, profession: e.target.value }))} placeholder="e.g. Doctor, Engineer, Student..." />
          </div>

          <div className="space-y-1.5">
            <Label>Field</Label>
            <select value={form.field} onChange={e => setForm(p => ({ ...p, field: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">Select your field</option>
              {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Age <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input type="number" min={13} max={100} value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} placeholder="Your age" />
            </div>
            <div className="space-y-1.5">
              <Label>Gender <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select gender</option>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 p-3 bg-red-50 rounded-xl">{error}</p>}

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : saved ? "✓ Saved!" : "Save Changes"}
          </Button>
        </div>

        {/* Verification */}
        {!profile.verified && (
          <div className="mt-6 p-5 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "hsl(330 80% 55% / 0.1)" }}>
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Get Verified</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Verified members get a badge on their profile and are trusted by the community.
                </p>
                {profile.verification_requested ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Request submitted — we'll review it shortly.
                  </div>
                ) : (
                  <button onClick={handleVerificationRequest} disabled={requesting}
                    className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
                    {requesting ? "Submitting..." : "Request Verification"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
