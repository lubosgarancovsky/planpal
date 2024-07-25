import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import TaskProvider from './TaskProvider';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>{children}</TaskProvider>
    </QueryClientProvider>
  );
};

export default Provider;
