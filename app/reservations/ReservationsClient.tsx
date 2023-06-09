'use client';

import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeUser, SafeReservation } from "../types";

import axios from "axios";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(
      `/api/reservations/${id}`
    ).then(() => {
      toast.success('Reservation Cancelled');
      router.refresh();
    }).catch(() => {
      toast.error('Something went terribly wrong! :o');
    }).finally(() => {
      setDeletingId('');
    });
  }, [router]);

  return (
    <Container>
      <div className="h-auto pt-24 pb-6">
        <Heading
          bg
          bigTitle 
          center
          title="Reservations"
          subtitle="All the bookings Tenants have made on your Properties!"
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5 xl:grid-cols-6 gap-3 ml-2">
          {reservations.map((reservation) => (
            <ListingCard
              actionLabel="Cancel"
              currentUser={currentUser}
              reservation={reservation}
              key={reservation.id}
              actionId={reservation.id}
              data={reservation.listing}
              disabled={deletingId === reservation.id}
              onAction={onCancel}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default ReservationsClient;