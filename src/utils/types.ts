export interface WithChildren {
  children?: React.ReactNode;
}

export interface Task {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  priority: number;
  dueAt: string | null;
  tags: string[];
  isDone: boolean;
}
