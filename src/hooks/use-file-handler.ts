import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl, download, Task } from '../utils';
import { useRef } from 'react';
import axios, { AxiosResponse } from 'axios';

const useFileHandler = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationKey: ['loadTasks'],
    mutationFn: (data: Task) => axios.post(`${baseUrl()}/tasks`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const downloadData = () => {
    const response = queryClient.getQueryData<AxiosResponse<Task[]>>(['tasks']);
    const data = response?.data || [];
    download(data);
  };

  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      try {
        const json = JSON.parse(e.target?.result as string) as Task[];

        // Sends post request for every task in a list retrieved from a file asynchronously to prevent inserting data with the same ID
        for (const item of json) {
          await mutation.mutateAsync(item);
        }
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
