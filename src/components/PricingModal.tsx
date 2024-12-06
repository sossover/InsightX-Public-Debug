import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    buttonText: "Current Plan",
    isPopular: false,
    disabled: true,
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
    buttonText: "Upgrade to Pro",
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
    buttonText: "Upgrade to Business",
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

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl p-0 overflow-auto max-h-[95vh]">
        <div className="p-8 space-y-10">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-2xl text-gray-500 max-w-3xl mx-auto">
              Get the analytics power you need with our flexible pricing options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 space-y-6 transition-all duration-300 hover:shadow-xl ${
                  tier.isPopular
                    ? "border-custom-purple-300 shadow-lg scale-105 bg-gradient-to-b from-white to-custom-purple-50"
                    : "border-gray-200 hover:border-custom-purple-200"
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-custom-purple-300 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">{tier.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-5xl font-bold tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-gray-500 text-xl">{tier.period}</span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600">{tier.description}</p>
                </div>

                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-6 h-6 text-custom-purple-300 flex-shrink-0" />
                      <span className="text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 text-base font-semibold ${
                    tier.isPopular
                      ? "bg-custom-purple-300 hover:bg-custom-purple-400 shadow-md"
                      : ""
                  }`}
                  variant={tier.isPopular ? "default" : "outline"}
                  disabled={tier.disabled}
                >
                  {tier.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4 pt-6">
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
      </DialogContent>
    </Dialog>
  );
}