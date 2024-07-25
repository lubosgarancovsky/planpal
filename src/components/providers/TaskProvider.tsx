import React, { useState } from 'react';
import { TaskDetailContext } from '../../context/task-detail-context';

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState();
  return (
    <TaskDetailContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </TaskDetailContext.Provider>
  );
};

export default TaskProvider;
