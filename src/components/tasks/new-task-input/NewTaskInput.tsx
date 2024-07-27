import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { baseUrl } from '../../../utils/api';
import axios from 'axios';
import { Button, Input } from '../../core';
import { Add } from '../../icons';

interface NewTaskInputProps {}

const NewTaskInput: React.FC<NewTaskInputProps> = ({}) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationKey: ['addTask'],
    mutationFn: (title: string) =>
      axios.post(`${baseUrl()}/tasks`, {
        title,
        description: '',
        createdAt: new Date().toISOString(),
        priority: 0,
        isDone: false,
        dueAt: null,
        tags: []
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleSubmit = () => {
    const input = inputRef.current;

    if (input) {
      mutation.mutate(input.value);
      input.value = '';
    }
  };

  return (
    <div className="flex gap-3 items-center w-full">
      <Input
        ref={inputRef}
        variant="filled"
        placeholder="Add new task and press enter..."
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <Button startContent={<Add />} onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
};

export default NewTaskInput;

/*
<input
      ref={inputRef}
      className="p-3 bg-background-100 rounded-md w-full text-foreground-highlight"
      placeholder="Add new task and press enter"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      }}
    />
*/
