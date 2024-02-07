import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const BigCalander = () => {
    const localizer = momentLocalizer(moment)

  return (
    <>
        <div>
    <Calendar
      localizer={localizer}
      views={["day", "week", "month"]}
      defaultView="day"
    //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
    />
  </div>
    </>
  )
}

export default BigCalander