import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Task as TaskType } from '../../../utils/api/types';
import { Checkbox } from '../../core/checkbox';
import { Chip } from '../../core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '../../../utils';
import { motion } from 'framer-motion';
import { useTaskDetail } from '../../../context/task-detail-context';
import { baseUrl } from '../../../utils/api';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const queryClient = useQueryClient();
  const { setSelectedTask } = useTaskDetail();

  const mutation = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: (newTask: TaskType) =>
      axios.put(`${baseUrl()}/tasks/${task.id}`, newTask),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData<TaskType[]>(['tasks']);

      queryClient.setQueryData(['tasks'], (old: AxiosResponse<TaskType[]>) => {
        const data = [...old.data];
        const index = data.findIndex(
          (task: TaskType) => task.id === newTask.id
        );
        data[index] = newTask;

        return {
          ...old,
          data
        };
      });

      return { previous };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previous || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-start gap-1.5"
    >
      <div>
        <Checkbox
          checked={task.isDone}
          onChange={(isDone: boolean) => mutation.mutate({ ...task, isDone })}
        />
      </div>
      <button
        className="flex text-start items-center gap-4 hover:bg-background-100 py-1.5 px-3 duration-150 rounded w-full"
        onClick={() => setSelectedTask(task)}
      >
        <div className="flex flex-col max-w-sm">
          <span className={cn({ 'line-through': task.isDone })}>
            {task.title}
          </span>
          {task.description && (
            <span
              className={cn('truncate text-sm text-foreground-dimmed', {
                'line-through': task.isDone
              })}
            >
              {task.description}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 items-center ml-auto">
          {task.tags.slice(0, 2).map((tag, index) => (
            <Chip key={index}>{tag}</Chip>
          ))}
          {task.tags.length - 2 > 0 && (
            <Chip>{`+ ${task.tags.length - 2}`}</Chip>
          )}
        </div>
      </button>
    </motion.div>
  );
};

export default Task;
