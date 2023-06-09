'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-col gap-1 bg-zinc-800 p-5 rounded-lg mt-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center justify-center gap-2">
            <div className="text-[#101010] hover:bg-zinc-400 py-1 px-4
            rounded-2xl transition duration-500 bg-zinc-300 font-semibold">
              {title}
            </div>
            <div className="text-[#101010] hover:bg-zinc-400 rounded-full 
            transition duration-500 bg-zinc-300 font-semibold py-1 px-3">
              {value}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
          onClick={onReduce}
          className="h-6 w-6 rounded-full flex items-center justify-center
          cursor-pointer bg-zinc-400 hover:bg-amber-100 text-black
          transition duration-300">
            <AiOutlineMinus size={12} />
          </div>
          <div
          onClick={onAdd}
          className="h-6 w-6 rounded-full flex items-center justify-center
          cursor-pointer bg-amber-300 hover:bg-amber-100 text-black
          transition duration-300">
            <AiOutlinePlus size={12} />
          </div>
        </div>
      </div>
      <div className="text-zinc-400">
        {subtitle}
      </div>
    </div>
  )
}

export default Counter;