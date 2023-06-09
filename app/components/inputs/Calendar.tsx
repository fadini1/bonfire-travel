'use client';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;

  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange
}) => {
  return (
    <div> 
      <DateRange
        className="rounded-xl"
        ranges={[value]}
        disabledDates={disabledDates}
        rangeColors={["#262626"]}
        direction="vertical"
        date={new Date()}
        minDate={new Date()}
        showDateDisplay={false}
        onChange={onChange}
      />
    </div>
  )
}

export default Calendar;