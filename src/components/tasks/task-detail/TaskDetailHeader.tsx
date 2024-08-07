import React from 'react';
import DatePicker from 'react-datepicker';

import { cn, dateDiff, formatDate, getDateLabel, Task } from '../../../utils';
import { Checkbox, Button, Badge } from '../../core';
import { Calendar, Flag, Close } from '../../icons';
import { Flex } from '../../layout';

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

  const label = task?.dueAt && isOverdue && getDateLabel(task.dueAt);

  return (
    <Flex
      gap="md"
      className="p-3 tb2:px-6 border-b border-foreground-dimmed/20 w-full"
    >
      <Checkbox
        isSelected={task?.isDone}
        onChange={(isSelected) => setTask({ ...task, isDone: isSelected })}
      />

      <div className="w-[1px] h-4 bg-foreground-dimmed/50" />

      <DatePicker
        {...(task.dueAt ? { value: formatDate(task.dueAt) } : {})}
        customInput={
          <Button
            variant="text"
            className={cn('text-foreground px-0')}
            startContent={<Calendar />}
          >
            {task.dueAt ? formatDate(task.dueAt) : 'Add due date'}
          </Button>
        }
        onChange={(date) =>
          setTask({ ...task, dueAt: date?.toISOString() || null })
        }
      />

      {isOverdue && (
        <Badge className="text-danger" icon={<Flag />}>
          {label}
        </Badge>
      )}

      <Button
        variant="secondary"
        iconOnly
        startContent={<Close className="w-4" />}
        className="ml-auto"
        onClick={() => setSelectedTask(null)}
      />
    </Flex>
  );
};

export default TaskDetailHeader;
