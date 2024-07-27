import React from 'react';
import { TaskDetail } from '../tasks';
import { cn } from '../../utils';
import { useTaskDetailContex } from '../../context/task-detail-context';
import { ThemeSwitch } from '../theme';
import { Button, Navbar, NavbarDesktop, NavbarMobile } from '../core';
import { Download, Upload } from '../icons';
import { useFileHandler } from '../../hooks';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { selectedTask } = useTaskDetailContex();
  const { ref, onFileSelect, downloadData, uploadData } = useFileHandler();

  return (
    <div className="flex">
      <div
        className={cn('w-full dm1:w-9/12 duration-300', {
          'dm1:w-full': !selectedTask
        })}
      >
        <header>
          <Navbar>
            {/* Desktop version of a header */}
            <NavbarDesktop>
              <div className="flex gap-3 items-center">
                <Button
                  onClick={uploadData}
                  startContent={<Upload />}
                  variant="ghost"
                >
                  Upload
                </Button>
                <Button
                  onClick={downloadData}
                  startContent={<Download />}
                  variant="ghost"
                >
                  Download
                </Button>
                <ThemeSwitch />
              </div>
            </NavbarDesktop>

            {/* Mobile version of a header */}
            <NavbarMobile>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                  <h4>Upload your tasks from a file</h4>
                  <p className="text-foreground-dimmed">
                    You can back up your tasks in a JSON file and upload it
                    later
                  </p>
                </div>
                <Button
                  onClick={uploadData}
                  startContent={<Upload />}
                  variant="ghost"
                  // iconOnly
                  // className="w-full bg-background-100 p-4 hover:bg-background-100"
                >
                  Upload
                </Button>
                <Button
                  onClick={downloadData}
                  startContent={<Download />}
                  variant="ghost"
                  // iconOnly
                  // className="w-full bg-background-100 p-4 hover:bg-background-100"
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

      {/* Hidden input for file upload */}
      <input
        type="file"
        accept=".json"
        ref={ref}
        style={{ display: 'none' }}
        onChange={onFileSelect}
      />
    </div>
  );
};

export default Layout;
