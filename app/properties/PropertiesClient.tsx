'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "../types";

import axios from "axios";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`).then(() => {
      toast.success('Listing Deleted');
      router.refresh();
    }).catch((error) => {
      toast.error(error?.response?.data?.error);
    }).finally(() => {
      setDeletingId('');
    });
  }, [router]);

  return (
    <Container>
      <div className="h-auto pt-24 pb-16">
        <Heading
          bg
          bigTitle
          center
          title="Properties"
          subtitle="All the properties you've created so far!"
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5 xl:grid-cols-6 gap-3 ml-2">
          {listings.map((listing) => (
            <ListingCard 
              actionLabel="Delete"
              currentUser={currentUser}
              key={listing.id}
              actionId={listing.id}
              data={listing}
              disabled={deletingId === listing.id}
              onAction={onCancel}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default PropertiesClient;