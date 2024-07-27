import React from 'react';
import { Task } from '../task-card';
import { Collapsible } from '../../core';
import { useTaskList } from './use-tasklist';
import { TasksListSkeleton } from '.';

interface TasksListProps {}

const TasksList: React.FC<TasksListProps> = () => {
  const { query, overdue, today, other } = useTaskList();

  if (query.status === 'pending') {
    return <TasksListSkeleton />;
  }

  const isEmpty = !overdue.length && !today.length && !other.length;

  return (
    <div className="flex flex-col gap-8">
      {!!overdue.length && (
        <Collapsible label="Overdue" badge={overdue.length} initiallyOpen>
          <ul className="flex flex-col gap-3">
            {query.status === 'success' &&
              overdue.map((task) => (
                <li key={task.id}>
                  <Task task={task} />
                </li>
              ))}
          </ul>
        </Collapsible>
      )}

      {!!today.length && (
        <Collapsible label="Today" badge={today.length} initiallyOpen>
          <ul className="flex flex-col gap-3">
            {query.status === 'success' &&
              today.map((task) => (
                <li key={task.id}>
                  <Task task={task} />
                </li>
              ))}
          </ul>
        </Collapsible>
      )}

      {!!other.length && (
        <Collapsible label="Other" badge={other.length} initiallyOpen>
          <ul className="flex flex-col gap-3">
            {query.status === 'success' &&
              other.map((task) => (
                <li key={task.id}>
                  <Task task={task} />
                </li>
              ))}
          </ul>
        </Collapsible>
      )}

      {isEmpty && (
        <div className=" p-6 flex items-center justify-center text-center border border-foreground-dimmed/20 rounded-xl flex-col gap-3">
          <h2>Wow, so empty!</h2>
          <p className="text-foreground-dimmed">
            You currently don't have any tasks. Add some using the input above.
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksList;
