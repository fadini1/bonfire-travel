'use client';

import Select from 'react-select';

import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
} 

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange 
}) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder='I&apos;m in...'
        isClearable
        options={getAll()} 
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex items-center gap-2 cursor-pointer p-0.5'>
            <div className='text-black'>
              {option.flag}
            </div>
            <div className='font-semibold text-black'>
              {option.label}, 
              <span className='text-neutral-600 ml-1'>
                {option.region}
              </span>
            </div>
          </div>
        )}  
        classNames={{
          control: () => 'border-none hover:bg-zinc-200 bg-black',
          input: () => 'text-lg hover:text-black cursor-pointer',
          option: () => 'text-lg hover:bg-zinc-200 transition duration-300 rounded-l-md'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary: '',
            primary25: ''
          }
        })} 
      />
    </div>
  )
}

export default CountrySelect