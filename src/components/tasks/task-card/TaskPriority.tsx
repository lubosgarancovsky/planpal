import React from 'react';
import { cn } from '../../../utils';
import { Chevron, Minus } from '../../icons';

interface TaskPriorityProps {
  priority: number;
}

const TaskPriorityIcon: React.FC<TaskPriorityProps> = ({ priority }) => (
  <>
    {priority === 1 ? (
      <Minus className="w-4 text-warning" />
    ) : (
      <Chevron
        className={cn('w-4', {
          'text-success rotate-180': priority < 1,
          'text-danger': priority > 1
        })}
      />
    )}
  </>
);
const TaskPriority: React.FC<TaskPriorityProps> = ({ priority }) => {
  return (
    <div
      className={cn('p-0.5 rounded', {
        'bg-success/20 ': priority < 1,
        'bg-warning/20 ': priority === 1,
        'bg-danger/20': priority > 1
      })}
    >
      <TaskPriorityIcon priority={priority} />
    </div>
  );
};

export default TaskPriority;
