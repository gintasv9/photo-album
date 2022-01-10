import { ReactNode, useCallback, useEffect } from 'react';
import Button from './Button';
import Close from './icons/Close';

interface Props {
  header: ReactNode;
  footer: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ header, footer, children, onClose }) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full bg-slate-400 bg-opacity-50">
      <div className="relative px-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">{header}</h3>
            <Button variant="iconButton" type="button" onClick={onClose}>
              <Close />
            </Button>
          </div>

          <div className="p-6 space-y-6">{children}</div>

          {footer && (
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
