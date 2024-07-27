import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskProvider, ThemeProvider } from '.';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TaskProvider>{children}</TaskProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Provider;
