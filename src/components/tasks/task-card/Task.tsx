import React from 'react';
import { Badge, Checkbox, Chip } from '../../core';
import {
  cn,
  getDateLabel,
  tagColor,
  tagLabel,
  Task as TaskType
} from '../../../utils';
import { motion } from 'framer-motion';
import { Calendar, Flag } from '../../icons';
import { useTask } from './use-task';
import { Flex } from '../../layout';
import { TaskPriority } from '.';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { mutation, isHighlighted, selectTask } = useTask(task);

  const lineThrough = task.isDone ? 'line-through' : '';
  const textDanger = isHighlighted ? 'text-danger' : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: task.isDone ? 0.6 : 1 }}
      className={cn('flex items-start gap-1.5', { 'opacity-60': task.isDone })}
    >
      <div className="mt-2">
        <Checkbox
          className={cn({ 'border-danger': isHighlighted })}
          isSelected={task.isDone}
          onChange={(isSelected) =>
            mutation.mutate({ ...task, isDone: isSelected })
          }
        />
      </div>

      <button
        className="flex flex-col tb2:flex-row tb2:justify-between gap-3 tb2:gap-6 tb2:items-center text-start active:bg-background-100 tb2:hover:bg-background-100 py-1.5 px-3 duration-150 rounded w-full"
        onClick={() => selectTask(task)}
      >
        <Flex flex="col" className="max-w-4xl dm1:max-w-5xl">
          <Flex>
            <span className={cn('line-clamp-2', lineThrough)}>
              {task.title}
            </span>
            <TaskPriority priority={task.priority} />
          </Flex>
          <span
            className={cn(
              'text-sm text-foreground-dimmed line-clamp-2',
              lineThrough
            )}
          >
            {task.description}
          </span>

          {!!task.tags.length && (
            <Flex className="mt-1.5" wrap>
              {task.tags.slice(0, 5).map((tag, index) => (
                <Chip key={index} color={tagColor(tag)}>
                  {tagLabel(tag)}
                </Chip>
              ))}
              {task.tags.length - 5 > 0 && (
                <Chip>{`+ ${task.tags.length - 5}`}</Chip>
              )}
            </Flex>
          )}
        </Flex>

        {!!task.dueAt && (
          <Badge
            icon={isHighlighted ? <Flag /> : <Calendar />}
            className={cn(textDanger, lineThrough)}
          >{`${getDateLabel(task.dueAt)} ${isHighlighted ? 'overdue' : ''}`}</Badge>
        )}
      </button>
    </motion.div>
  );
};

export default Task;
