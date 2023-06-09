'use client';

import { Range } from "react-date-range";
import { BsMoonStarsFill } from "react-icons/bs";

import dynamic from "next/dynamic";

import useCountries from "@/app/hooks/useCountries";

import Calendar from "../inputs/Calendar";
import Button from "../Button";

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  locationValue: string;
  disabledDates: Date[];
  dateRange: Range,
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;

  disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  disabledDates,
  locationValue,
  disabled,
  dateRange,
  onSubmit,
  onChangeDate
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="overflow-hidden ml-2 flex">
      <div className="flex flex-1 flex-col gap-2 bg-zinc-900 rounded-xl py-4
      px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="md:text-lg font-semibold text-black py-1.5 px-6 w-fit
          bg-amber-300 rounded-full hover:bg-amber-200 transition 
          duration-300">
            Book a Stay!
          </div>
          <div className="flex gap-3 bg-zinc-800/30 px-4 py-2 rounded-xl
          hover:bg-zinc-800/80 transition duration-300 items-center">
            <div className="md:text-lg text-black font-semibold px-5 py-[1px]
            bg-zinc-400 hover:bg-zinc-300 transition duration-500
            rounded-full">
              $ {totalPrice}
            </div>
            <div className="text-lg bg-zinc-200 rounded-full p-1.5 text-black
            hover:bg-zinc-100 transition duration-300">
              <BsMoonStarsFill className="md:h-4 md:w-4 h-[14px] w-[14px]" />
            </div>
          </div>
        </div>
        <div className="px-2 py-1">
          <Calendar 
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
          />
          <div className="py-2">
            <Button 
              textButton
              label="Book Property"
              disabled={disabled}
              onClick={onSubmit}
            /> 
          </div>
          <div>
            <Map center={coordinates} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingReservation;