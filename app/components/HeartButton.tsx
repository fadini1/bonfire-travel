'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  return (
    <div
    onClick={toggleFavorite} 
    className="cursor-pointer relative">
      {!hasFavorited && (
        <AiOutlineHeart 
          size={22}
          className='transition duration-500 text-zinc-700 
          hover:text-amber-300'
        />  
      )}
      {hasFavorited && (
        <AiFillHeart 
          size={22}
          className='transition duration-500 text-amber-300  
          hover:text-zinc-400'
        />  
      )}
    </div>
  )
}

export default HeartButton;