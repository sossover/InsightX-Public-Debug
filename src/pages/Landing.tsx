import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-custom-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-custom-purple-500 to-google-blue bg-clip-text text-transparent">
                InsightX
              </span>
            </div>
            
            <NavigationMenu>
              <NavigationMenuList className="hidden md:flex gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-gray-600 hover:text-custom-purple-500 transition-colors" href="#features">
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-gray-600 hover:text-custom-purple-500 transition-colors" href="#pricing">
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/login" className="text-gray-600 hover:text-custom-purple-500 transition-colors">
                    Sign In
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-custom-purple-500 hover:bg-custom-purple-600">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-custom-purple-500">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your marketing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that trust InsightX for their marketing analytics needs.
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="bg-white text-custom-purple-500 hover:bg-gray-100">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}