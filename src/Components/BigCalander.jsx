import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { useState } from 'react'
import BookingPreview from '../Pages/BookingPreview'

const BigCalander = ({myEvent,searchDate}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState(new Date(searchDate))
  const [show, setShow] = useState(false);
  moment.tz.setDefault('Asia/India')
    const localizer = momentLocalizer(moment)
    const onNavigate = ((newDate) => setDate(newDate))
    
    const handleSelectEvent = (event) => {
      setSelectedEvent(event)
      setShow(true);
    };
    const eventPropGetter = ()=>{

    }
  return (
    <>
    <Calendar
      localizer={localizer}
      views={["day", "week", "month"]}
      date={date}
      defaultView="day"
      defaultDate={new Date(moment().toDate())}
      events={myEvent}
      startAccessor="start"
      endAccessor="end"
      titleAccessor="title"
      style={{ height: "100vh" }}
      onSelectEvent={handleSelectEvent}
      showAllEvents
      onNavigate={onNavigate}
      eventPropGetter={eventPropGetter}
    />
    <BookingPreview show={show} setShow={setShow} selectedEvent={selectedEvent}/>
    </>
  )
}

export default BigCalander