export interface OptimizationItem {
  text: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: OptimizationItem[];
}