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
      <DialogContent className="max-w-6xl p-0 overflow-auto max-h-[95vh]">
        <div className="p-6 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Get the analytics power you need with our flexible pricing options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 space-y-4 transition-all duration-200 hover:shadow-lg ${
                  tier.isPopular
                    ? "border-custom-purple-300 shadow-md"
                    : "border-gray-200"
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-custom-purple-300 text-white text-sm px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-gray-500 ml-1">{tier.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{tier.description}</p>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-custom-purple-300 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.isPopular
                      ? "bg-custom-purple-300 hover:bg-custom-purple-400"
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

          <div className="text-center text-sm text-gray-500 pt-4">
            All plans include access to our core features. Need a custom solution?{" "}
            <button
              onClick={() => {
                // Handle contact sales click
              }}
              className="text-custom-purple-300 hover:underline"
            >
              Contact our sales team
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}