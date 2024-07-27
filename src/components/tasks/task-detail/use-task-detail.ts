import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl, Task } from '../../../utils/api';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTaskDetailContex } from '../../../context/task-detail-context';

export const useTaskDetail = () => {
  const queryClient = useQueryClient();
  const { selectedTask, setSelectedTask } = useTaskDetailContex();
  const [updatedTask, setUpdatedTask] = useState<Task | null>(selectedTask);

  useEffect(() => {
    setUpdatedTask(selectedTask || null);
  }, [selectedTask]);

  const mutation = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: (newTask: Task) =>
      axios.put(`${baseUrl()}/tasks/${newTask.id}`, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setSelectedTask(updatedTask);
    }
  });

  const remove = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (id: number) => axios.delete(`${baseUrl()}/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setSelectedTask(null);
    }
  });

  const hasDifferences = useMemo(() => {
    if (selectedTask && updatedTask) {
      const keys = Object.keys(selectedTask);

      for (const key of keys) {
        if (updatedTask[key] !== selectedTask[key]) {
          return true;
        }
      }
    }

    return false;
  }, [updatedTask, selectedTask]);

  const reset = () => {
    setUpdatedTask(selectedTask);
  };

  const save = () => {
    if (updatedTask) {
      mutation.mutate(updatedTask);
    }
  };

  return {
    remove,
    hasDifferences,
    task: updatedTask,
    setTask: setUpdatedTask,
    reset,
    save
  };
};
