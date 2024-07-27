import React, { useRef, useState } from 'react';
import { TaskDetail } from '../tasks';
import { baseUrl, cn, Task } from '../../utils';
import { useTaskDetailContex } from '../../context/task-detail-context';
import { ThemeSwitch } from '../theme';
import { Button, Navbar, NavbarDesktop, NavbarMobile } from '../core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Download, Upload } from '../icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { selectedTask } = useTaskDetailContex();
  const queryClient = useQueryClient();

  const fileInputRef = useRef(null);

  const handleDownload = () => {
    const response = queryClient.getQueryData<AxiosResponse<Task[]>>(['tasks']);

    if (response) {
      const tasks = response.data;
      const json = JSON.stringify(tasks);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = 'tasks.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  };

  const insertAllData = (allData: Task[]) => {
    for (const item of allData) {
      const { id, ...task } = item;
      mutation.mutate(task);
    }
  };

  const mutation = useMutation({
    mutationKey: ['loadTasks'],
    mutationFn: (data: Task) => axios.post(`${baseUrl()}/tasks`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          insertAllData(json);
        } catch (err) {
          console.error('Invalid JSON file:', err);
          alert('Failed to parse JSON file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleLoad = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex">
      <div
        className={cn('w-full dm1:w-9/12 duration-300', {
          'dm1:w-full': !selectedTask
        })}
      >
        <header>
          <Navbar>
            <NavbarDesktop>
              <div className="flex gap-3 items-center">
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <Button
                  onClick={handleLoad}
                  startContent={<Upload />}
                  variant="ghost"
                  children="Upload"
                />
                <Button
                  onClick={handleDownload}
                  startContent={<Download />}
                  variant="ghost"
                  children="Download"
                />
                <ThemeSwitch />
              </div>
            </NavbarDesktop>

            <NavbarMobile>
              <div className="flex flex-col gap-4 p-4">
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <div className="flex flex-col gap-2">
                  <h4>Upload your tasks from a file</h4>
                  <p className="text-foreground-dimmed">
                    You can back up your tasks in a JSON file and upload it
                    later
                  </p>
                </div>
                <Button
                  onClick={handleLoad}
                  startContent={<Upload />}
                  iconOnly
                  variant="ghost"
                  className="w-full bg-background-100 p-4 hover:bg-background-100"
                >
                  Upload
                </Button>
                <Button
                  onClick={handleDownload}
                  startContent={<Download />}
                  variant="ghost"
                  iconOnly
                  className="w-full bg-background-100 p-4 hover:bg-background-100"
                >
                  Download
                </Button>
              </div>
            </NavbarMobile>
          </Navbar>
        </header>

        <main className="p-3 tb2:p-6 flex flex-col gap-6">{children}</main>
      </div>

      <TaskDetail />
    </div>
  );
};

export default Layout;
