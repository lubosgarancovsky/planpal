export interface Task {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  priority: number;
  dueAt: string;
  tags: string[];
  isDone: boolean;
}
