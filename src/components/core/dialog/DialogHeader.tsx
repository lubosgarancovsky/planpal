import { WithChildren } from '../../../utils';

interface DialogHeaderProps extends WithChildren {
  title: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children && <p className="text-foreground-dimmed">{children}</p>}
    </div>
  );
};

export default DialogHeader;
