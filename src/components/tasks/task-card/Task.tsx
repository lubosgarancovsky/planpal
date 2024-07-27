import React from 'react';
import { Task as TaskType } from '../../../utils/api/types';
import { Checkbox } from '../../core/checkbox';
import { Chip } from '../../core';
import { cn, getDateLabel } from '../../../utils';
import { motion } from 'framer-motion';
import { Calendar, Flag } from '../../icons';
import { useTask } from './use-task';
import { useTag } from '../../../hooks';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { mutation, isHighlighted, selectTask } = useTask(task);
  const { label, color } = useTag();

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
        className="flex flex-col tb2:flex-row tb2:justify-between gap-3 tb2:gap-6 tb2:items-center text-start hover:bg-background-100 py-1.5 px-3 duration-150 rounded w-full"
        onClick={() => selectTask(task)}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col max-w-xl gap-1.5">
            <div className="flex gap-3 items-center">
              <span
                className={cn('truncate', {
                  'line-through': task.isDone
                })}
              >
                {task.title}
              </span>
              <span
                className={cn('w-2 h-2 rounded-full', {
                  'bg-success': task.priority === 0,
                  'bg-warning': task.priority === 1,
                  'bg-danger': task.priority === 2
                })}
              ></span>
            </div>
            {task.description && (
              <span
                className={cn('tb2:truncate text-sm text-foreground-dimmed', {
                  'line-through': task.isDone
                })}
              >
                {task.description}
              </span>
            )}
          </div>
          {!!task.tags.length && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {task.tags.slice(0, 5).map((tag, index) => (
                <Chip key={index} color={color(tag)}>
                  {label(tag)}
                </Chip>
              ))}
              {task.tags.length - 5 > 0 && (
                <Chip>{`+ ${task.tags.length - 5}`}</Chip>
              )}
            </div>
          )}
        </div>
        {task.dueAt && (
          <div
            className={cn(
              'flex items-center text-sm gap-2 text-foreground-highlight',
              {
                'text-danger': isHighlighted
              }
            )}
          >
            {isHighlighted ? (
              <Flag className="w-4" />
            ) : (
              <Calendar className="w-4" />
            )}
            {`${getDateLabel(task.dueAt)} ${isHighlighted ? 'overdue' : ''}`}
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default Task;
