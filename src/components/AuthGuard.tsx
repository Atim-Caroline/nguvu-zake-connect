import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

// Simple session check — replace with real auth state when backend is connected
const isLoggedIn = () => {
  return localStorage.getItem("nz_user") !== null;
};

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setAllowed(true);
    } else {
      // store intended destination so we can redirect back after login
      sessionStorage.setItem("nz_redirect", location.pathname);
      navigate("/signin", { replace: true });
    }
    setChecking(false);
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
