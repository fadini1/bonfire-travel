'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  errors,
  register
}) => {
  return (
    <div className="relative ml-2 mr-2">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-600 absolute top-[0.95rem] left-[2px]" 
        />
      )}
      <input
        id={id}
        disabled={disabled}
        { ... register(id, { required })}
        placeholder={label}
        type={type}
        className={`w-full py-2 mt-2 rounded-md outline-none 
        transition duration-500 disabled:opacity-70 disabled:cursor-not-allowed
        font-semibold hover:bg-slate-400 focus:bg-slate-500 
        placeholder:text-black
        ${formatPrice ? 'pl-6' : 'pl-2'}
        ${errors[id] ? 'bg-red-600' : 'bg-slate-300'}
        `}
      />
    </div>
  )
}

export default Input;