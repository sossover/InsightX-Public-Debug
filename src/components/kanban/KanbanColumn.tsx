import { Droppable } from '@hello-pangea/dnd';
import { KanbanItem } from './KanbanItem';
import { OptimizationItem } from '@/types/optimization';

interface KanbanColumnProps {
  id: string;
  title: string;
  items: OptimizationItem[];
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
  return (
    <div className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {items.map((item, index) => (
              <KanbanItem key={item.timestamp} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}