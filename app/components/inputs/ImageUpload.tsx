'use client';

import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ulv4a1qs"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
          onClick={() => open?.()}
          className={`relative cursor-pointer border-2 ml-2 p-20 flex flex-col
          justify-center items-center gap-2 rounded-lg text-zinc-400 
          hover:bg-zinc-700/70 transition duration-500 hover:text-zinc-100
          ${value ? 'border-2' : 'border-dashed'}
          ${value ? 'border-amber-300' : 'border-zinc-600'}
          ${value ? 'hover:border-amber-100' : 'hover:border-zinc-300'}`}>
            <TbPhotoPlus size={30} />
            {value && (
              <div className="absolute inset-0 w-full h-full
              hover:opacity-80 transition duration-500">
                <Image
                  className="rounded-lg"
                  fill
                  alt="Upload" 
                  style={{ objectFit: 'cover' }}
                  src={value}
                /> 
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload;