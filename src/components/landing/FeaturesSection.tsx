import { BarChart, Globe, Shield, Sparkles, Brain, Zap, Users, LineChart } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-custom-purple-500" />,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze your data to uncover hidden patterns and opportunities"
    },
    {
      icon: <Globe className="w-6 h-6 text-custom-purple-500" />,
      title: "Global Analytics",
      description: "Track performance across regions and markets worldwide with real-time data visualization"
    },
    {
      icon: <Zap className="w-6 h-6 text-custom-purple-500" />,
      title: "Real-time Processing",
      description: "Process and analyze millions of data points in real-time for instant insights"
    },
    {
      icon: <Shield className="w-6 h-6 text-custom-purple-500" />,
      title: "Enterprise Security",
      description: "Bank-grade security protocols protect your sensitive data with advanced encryption"
    },
    {
      icon: <Users className="w-6 h-6 text-custom-purple-500" />,
      title: "Team Collaboration",
      description: "Seamlessly collaborate with your team members and share insights across departments"
    },
    {
      icon: <LineChart className="w-6 h-6 text-custom-purple-500" />,
      title: "Predictive Analytics",
      description: "Forecast trends and make data-driven decisions with our predictive modeling"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-custom-purple-500" />
            <span className="text-custom-purple-500 font-semibold">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides comprehensive tools and insights to help you make better marketing decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-gray-200 hover:border-custom-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}