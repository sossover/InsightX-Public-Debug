import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-purple-50 via-white to-custom-purple-50 opacity-50" />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-custom-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-google-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-custom-purple-50 text-custom-purple-500 text-sm font-medium inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionizing Marketing Analytics
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-custom-purple-500 via-google-blue to-custom-purple-300 bg-clip-text text-transparent mb-8 leading-tight">
            Transform Your Marketing Analytics with AI
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get powerful insights into your marketing performance with our advanced analytics platform. 
            Make data-driven decisions and optimize your campaigns with enterprise-grade AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-custom-purple-500 hover:bg-custom-purple-600 w-full sm:w-auto group">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto group"
              onClick={() => setIsVideoOpen(true)}
            >
              Watch Demo
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-custom-purple-50 text-custom-purple-500 group-hover:bg-custom-purple-100">
                2 min
              </span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Enterprise Customers", value: "500+" },
            { label: "Data Points Analyzed", value: "1B+" },
            { label: "Countries Served", value: "50+" },
            { label: "Customer Satisfaction", value: "99%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-custom-purple-500 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}