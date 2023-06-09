import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (favorites.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <EmptyState 
          title="No favorite Listings found"
          subtitle="Like some, and they'll be displayed here"
        />
      </div>
    )
  }

  return (
    <FavoritesClient 
      favoriteListings={favorites}
      currentUser={currentUser}
    />
  )  
}

export default FavoritesPage;