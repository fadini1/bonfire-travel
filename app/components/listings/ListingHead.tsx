'use client';

import { SafeUser } from "@/app/types";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl relative
      lg:h-[50vh] sm:h-[40vh] h-[30vh]">
        <Image
          fill
          alt="Image"
          src={imageSrc} 
          className="object-cover w-full opacity-80 transition duration-300
          hover:opacity-100"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser} 
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead;