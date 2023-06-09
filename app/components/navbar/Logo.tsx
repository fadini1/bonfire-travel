'use client';

import { useRouter } from "next/navigation";

import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Image
        onClick={() => router.push('/')} 
        alt="Logo"
        className="cursor-pointer bg-white rounded-full p-1.5
        hover:bg-amber-300/90 transition duration-500 h-10 w-10
        lg:h-11 lg:w-11"
        height={44}
        width={44}
        src='/images/logo.png'
      />
      <div className="hidden sm:flex">
        <p className="site-name">B</p>
        <p className="site-name">O</p>
        <p className="site-name">N</p>
        <p className="site-name">F</p>
        <p className="site-name">I</p>
        <p className="site-name">R</p>
        <p className="site-name">E</p>
      </div>
    </div>
  )
}

export default Logo;