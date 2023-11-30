import React from 'react'
import DatePicker from "react-datepicker";


const DatePickerEnd = ({endTime, setEndTime}) => {
  return (
    <>
    <DatePicker
                    className="form-control ps-1 cursor-pointer "
                    popperPlacement="bottom"
                    selected={endTime}
                    onChange={(time) => setEndTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="h:mm aa"
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="End time"
                  />
    </>
  )
}

export default DatePickerEnd