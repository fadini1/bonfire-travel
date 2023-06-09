import { SafeListing, SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
  favoriteListings: SafeListing[]; 
  currentUser?: SafeUser | null;
}

const   FavoritesClient: React.FC<FavoritesClientProps> = ({
  favoriteListings,
  currentUser
}) => { 
  return (
    <Container>
      <div className="h-auto pt-24 pb-24">
        <Heading 
          bg
          bigTitle
          center
          title="Favorites"
          subtitle="All your Favorite Properties in one place!"
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5 xl:grid-cols-6 gap-3 ml-2">
          {favoriteListings.map((listing) => (
            <ListingCard 
              currentUser={currentUser}
              data={listing}
              key={listing.id}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FavoritesClient;