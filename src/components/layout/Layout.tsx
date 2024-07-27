import React from 'react';
import { TaskDetail } from '../tasks';
import { cn } from '../../utils';
import { useTaskDetailContex } from '../../context/task-detail-context';
import { ThemeSwitch } from '../theme';
import { Button, Navbar, NavbarDesktop, NavbarMobile } from '../core';
import { Download, Upload } from '../icons';
import { useFileHandler } from '../../hooks';
import Flex from './Flex';

interface LayoutProps {
  children: React.ReactNode;
}

const NavbarItems: React.FC<any> = ({ importFn, exportFn, isDesktop }) => {
  const classes = cn({
    'bg-background-100 w-full p-3': !isDesktop
  });
  return (
    <Flex gap="md">
      <Button
        onClick={importFn}
        startContent={<Upload />}
        variant="ghost"
        className={classes}
      >
        Import
      </Button>
      <Button
        onClick={exportFn}
        startContent={<Download />}
        variant="ghost"
        className={classes}
      >
        Export
      </Button>
    </Flex>
  );
};

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
                <NavbarItems
                  importFn={uploadData}
                  exportFn={downloadData}
                  isDesktop
                />
                <ThemeSwitch />
              </div>
            </NavbarDesktop>

            {/* Mobile version of a header */}
            <NavbarMobile>
              <Flex flex="col" gap="lg" className="p-4">
                <Flex flex="col">
                  <h2>Upload your tasks from a file</h2>
                  <p className="text-foreground-dimmed">
                    You can back up your tasks in a JSON file and upload it
                    later.
                  </p>
                </Flex>
                <NavbarItems importFn={uploadData} exportFn={downloadData} />
              </Flex>
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
