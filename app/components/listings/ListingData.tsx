'use client';

import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";

import useCountries from "@/app/hooks/useCountries";

import Avatar from "../Avatar";
import Heading from "../Heading";

import ListingCategory from "./ListingCategory";

interface ListingDataProps {
  user: SafeUser;

  description: string;
  locationValue: string;
  title: string;

  guestCount: number;
  roomCount: number;
  bathroomCount: number;

  category: {
    label: string;
    description: string;
    icon: IconType;
  } | undefined;
}

const ListingData: React.FC<ListingDataProps> = ({
  user,
  description,
  title,
  locationValue,
  guestCount,
  roomCount,
  bathroomCount,
  category
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="md:col-span-4 col-span-1 flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="font-semibold flex sm:items-center gap-2 justify-between
        md:text-lg lg:text-xl sm:flex-row flex-col">
          <div className="md:text-xl text-lg">
            <Heading
              bg
              title={`${location?.region}, ${location?.label}`}
            />
          </div>
          <div className="text-zinc-400 flex items-center gap-2 sm:ml-0 ml-4">
            Hosted by
            <div className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1
            rounded-xl hover:bg-zinc-800 transition duration-300">
              <span className="text-zinc-100">
                {user?.name}
              </span>    
              <Avatar src={user?.image} />
            </div> 
          </div>
        </div>
        <div className="flex sm:flex-row flex-col sm:items-center gap-2   
        ml-2 text-sm">
          <div className="listing-detail">
            {guestCount} Guests
          </div>
          <div className="listing-detail">
            {roomCount} Rooms
          </div>
          <div className="listing-detail">
            {bathroomCount} Bathrooms
          </div>
          {category && (
            <ListingCategory 
              label={category.label}
              description={category.description}
              icon={category.icon}
            />
          )}
        </div>
      </div>
      <div className="md:text-lg text-zinc-400 max-w-lg font-medium 
      ml-2 mt-2 mb-2">
        {description}
      </div>
    </div>
  )
}

export default ListingData;