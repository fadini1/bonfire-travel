'use client';

import { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";

import querystring from "query-string";

interface CategoryItemProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon: Icon, 
  label, 
  selected 
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = querystring.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = querystring.stringifyUrl({
      url: '/',
      query: updatedQuery 
    }, { skipNull: true });

    router.push(url);
  }, [label, params, router]);

  return (
    <div
    onClick={handleClick} 
    className={`flex flex-col items-center justify-center gap-2
    p-0.5 border-b-2 transition duration-500 cursor-pointer
    ${selected ? 'border-amber-100' : 'border-zinc-600'}
    ${selected ? 'text-amber-100' : 'text-zinc-600'}
    ${selected ? 'hover:text-zinc-400' : 'hover:text-amber-300'}
    ${selected ? 'hover:border-zinc-400' : 'hover:border-amber-300'}`}>
      <Icon size={30} />
    </div>
  )
}

export default CategoryItem;