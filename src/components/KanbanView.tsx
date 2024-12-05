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
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns(columns.map(col => {
      if (col.id === source.droppableId) {
        return { ...col, items: sourceItems };
      }
      if (col.id === destination.droppableId) {
        return { ...col, items: destItems };
      }
      return col;
    }));
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
                                <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7 16C7 14.3431 8.34315 13 10 13C11.6569 13 13 14.3431 13 16C13 17.6569 11.6569 19 10 19C8.34315 19 7 17.6569 7 16Z" fill="#FF3D57"/>
                                  <path d="M19 16C19 14.3431 20.3431 13 22 13C23.6569 13 25 14.3431 25 16C25 17.6569 23.6569 19 22 19C20.3431 19 19 17.6569 19 16Z" fill="#FF3D57"/>
                                </svg>
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