import { WithChildren } from '../../../utils';

interface DialogBodyProps extends WithChildren {}

const DialogBody: React.FC<DialogBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DialogBody;
