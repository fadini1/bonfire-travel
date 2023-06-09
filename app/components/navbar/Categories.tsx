'use client';

import { 
  GiBarn,
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland, 
  GiWindmill 
} from 'react-icons/gi';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { usePathname, useSearchParams } from 'next/navigation';

import Container from "../Container";
import CategoryItem from "../CategoryItem";

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is located near the beach'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property has a modern design'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is located in the countryside'
  },  
  {
    label: 'Pool',
    icon: TbPool,
    description: 'This property has a pool'
  },
  {
    label: 'Island',
    icon: GiIsland,
    description: 'This property is located on an Island'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is located near a lake'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities'
  },
  {
    label: 'Castle',
    icon: GiCastle,
    description: 'This property is a castle'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in the arctic'
  },
  {
    label: 'Caving',
    icon: GiCaveEntrance,
    description: 'This property has caving activities'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert'
  },
  {
    label: 'Barn',
    icon: GiBarn,
    description: 'This property has a barn'
  },
  {
    label: 'Luxurious',
    icon: IoDiamond,
    description: 'This property is luxurious'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="p-4 flex items-center justify-between gap-1 
      overflow-x-auto scrollbar-thin scrollbar-thumb-amber-300 
      hover:scrollbar-thumb-amber-200 transition duration-300">
        {categories.map((item) => (
          <CategoryItem 
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories