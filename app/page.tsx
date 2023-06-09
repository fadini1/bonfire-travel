import getListings, { getListingsParams } from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: getListingsParams;
}

export const dynamic = 'force-dynamic';

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div className="h-screen pt-24">
        <EmptyState showReset />
      </div>
    )
  }
  return (
    <Container>
      <div className="h-auto pt-40 pb-36">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser} 
                key={listing.id}
                data={listing}
              />
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export default Home;