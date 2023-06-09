'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image 
      className="rounded-full object-cover h-10 w-10 border-2 border-black
      transition duration-500 hover:border-white cursor-pointer"
      height={100}
      width={100}
      alt="Avatar"
      src={src || '/images/unknown.png'}
    />
  )
}

export default Avatar;