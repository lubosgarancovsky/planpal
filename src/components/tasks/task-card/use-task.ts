import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl, dateDiff, Task } from '../../../utils';
import { useTaskDetailContex } from '../../../context/task-detail-context';
import { Task as TaskType } from '../../../utils';
import axios, { AxiosResponse } from 'axios';

export const useTask = (task: Task) => {
  const queryClient = useQueryClient();
  const { setSelectedTask } = useTaskDetailContex();

  const mutation = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: (newTask: TaskType) =>
      axios.put(`${baseUrl()}/tasks/${task.id}`, newTask),
    onMutate: async (newTask) => {
      // Optimisticly updates the state before the response is returned
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
    onError: (err, _, context) => {
      // Revert back if mutation fails
      queryClient.setQueryData(['tasks'], context?.previous || []);
      console.error(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const isHighlighted =
    task.dueAt && dateDiff(new Date().toISOString(), task.dueAt) < 0;

  return { mutation, isHighlighted, selectTask: setSelectedTask };
};
