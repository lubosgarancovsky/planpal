import React, { useState } from 'react';
import { Button, Chip, Input } from '../../core';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody
} from '../../core/dialog';
import { Add } from '../../icons';
import { ColorPicker } from '.';

interface CreateTagDialogProps {
  onSave: (title: string, color: string) => void;
  fixTransition: () => void;
}

const CreateTagDialog: React.FC<CreateTagDialogProps> = ({
  onSave,
  fixTransition
}) => {
  const [title, setTitle] = useState('Your tag');
  const [color, setColor] = useState('#E57373');

  return (
    <Dialog>
      <DialogTrigger>
        <Button startContent={<Add />} variant="text" onClick={fixTransition}>
          Add tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Add new tag">
          Tags help you to better organize your tasks
        </DialogHeader>
        <DialogBody>
          <div className="grid tb2:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <ColorPicker fn={(hex: string) => setColor(hex)} />
            </div>
            <div>
              <div className="border border-foreground-dimmed/20 h-[12rem] rounded-md bg-background-100 grid place-items-center">
                <Chip color={color} classname="text-base py-1.5 px-6">
                  {title}
                </Chip>
              </div>
            </div>
          </div>
        </DialogBody>
        <div className="flex justify-end">
          <DialogTrigger>
            <Button
              onClick={() => onSave(title, color)}
              disabled={title.length < 1}
            >
              Create tag
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTagDialog;
