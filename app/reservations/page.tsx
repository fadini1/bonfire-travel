import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="You are not authorized to view this Page"
      />
    )
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <EmptyState 
          title="No Reservations found"
          subtitle="Looks like no one has booked any of your
          Properties yet! Share them to attract new tenants!"
        />
      </div>
    )
  }

  return (
    <ReservationsClient  
      currentUser={currentUser}
      reservations={reservations}
    />
  )
};

export default ReservationsPage;