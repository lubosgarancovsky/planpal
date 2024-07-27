export interface Task {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  priority: number;
  dueAt: string | null;
  tags: string[];
  isDone: boolean;
}
