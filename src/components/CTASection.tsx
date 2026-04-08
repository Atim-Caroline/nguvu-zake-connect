import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: 'hsl(36, 80%, 50%)' }} />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10" style={{ background: 'hsl(36, 80%, 50%)' }} />

      <div className="container mx-auto px-4 relative text-center">
        <Heart className="h-10 w-10 mx-auto mb-6" style={{ color: 'hsl(36, 80%, 50%)' }} />
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(38, 50%, 97%)' }}>
          Your Journey Starts Here
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: 'hsl(38, 40%, 80%)' }}>
          Join thousands of women who have found strength, mentorship, and opportunity in the Nguvu Zake community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-base">
            Join Nguvu Zake Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="hero-outline" size="lg" className="text-base">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
