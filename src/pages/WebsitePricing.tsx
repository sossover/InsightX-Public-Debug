import { PricingHeader } from "@/components/website-pricing/PricingHeader";
import { PricingTier } from "@/components/website-pricing/PricingTier";
import { Footer } from "@/components/Footer";

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out InsightX",
    features: [
      "Basic Analytics Dashboard",
      "Limited Report Generation",
      "Email Support",
      "1 Team Member",
      "Basic Data Export",
      "7-Day Data History",
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "Advanced Analytics",
      "Unlimited Reports",
      "Priority Support",
      "5 Team Members",
      "Custom Dashboards",
      "API Access",
      "30-Day Data History",
      "Custom Report Builder",
      "Advanced Filtering",
    ],
    buttonText: "Start Free Trial",
    isPopular: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "/month",
    description: "Best for scaling teams",
    features: [
      "Enterprise Analytics",
      "White-label Reports",
      "24/7 Phone Support",
      "Unlimited Team Members",
      "Custom Integration",
      "Dedicated Account Manager",
      "Advanced Security",
      "90-Day Data History",
      "Priority Feature Access",
      "Custom Training Sessions",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Custom Analytics Solution",
      "Unlimited Everything",
      "Custom Development",
      "SLA Agreement",
      "Dedicated Support Team",
      "On-premise Deployment",
      "Custom Security Requirements",
      "Unlimited Data History",
      "Custom AI Models",
      "Dedicated Infrastructure",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
  },
];

export default function WebsitePricing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PricingHeader />

      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-2xl text-gray-500 max-w-3xl mx-auto">
              Get the analytics power you need with our flexible pricing options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pricingTiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>

          <div className="text-center space-y-4 pb-16">
            <p className="text-lg text-gray-600">
              All plans include access to our core features.
            </p>
            <p className="text-base text-gray-500">
              Need a custom solution?{" "}
              <button
                onClick={() => {
                  // Handle contact sales click
                }}
                className="text-custom-purple-300 hover:text-custom-purple-400 font-semibold hover:underline transition-colors"
              >
                Contact our sales team
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
