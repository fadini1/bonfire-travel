'use client';

import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';
import { TbPencil } from 'react-icons/tb';

const Search = () => {
  const { getByValue } = useCountries();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return null;
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let difference = differenceInDays(end, start);

      if (difference === 0) {
        difference = 1;
      }

      return `${difference} Days`;
    }

    return '';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Search Property';
  }, [guestCount]);

  return (
    <div className="w-auto">
      <div
      onClick={searchModal.onOpen} 
      className="flex items-center justify-between gap-1
      cursor-pointer text-sm">
        {locationValue && (   
          <div className="navbar-item lg:block hidden">
            {locationLabel}
          </div>
        )}
        {startDate && endDate && (
          <div className="navbar-item lg:block hidden">
            {durationLabel}
          </div>
        )}
        <div className={`bg-amber-300 hover:bg-amber-200 transition 
        flex items-center gap-2 duration-300 text-black font-semibold
        lg:px-3 lg:py-1 lg:rounded-xl rounded-full px-1.5 py-1.5`}>
          <div className="hidden lg:block">
            {guestLabel}
          </div>
          {!guestCount && (
            <div>
              <BiSearch size={15} />
            </div>
          )}
        </div>
        {guestCount && (
          <div 
          className='rounded-full p-1.5 bg-amber-300 hover:bg-amber-200
          transition duration-300'>
            <TbPencil color='black' size={15} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Search;