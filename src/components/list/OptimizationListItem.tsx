import { OptimizationItem } from '@/types/optimization';

interface OptimizationListItemProps {
  item: OptimizationItem;
}

export function OptimizationListItem({ item }: OptimizationListItemProps) {
  const handleMondayClick = () => {
    console.log('Sending to Monday.com:', item);
    // Here you would integrate with Monday.com's API
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-700">{item.text}</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-gray-500">
              Added: {new Date(item.timestamp).toLocaleString()}
            </p>
            <button
              onClick={handleMondayClick}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-100"
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
        <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
          item.impact === 'high' ? 'text-google-red' :
          item.impact === 'medium' ? 'text-google-yellow' :
          'text-google-green'
        }`}>
          {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
        </span>
      </div>
    </div>
  );
}