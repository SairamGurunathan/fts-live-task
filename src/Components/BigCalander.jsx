import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const BigCalander = ({reservationSelector}) => {
    const localizer = momentLocalizer(moment)
    
  return (
    <>
        <div>
    <Calendar
      localizer={localizer}
      views={["day", "week", "month"]}
      defaultView="day"
      // events={myEvent}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
    />
  </div>
    </>
  )
}

export default BigCalander