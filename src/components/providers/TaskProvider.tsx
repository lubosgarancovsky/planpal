import React, { useState } from 'react';
import { TaskDetailContext } from '../../context/task-detail-context';
import { Task } from '../../utils';

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  return (
    <TaskDetailContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </TaskDetailContext.Provider>
  );
};

export default TaskProvider;
