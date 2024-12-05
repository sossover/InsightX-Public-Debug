import { DragDropContext } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import { KanbanColumn } from './kanban/KanbanColumn';
import { OptimizationItem, KanbanColumn as KanbanColumnType } from '@/types/optimization';

interface KanbanViewProps {
  items: OptimizationItem[];
}

export function KanbanView({ items }: KanbanViewProps) {
  const [columns, setColumns] = useState<KanbanColumnType[]>(() => {
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            items={column.items}
          />
        ))}
      </div>
    </DragDropContext>
  );
}