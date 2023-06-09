import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="You are not authorized to view this Page"
      />
    )
  }

  const listings = await getListings({
    userId: currentUser.id
  });

  if (listings.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <EmptyState 
          title="No Properties found"
          subtitle="Looks like you haven't logged any Properties 
          yet! Create some, and they'll be displayed here."
        />
      </div>
    )
  }

  return (
    <PropertiesClient
      currentUser={currentUser} 
      listings={listings}
    />
  )
}

export default PropertiesPage;