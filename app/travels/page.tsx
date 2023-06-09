import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";

import TravelsClient from "./TravelsClient";

const TravelsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="You are not authorized to view this Page"
      />
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <EmptyState 
          title="No Travels found"
          subtitle="Looks like you haven't booked
          any Properties yet! Go find one you like!"
        />
      </div>
    )
  }

  return (
    <TravelsClient
      currentUser={currentUser} 
      reservations={reservations}
    />
  )
}

export default TravelsPage;