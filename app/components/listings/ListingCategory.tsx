'use client';

import { IconType } from "react-icons";

interface ListingCategoryProps {
  label: string;
  description: string;

  icon: IconType;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  label,
  description,
  icon: Icon
}) => {
  return (
    <div className="flex">
      <div className="listing-detail">
        {label}
      </div>
      <div className="flex items-center justify-center ml-2 bg-zinc-800/60 
      p-2 rounded-lg hover:bg-zinc-800 transition duration-300">
        <Icon size={20} className="text-amber-300" />
      </div>
    </div>
  )
}

export default ListingCategory; 