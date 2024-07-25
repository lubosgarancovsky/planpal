import React, { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Task } from '../task-card';
import { Collapsible } from '../../core';
import { Task as TaskType } from '../../../utils/api/types';
import { baseUrl } from '../../../utils/api';

interface TasksListProps {}

const TasksList: React.FC<TasksListProps> = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: () => axios.get(`${baseUrl()}/tasks`)
  });

  const [pending, done] = useMemo(() => {
    const data = query.status === 'success' ? query.data.data : [];

    return [
      data.filter((task: TaskType) => !task.isDone),
      data.filter((task: TaskType) => task.isDone)
    ];
  }, [query.status, query.data]);

  return (
    <div>
      <Collapsible label="Open" badge={pending.length} initiallyOpen>
        <ul>
          {query.status === 'success' &&
            pending.map((task) => (
              <li key={task.id}>
                <Task task={task} />
              </li>
            ))}
        </ul>
      </Collapsible>
      <Collapsible label="Completed" badge={done.length} initiallyOpen>
        <ul>
          {query.status === 'success' &&
            done.map((task) => (
              <li key={task.id}>
                <Task task={task} />
              </li>
            ))}
        </ul>
      </Collapsible>
    </div>
  );
};

export default TasksList;
