import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'iconButton';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant: ButtonVariant };

const defaultClassName =
  'text-gray-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5';

const primaryClassName =
  'text-white bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center';

const secondaryClassName =
  'text-white bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center';

const iconButtonClassName =
  'flex justify-center items-center text-gray-400 bg-transparent disabled:bg-gray-100 disabled:cursor-not-allowed disabled:hover:text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex';

const classNameMap: Record<ButtonVariant, string> = {
  default: defaultClassName,
  primary: primaryClassName,
  secondary: secondaryClassName,
  iconButton: iconButtonClassName
};

const Button: React.FC<Props> = ({ variant, children, ...rest }) => {
  return (
    <button {...rest} className={clsx(classNameMap[variant], rest.className)}>
      {children}
    </button>
  );
};

export default Button;
