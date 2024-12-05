import { OptimizationItem } from '@/types/optimization';

interface OptimizationListItemProps {
  item: OptimizationItem;
}

export function OptimizationListItem({ item }: OptimizationListItemProps) {
  const handleMondayClick = () => {
    console.log('Sending to Monday.com:', item);
    // Here you would integrate with Monday.com's API
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-google-red bg-google-red/10';
      case 'medium':
        return 'text-google-yellow bg-google-yellow/10';
      default:
        return 'text-google-green bg-google-green/10';
    }
  };

  return (
    <div className="group p-4 bg-white dark:bg-custom-purple-600/50 rounded-lg border border-gray-200 dark:border-custom-purple-300/20 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm animate-fade-in">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-200 font-medium mb-3">{item.text}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Added: {new Date(item.timestamp).toLocaleString()}
            </p>
            <button
              onClick={handleMondayClick}
              className="inline-flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-custom-purple-500/30 transition-colors duration-200 opacity-0 group-hover:opacity-100"
              title="Send to Monday.com"
            >
              <img 
                src="/lovable-uploads/14ea84ca-932d-4481-96ad-5b7be22869b5.png" 
                alt="Monday.com"
                className="w-4 h-4 object-contain"
              />
            </button>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(item.impact)}`}>
          {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
        </span>
      </div>
    </div>
  );
}