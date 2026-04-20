import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, LogOut, User, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLang, Lang } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navKeys = [
  { key: "home", href: "/" },
  { key: "safeSpace", href: "/safe-space" },
  { key: "mentorship", href: "/#mentorship" },
  { key: "events", href: "/events" },
  { key: "opportunities", href: "/#opportunities" },
  { key: "community", href: "/community" },
];

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "ENG" },
  { code: "lg", label: "Luganda", flag: "LUG" },
  { code: "sw", label: "Kiswahili", flag: "SWA" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang, setLang, t } = useLang();
  const currentLang = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Nguvu Zake"
            className="h-10 w-auto"
            style={{ mixBlendMode: isHome ? "normal" : "multiply" }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navKeys.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="px-3 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language button */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border-2 transition-all hover:bg-muted"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
            >
              <Globe className="h-4 w-4" />
              <span>{currentLang.flag}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden z-50">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left"
                    style={{
                      fontWeight: l.code === lang ? 700 : 400,
                      color: l.code === lang ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    }}
                  >
                    <span className="text-base">{l.flag}</span>
                    {l.label}
                    {l.code === lang && (
                      <svg className="ml-auto h-4 w-4" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="hsl(330 80% 55%)"/>
                        <path d="M5 8.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/inbox")}
                className="p-2 rounded-full border-2 border-border hover:bg-muted transition-all relative"
                title="Messages"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-border text-sm font-medium hover:bg-muted transition-all"
              >
                <User className="h-4 w-4 text-primary" />
                <span className="max-w-[120px] truncate">{user.user_metadata?.name || user.email}</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))",
                  boxShadow: "0 4px 16px hsl(330 80% 55% / 0.35)",
                }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:bg-muted"
                style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
              >
                {t("signIn")}
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))",
                  boxShadow: "0 4px 16px hsl(330 80% 55% / 0.35)",
                }}
              >
                {t("joinFree")}
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 pb-5 bg-card/95">
          <nav className="flex flex-col gap-1 pt-3">
            {navKeys.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}

            {/* Language picker in mobile */}
            <div className="pt-2 pb-1">
              <p className="text-xs text-muted-foreground px-3 mb-1 font-medium uppercase tracking-wide">Language</p>
              <div className="flex gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false); }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                    style={{
                      borderColor: l.code === lang ? "hsl(var(--primary))" : "hsl(var(--border))",
                      background: l.code === lang ? "hsl(var(--primary) / 0.1)" : "transparent",
                      color: l.code === lang ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {user ? (
                <>
                  <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium border-2 border-border">
                    <User className="h-4 w-4 text-primary" />
                    <span className="truncate max-w-[120px]">{user.user_metadata?.name || user.email}</span>
                  </div>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold text-white transition-all shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))",
                      boxShadow: "0 4px 16px hsl(330 80% 55% / 0.35)",
                    }}
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex-1 py-2.5 rounded-full text-sm font-semibold border-2 transition-all"
                    style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
                    onClick={() => { navigate("/signin"); setMobileOpen(false); }}
                  >
                    {t("signIn")}
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-all shadow-lg"
                    style={{ background: "linear-gradient(135deg, hsl(330 80% 55%), hsl(270 55% 45%))" }}
                    onClick={() => { navigate("/signup"); setMobileOpen(false); }}
                  >
                    {t("joinFree")}
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
