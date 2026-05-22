import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import SafeSpace from "./pages/SafeSpace.tsx";
import Events from "./pages/Events.tsx";
import Community from "./pages/Community.tsx";
import JobSwipe from "./pages/JobSwipe.tsx";
import MentorChat from "./pages/MentorChat.tsx";
import LiveStream from "./pages/LiveStream.tsx";
import AuthGuard from "./components/AuthGuard.tsx";
import Inbox from "./pages/Inbox.tsx";
import Profile from "./pages/Profile.tsx";
import Mentorship from "./pages/Mentorship.tsx";
import Opportunities from "./pages/Opportunities.tsx";
import GroupChat from "./pages/GroupChat.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/safe-space" element={<AuthGuard><SafeSpace /></AuthGuard>} />
            <Route path="/events" element={<Events />} />
            <Route path="/community" element={<AuthGuard><Community /></AuthGuard>} />
            <Route path="/jobs" element={<AuthGuard><JobSwipe /></AuthGuard>} />
            <Route path="/inbox" element={<AuthGuard><Inbox /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/group/:slug" element={<AuthGuard><GroupChat /></AuthGuard>} />
          <Route path="/chat/:id" element={<AuthGuard><MentorChat /></AuthGuard>} />
          <Route path="/live/:id" element={<AuthGuard><LiveStream /></AuthGuard>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
