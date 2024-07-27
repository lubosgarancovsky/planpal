import React from 'react';
import { cn } from '../../../utils';
import { Chevron, Minus } from '../../icons';

interface TaskPriorityProps {
  priority: number;
}

const TaskPriorityIcon: React.FC<TaskPriorityProps> = ({ priority }) => (
  <>
    {priority === 1 ? (
      <Minus className="w-4 dark:text-warning text-foreground" />
    ) : (
      <Chevron
        className={cn('w-4', {
          'dark:text-success text-white rotate-180': priority < 1,
          'dark:text-danger text-white': priority > 1
        })}
      />
    )}
  </>
);
const TaskPriority: React.FC<TaskPriorityProps> = ({ priority }) => {
  return (
    <div
      className={cn('p-0.5 rounded', {
        'dark:bg-success/10 bg-success': priority < 1,
        'dark:bg-warning/10 bg-warning': priority === 1,
        'dark:bg-danger/10 bg-danger': priority > 1
      })}
    >
      <TaskPriorityIcon priority={priority} />
    </div>
  );
};

export default TaskPriority;
