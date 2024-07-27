import React from 'react';
import DatePicker from 'react-datepicker';

import { cn, dateDiff, formatDate, Task } from '../../../utils';
import { Checkbox, Button } from '../../core';
import { Calendar, Flag, Close } from '../../icons';

interface TaskDetailHeaderProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({
  task,
  setTask,
  setSelectedTask
}) => {
  const isOverdue =
    task?.dueAt && dateDiff(new Date().toISOString(), task.dueAt) < 0;

  return (
    <div className="px-3 tb2:px-6 py-3 border-b border-foreground-dimmed/20 flex gap-3 w-full items-center">
      <Checkbox
        isSelected={task?.isDone}
        onChange={(isSelected) => setTask({ ...task, isDone: isSelected })}
        className={cn({ 'border-danger': isOverdue })}
      />
      <div className="w-[1px] h-4 bg-foreground-dimmed/50"></div>
      <div>
        {
          <DatePicker
            {...(task.dueAt ? { value: formatDate(task.dueAt) } : {})}
            minDate={new Date()}
            customInput={
              <Button
                variant="text"
                className={cn('text-foreground px-0', {
                  'text-danger': isOverdue
                })}
                startContent={<Calendar />}
              >
                {task.dueAt ? formatDate(task.dueAt) : 'No due date'}
              </Button>
            }
            onChange={(date) =>
              setTask({ ...task, dueAt: date?.toISOString() || null })
            }
          />
        }
      </div>

      <div>{isOverdue && <Flag className="w-5 text-danger" />}</div>

      <Button
        variant="secondary"
        iconOnly
        startContent={<Close className="w-4" />}
        className="ml-auto"
        onClick={() => setSelectedTask(null)}
      />
    </div>
  );
};

export default TaskDetailHeader;
