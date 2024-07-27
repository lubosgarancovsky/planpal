import React from 'react';

const TasksListSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded animate-pulse bg-background-100"></div>
            <div className="w-40 h-4 rounded-full animate-pulse bg-background-100"></div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded animate-pulse bg-background-100"></div>
            <div className="w-60 h-4 rounded-full animate-pulse bg-background-100"></div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded animate-pulse bg-background-100"></div>
            <div className="w-32 h-4 rounded-full animate-pulse bg-background-100"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksListSkeleton;
