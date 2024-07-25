import { createContext, useContext } from 'react';

export const TaskDetailContext = createContext<any>(null);

export const useTaskDetail = () => {
  const ctx = useContext(TaskDetailContext);

  if (!ctx) {
    throw new Error(
      'useTaskDetailContext must be used within a TaskDetailProvider'
    );
  }

  return ctx;
};
