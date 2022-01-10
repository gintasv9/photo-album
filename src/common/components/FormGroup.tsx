import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import Input from './Input';

interface Props<T> {
  label: string;
  errors: FieldErrors<T>;
  register: UseFormRegisterReturn;
}

const FormGroup = <T extends FieldValues>({ label, errors, register }: Props<T>) => {
  return (
    <fieldset className="mb-2">
      <label htmlFor={register.name}>{label}</label>
      <Input {...register} className="my-2 border" />
      <div className={clsx('text-xs text-red-600', { 'invisible h-4': !errors[register.name] })}>
        {errors[register.name]?.message}
      </div>
    </fieldset>
  );
};

export default FormGroup;
