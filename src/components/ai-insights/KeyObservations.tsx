import { AlertCircle } from "lucide-react";

interface KeyObservationsProps {
  observations: string[];
}

export function KeyObservations({ observations }: KeyObservationsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="h-4 w-4 text-google-yellow" />
        <h3 className="font-semibold text-sm">Key Observations</h3>
      </div>
      <ul className="text-sm text-gray-600 space-y-2">
        {observations.map((observation, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
            <span>{observation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}