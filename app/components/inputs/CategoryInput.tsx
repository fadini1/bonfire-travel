'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  selected?: boolean;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  selected,
  icon: Icon,
  onClick
}) => {
  return (
    <div
    onClick={() => onClick(label)}
    className={`text-[#101010] hover:bg-zinc-400 p-2 rounded-lg 
    transition duration-500 cursor-pointer font-semibold flex gap-2 items-center
    ${selected ? 'bg-amber-100' : 'bg-zinc-300' }`}>
      <Icon size={20} />
      {label}
    </div>
  )
}

export default CategoryInput;