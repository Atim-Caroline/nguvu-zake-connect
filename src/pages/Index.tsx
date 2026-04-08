import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SafeSpacePreview from "@/components/SafeSpacePreview";
import MentorshipSection from "@/components/MentorshipSection";
import OpportunitiesSection from "@/components/OpportunitiesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SafeSpacePreview />
      <MentorshipSection />
      <OpportunitiesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
