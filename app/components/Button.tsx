'use client';

import { IconType } from "react-icons";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  textButton?: boolean;
  smallTextButton?: boolean;
  icon?: IconType;
} 

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  textButton,
  smallTextButton,
  icon: Icon
}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled} 
    className={`disabled:opacity-80 disabled:cursor-not-allowed flex 
    items-center relative text-black hover:bg-amber-100 hover:text-black
    transition duration-500
    ${outline ? 'bg-zinc-400' : 'bg-amber-300'} 
    ${small ? 'text-sm' : 'text-lg'} 
    ${textButton ? 'w-full' : 'w-1/3'}
    ${textButton ? 'px-6' : 'px-1'}  
    ${textButton ? 'py-4' : 'py-1'}
    ${textButton ? 'rounded-lg' : 'rounded-full'}
    ${textButton ? 'bg-amber-300' : ''}
    ${textButton ? 'justify-center mt-2 md:text-xl text-lg font-semibold' : ''}
    ${smallTextButton ? 'font-semibold w-full justify-center px-6 py-1' : ''}
    ${smallTextButton ? 'rounded-lg mt-2 sm:text-sm text-lg' : ''}
    ${Icon ? 'bg-zinc-300 hover:bg-zinc-200' : ''}`}>
      {Icon && (
        <Icon 
          size={24}
          className="absolute right-2 top-[4.2px]"
        />
      )}
      {outline && (
        <BsFillArrowLeftCircleFill
          className="h-6 w-6 duration-500 transition 
          animate-[spin_3s_ease-in-out_infinite]"  
        />
      )}
      {small && (
        <BsFillArrowRightCircleFill
          className="h-6 w-6 duration-500 transition 
          animate-[spin_3s_ease-in-out_infinite]" 
        />
      )}
      {textButton && (
        <div>
          {label}
        </div>
      )}
      {smallTextButton && (
        <div>
          {label}
        </div>
      )}
    </button>
  )
}

export default Button;