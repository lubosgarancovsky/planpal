import React, { useRef } from 'react';
import PriorityPicker from './PriorityPicker';

import { CreateTagDialog, TaskDetailFooter, TaskDetailHeader } from '.';
import { Chip, Editable } from '../../core';
import { useTaskDetail } from './use-task-detail';
import { cn, formatDate, tagLabel } from '../../../utils';
import { Container, Flex } from '../../layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useTaskDetailContex } from '../../../context/task-detail-context';
import 'react-datepicker/dist/react-datepicker.css';

const TaskDetail: React.FC = () => {
  const { selectedTask, setSelectedTask } = useTaskDetailContex();
  const { task, remove, hasDifferences, reset, save, setTask } =
    useTaskDetail();

  const asideRef = useRef<HTMLDivElement>(null);

  // Fixes issue where transition breaks the dialog backdrop
  const handleTransition = () => {
    const aside = asideRef.current;

    if (aside && !!selectedTask) {
      aside.style.transform = 'none';
    }
  };

  return (
    <AnimatePresence>
      {task && (
        <motion.aside
          ref={asideRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ ease: 'easeInOut' }}
          onAnimationComplete={handleTransition}
          className="border-l fixed border-foreground-dimmed/20 h-screen right-0 w-full tb1:w-10/12 tb2:w-6/12 dm1:w-3/12 bg-background"
        >
          <Flex
            flex="col"
            gap="none"
            className="h-[100svh] overflow-hidden justify-between"
          >
            <TaskDetailHeader
              task={task}
              setTask={setTask}
              setSelectedTask={setSelectedTask}
            />

            <span
              className={cn('w-full h-4 bg-gradient-to-r to-background', {
                'from-success': task.priority === 0,
                'from-warning': task.priority === 1,
                'from-danger': task.priority === 2
              })}
            />

            <Flex
              flex="col"
              gap="xl"
              className="overflow-y-auto h-full p-3 tb2:p-6"
            >
              <Container>
                <Editable
                  as="h2"
                  onSave={(value: string) => setTask({ ...task, title: value })}
                >
                  {task.title || ''}
                </Editable>
                <Editable
                  as="p"
                  onSave={(value: string) =>
                    setTask({ ...task, description: value })
                  }
                  className="text-foreground-dimmed"
                >
                  {task.description || 'Edit description...'}
                </Editable>
              </Container>

              <Container heading={<h5>Tags</h5>}>
                <Flex gap="md" wrap>
                  {task.tags.map((tag: string, index: number) => (
                    <Chip
                      key={index}
                      color={tag.split('$')[1]}
                      onClose={() => {
                        setTask({
                          ...task,
                          tags: task.tags.filter(
                            (_: any, i: number) => index !== i
                          )
                        });
                      }}
                    >
                      {tagLabel(tag)}
                    </Chip>
                  ))}
                  <CreateTagDialog
                    fixTransition={handleTransition}
                    onSave={(title: string, color: string) =>
                      setTask({
                        ...task,
                        tags: [...task.tags, `${title}$${color}`]
                      })
                    }
                  />
                </Flex>
              </Container>

              <Container heading={<h5>Priority</h5>}>
                <PriorityPicker
                  priority={task.priority}
                  onChange={(priority: number) =>
                    setTask({ ...task, priority: priority })
                  }
                />
              </Container>

              <Container heading={<h5>Created at</h5>}>
                <Flex className="justify-between">
                  <span className="text-foreground-dimmed">
                    {formatDate(task.createdAt)}
                  </span>
                </Flex>
              </Container>
            </Flex>

            <TaskDetailFooter
              task={task}
              remove={remove}
              save={save}
              reset={reset}
              hasDifferences={hasDifferences}
            />
          </Flex>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default TaskDetail;
