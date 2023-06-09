import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeUser } from "../types";

import axios from "axios";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      {hasFavorited ? toast.success(
        'Listing removed from your Favorites'
      ) : toast.success('Listing added to your Favorites')}

    } catch (error) {
      toast.error('Something Went Terribly Wrong :O');
    }
  }, [currentUser, listingId, router, hasFavorited, loginModal]);

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite;