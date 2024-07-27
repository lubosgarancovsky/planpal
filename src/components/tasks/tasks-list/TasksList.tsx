import React from 'react';
import { Task } from '../task-card';
import { Collapsible } from '../../core';
import { useTaskList } from './use-tasklist';
import { TasksListSkeleton } from '.';
import { Flex } from '../../layout';

interface TasksListProps {}

const TasksList: React.FC<TasksListProps> = () => {
  const { query, overdue, today, other } = useTaskList();

  if (query.status === 'pending') {
    return <TasksListSkeleton />;
  }

  const isEmpty = !overdue.length && !today.length && !other.length;

  return (
    <Flex flex="col" gap="lg">
      {!!overdue.length && (
        <Collapsible label="Overdue" badge={overdue.length} initiallyOpen>
          <Flex flex="col" as="ul" gap="md">
            {query.status === 'success' &&
              overdue.map((task) => (
                <li key={task.id}>
                  <Task task={task} />
                </li>
              ))}
          </Flex>
        </Collapsible>
      )}

      {!!today.length && (
        <Collapsible label="Today" badge={today.length} initiallyOpen>
          <Flex flex="col" as="ul" gap="md">
            {query.status === 'success' &&
              today.map((task) => (
                <li key={task.id}>
                  <Task task={task} />
                </li>
              ))}
          </Flex>
        </Collapsible>
      )}

      {!!other.length && (
        <Collapsible label="Other" badge={other.length} initiallyOpen>
          <Flex flex="col" as="ul" gap="md">
            {query.status === 'success' &&
              other.map((task) => (
                <li key={task.id}>
                  <Task task={task} />
                </li>
              ))}
          </Flex>
        </Collapsible>
      )}

      {isEmpty && (
        <Flex
          flex="col"
          gap="md"
          className="p-6 border border-foreground-dimmed/20 rounded-xl text-center"
        >
          <h2>Wow, so empty!</h2>
          <p className="text-foreground-dimmed">
            You currently don't have any tasks. Add some using the input above.
          </p>
        </Flex>
      )}
    </Flex>
  );
};

export default TasksList;
