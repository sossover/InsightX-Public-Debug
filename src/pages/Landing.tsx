import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ArrowRight, CheckCircle2, Globe, LayoutDashboard, LineChart, Shield, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const features = [
    {
      icon: <Globe className="w-6 h-6 text-custom-purple-500" />,
      title: "Global Analytics",
      description: "Track performance across regions and markets worldwide"
    },
    {
      icon: <LineChart className="w-6 h-6 text-custom-purple-500" />,
      title: "Advanced Reporting",
      description: "Generate detailed insights with our powerful reporting tools"
    },
    {
      icon: <Shield className="w-6 h-6 text-custom-purple-500" />,
      title: "Enterprise Security",
      description: "Bank-grade security to protect your sensitive data"
    },
    {
      icon: <LayoutDashboard className="w-6 h-6 text-custom-purple-500" />,
      title: "Custom Dashboards",
      description: "Build and customize dashboards for your specific needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-custom-purple-500 to-google-blue bg-clip-text text-transparent mb-6">
              Transform Your Marketing Analytics
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get powerful insights into your marketing performance with our advanced analytics platform. Make data-driven decisions and optimize your campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-custom-purple-500 hover:bg-custom-purple-600 w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools and insights to help you make better marketing decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-custom-purple-500 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-custom-purple-500 mb-2">500+</div>
              <div className="text-gray-600">Enterprise Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-custom-purple-500 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-custom-purple-500 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by leading companies
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Sparkles key={star} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "InsightX has transformed how we approach our marketing analytics. The insights we've gained have been invaluable."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="font-semibold text-gray-900">John Doe</div>
                    <div className="text-gray-600">Marketing Director</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-custom-purple-500">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
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
    </div>
  );
}