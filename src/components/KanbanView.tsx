import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

interface OptimizationItem {
  text: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
}

interface KanbanViewProps {
  items: OptimizationItem[];
}

interface KanbanColumn {
  id: string;
  title: string;
  items: OptimizationItem[];
}

export function KanbanView({ items }: KanbanViewProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(() => {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return [
      {
        id: 'todo',
        title: 'To Do',
        items: items,
      },
      {
        id: 'inProgress',
        title: 'In Progress',
        items: [],
      },
      {
        id: 'done',
        title: 'Done',
        items: [],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newColumns = [...columns];
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    const destColumn = newColumns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    const updatedColumns = newColumns.map(col => {
      if (col.id === source.droppableId) {
        return { ...col, items: sourceItems };
      }
      if (col.id === destination.droppableId) {
        return { ...col, items: destItems };
      }
      return col;
    });

    setColumns(updatedColumns);
    localStorage.setItem('kanbanColumns', JSON.stringify(updatedColumns));
  };

  const handleMondayClick = (item: OptimizationItem) => {
    console.log('Sending to Monday.com:', item);
    // Here you would integrate with Monday.com's API
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-lg mb-4">{column.title}</h3>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.timestamp} draggableId={item.timestamp} index={index}>
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
                                onClick={() => handleMondayClick(item)}
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
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}