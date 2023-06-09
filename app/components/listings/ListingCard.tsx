'use client';

import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";

import HeartButton from "../HeartButton";
import Button from "../Button";
import { BsMoonStarsFill } from "react-icons/bs";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  onAction
}) => {
  const { getByValue } = useCountries();

  const router = useRouter();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId);
  }, [disabled, actionId, onAction]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDateStart = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);

    return `${format(start, 'PP')} - `
  }, [reservation]);

  const reservationDateEnd = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const end = new Date(reservation.endDate);

    return `${format(end, 'PP')}`
  }, [reservation]);

  return (
    <div className="bg-zinc-800/40 p-6 rounded-xl relative
    hover:bg-zinc-800/80 transition duration-500">
      <div className="absolute top-[0.85rem] right-4">
        <HeartButton
          listingId={data.id} 
          currentUser={currentUser}
        />
      </div>
      <div
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group hover:border-amber-100 
      border-2 border-zinc-700 transition duration-500 rounded-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full aspect-square relative overflow-hidden 
          rounded-full cursor-pointer">
            <Image
              fill
              className="object-cover h-full w-full group-hover:scale-110
              transition duration-500"
              alt="Listing"
              src={data.imageSrc} 
            />
          </div>
        </div>
      </div>
      <div className="p-1">
        <div className="px-4 py-1 mt-5 bg-amber-300 rounded-lg
        text-black hover:bg-amber-200 transition duration-300
        font-semibold sm:w-fit w-full sm:text-sm text-lg text-center">
          {location?.label}
        </div>   
        <div className="mt-2 px-4 py-1 rounded-lg bg-zinc-700/60
        hover:bg-zinc-700 transition duration-300 text-zinc-400
        hover:text-zinc-300 sm:w-fit w-full sm:text-sm font-semibold 
        text-lg text-center">
          {location?.region}
        </div>
        {!reservation && (
          <div className="sm:text-sm bg-zinc-700/60 mt-2 py-1 px-4
          rounded-md hover:bg-zinc-700 transition text-zinc-400
          hover:text-zinc-300 duration-300 font-semibold mb-2 
          text-center sm:w-fit w-full text-lg">
            {data.category}
          </div>
        )}
        {reservation && (  
          <div className="flex flex-col gap-2 mb-2 mt-2 sm:text-sm text-lg
          sm:w-fit w-full text-center">
            <div className="bg-zinc-700/60 px-4 py-1 rounded-lg 
            text-zinc-400 font-semibold hover:bg-zinc-700
            transition duration-300">
              {reservationDateStart} {' '}
            </div>
            <div className="bg-zinc-700/60 px-4 py-1 rounded-lg 
            text-zinc-400 font-semibold hover:bg-zinc-700
            transition duration-300">
              {reservationDateEnd}
            </div>
          </div>
        )}  
        <div className="flex items-center">
          <div className="font-bold text-sm flex items-center
          gap-1 w-full">
            <div className="bg-zinc-500 rounded-md px-4 py-0.5
            text-black hover:bg-zinc-400 transition duration-300
            sm:text-sm text-lg sm:w-fit w-full text-center">
              $ {price}
            </div>
            {!reservation && (
              <div className="text-zinc-900 ml-0.5 sm:text-sm bg-zinc-400 
              rounded-full sm:p-1 p-1.5 hover:bg-zinc-100 transition 
              duration-300 text-lg">
                <BsMoonStarsFill />
              </div>
            )}
          </div> 
        </div>
        {onAction && actionLabel && (
          <Button
            smallTextButton
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard;