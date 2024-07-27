import React from 'react';
import { Button } from '../../core';
import { Trash } from '../../icons';
import { Task } from '../../../utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Flex } from '../../layout';

interface TaskDetailFooterProps {
  task: Task;
  remove: UseMutationResult<AxiosResponse<any, any>, Error, string, unknown>;
  hasDifferences: boolean;
  reset: () => void;
  save: () => void;
}

const TaskDetailFooter: React.FC<TaskDetailFooterProps> = ({
  task,
  remove,
  hasDifferences,
  reset,
  save
}) => {
  return (
    <div className="flex gap-2 p-3 tb2:px-6 border-t border-foreground-dimmed/20 justify-between bg-background">
      <Button
        onClick={() => remove.mutate(task.id)}
        startContent={<Trash />}
        variant="danger"
      >
        Delete
      </Button>

      <Flex gap="md">
        <Button onClick={save} disabled={!hasDifferences}>
          Save
        </Button>
        <Button onClick={reset} variant="secondary" disabled={!hasDifferences}>
          Reset
        </Button>
      </Flex>
    </div>
  );
};

export default TaskDetailFooter;
