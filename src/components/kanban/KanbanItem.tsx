import { Draggable } from '@hello-pangea/dnd';
import { OptimizationItem } from '@/types/optimization';

interface KanbanItemProps {
  item: OptimizationItem;
  index: number;
}

export function KanbanItem({ item, index }: KanbanItemProps) {
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
    <Draggable draggableId={item.timestamp} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group bg-white dark:bg-custom-purple-600/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-custom-purple-300/20 backdrop-blur-sm animate-fade-in"
        >
          <p className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-3">{item.text}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactColor(item.impact)}`}>
                {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
              </span>
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
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}