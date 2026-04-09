import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthGuardProps { children: React.ReactNode }

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setAllowed(true);
      } else {
        sessionStorage.setItem("nz_redirect", location.pathname);
        navigate("/signin", { replace: true });
      }
      setChecking(false);
    });
  }, [navigate, location.pathname]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Shield className="h-8 w-8 animate-pulse text-primary" />
          <p className="text-sm">Checking access...</p>
        </div>
      </div>
    );
  }

  return allowed ? <>{children}</> : null;
};

export default AuthGuard;
