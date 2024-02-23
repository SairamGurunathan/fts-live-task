import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { useState } from 'react'
import BookingPreview from '../Pages/BookingPreview'

const BigCalander = ({myEvent,searchDate}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [show, setShow] = useState(false);
  moment.tz.setDefault('Asia/India')
    const localizer = momentLocalizer(moment)
    
    const handleSelectEvent = (event) => {
      setSelectedEvent(event);
      setShow(true);
    };
  return (
    <>
    <Calendar
      localizer={localizer}
      views={["day", "week", "month"]}
      defaultView="day"
      default={new Date(searchDate)}
      events={myEvent}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
      onSelectEvent={handleSelectEvent}
    />
    <BookingPreview show={show} setShow={setShow} selectedEvent={selectedEvent}/>
    </>
  )
}

export default BigCalander