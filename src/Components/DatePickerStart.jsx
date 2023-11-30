import React from 'react';
import DatePicker from "react-datepicker";


const DatePickerStart = ({startTime, setStartTime}) => {
  return (
    <>
        <DatePicker
                    className="form-control ps-1 cursor-pointer "
                    popperPlacement="bottom"
                    selected={startTime}
                    onChange={(time) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="h:mm aa"
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Start time"
                  />
    </>
  )
}

export default DatePickerStart