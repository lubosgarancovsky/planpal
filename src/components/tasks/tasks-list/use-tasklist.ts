import { useQuery } from '@tanstack/react-query';
import { baseUrl, dateDiff } from '../../../utils';
import { useMemo } from 'react';
import axios from 'axios';

export const useTaskList = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: () => axios.get(`${baseUrl()}/tasks?sortBy=createdAt&order=desc`)
  });

  const [overdue, today, other] = useMemo(() => {
    const allTasks = query.status === 'success' ? query.data.data : [];

    const now = new Date().toISOString();

    const dueArr = [],
      todayArr = [],
      otherArr = [];

    for (const task of allTasks) {
      if (task.dueAt) {
        if (dateDiff(now, task.dueAt) < 0 && !task.isDone) {
          dueArr.push(task);
        } else if (dateDiff(now, task.dueAt) === 0) {
          todayArr.push(task);
        } else {
          otherArr.push(task);
        }
      } else {
        otherArr.push(task);
      }
    }

    return [dueArr, todayArr, otherArr];
  }, [query.status, query.data]);

  return {
    query,
    overdue,
    today,
    other
  };
};
