import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl, download, Task } from '../utils';
import axios, { AxiosResponse } from 'axios';
import { useRef } from 'react';

interface NoIdTask extends Omit<Task, 'id'> {}

const useFileHandler = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationKey: ['loadTasks'],
    mutationFn: (data: NoIdTask) => axios.post(`${baseUrl()}/tasks`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const downloadData = () => {
    const response = queryClient.getQueryData<AxiosResponse<Task[]>>(['tasks']);
    const data = response?.data || [];
    download(data);
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const json = JSON.parse(e.target?.result as string) as Task[];

        // Sends post request for every task in a list retrieved from a file
        json.forEach((item) => {
          // ID property needs to be removed to prevent duplications
          const { id, ...task } = item;
          mutation.mutate(task);
        });
      } catch (err) {
        console.error('Invalid JSON file:', err);
        alert('Failed to parse JSON file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const uploadData = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return { ref, mutation, downloadData, onFileSelect, uploadData };
};

export default useFileHandler;
