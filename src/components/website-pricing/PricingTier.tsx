import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingTierProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}

export const PricingTier = ({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  isPopular,
}: PricingTierProps) => {
  return (
    <div
      className={`relative rounded-2xl border p-8 space-y-6 transition-all duration-300 hover:shadow-xl ${
        isPopular
          ? "border-custom-purple-300 shadow-lg scale-105 bg-gradient-to-b from-white to-custom-purple-50"
          : "border-gray-200 hover:border-custom-purple-200"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-custom-purple-300 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
            Most Popular
          </span>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-3xl font-bold">{name}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-5xl font-bold tracking-tight">
            {price}
          </span>
          {period && (
            <span className="text-gray-500 text-xl">{period}</span>
          )}
        </div>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <ul className="space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="w-6 h-6 text-custom-purple-300 flex-shrink-0" />
            <span className="text-base text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/login">
        <Button
          className={`w-full h-12 text-base font-semibold ${
            isPopular
              ? "bg-custom-purple-300 hover:bg-custom-purple-400 shadow-md"
              : ""
          }`}
          variant={isPopular ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};