import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data.user) {
      await supabase.from("profiles").insert({ id: data.user.id, name, email });
    }
    setDone(true);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: { prompt: "select_account" },
      },
    });
  };

  const handleApple = async () => {
    await supabase.auth.signInWithOAuth({ provider: "apple", options: { redirectTo: `${window.location.origin}/` } });
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-lg text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "hsl(330 80% 55% / 0.1)" }}>
            <span className="text-3xl">💜</span>
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">{t("checkEmail")}</h1>
          <p className="text-muted-foreground text-sm mb-1">{t("sentConfirmation")}</p>
          <p className="font-semibold text-foreground mb-4">{email}</p>
          <p className="text-muted-foreground text-sm mb-6">{t("clickToActivate")}</p>
          <button onClick={() => navigate("/signin")}
            className="w-full py-3 rounded-full font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}>
            {t("goToSignIn")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="p-8 rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Nguvu Zake" className="h-12 w-auto" style={{ mixBlendMode: "multiply" }} />
          </div>

          <h1 className="font-heading text-2xl font-bold mb-1">{t("joinTheCommunity")}</h1>
          <p className="text-muted-foreground text-sm mb-6">{t("createFreeAccount")}</p>

          <div className="space-y-3 mb-6">
            <button type="button" onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-border text-sm font-semibold hover:bg-muted transition-all">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t("continueWithGoogle")}
            </button>
            <button type="button" onClick={handleApple}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-border text-sm font-semibold hover:bg-muted transition-all">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t("continueWithApple")}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-card px-3">{t("orSignUpWithEmail")}</span>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 mb-4 p-3 bg-red-50 rounded-xl">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
