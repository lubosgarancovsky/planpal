import { createContext, useContext } from 'react';
import { Task } from '../utils';

interface TaskDetailContextType {
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export const TaskDetailContext = createContext<TaskDetailContextType | null>(
  null
);

export const useTaskDetailContex = () => {
  const ctx = useContext(TaskDetailContext);

  if (!ctx) {
    throw new Error(
      'useTaskDetailContext must be used within a TaskDetailProvider'
    );
  }

  return ctx;
};
