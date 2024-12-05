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

  return (
    <Draggable draggableId={item.timestamp} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <p className="text-sm text-gray-700">{item.text}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${
                item.impact === 'high' ? 'text-google-red' :
                item.impact === 'medium' ? 'text-google-yellow' :
                'text-google-green'
              }`}>
                {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
              </span>
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
            <span className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}