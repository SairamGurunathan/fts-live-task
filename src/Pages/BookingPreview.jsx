import moment from 'moment';
import React from 'react'
import { Col, Offcanvas, Row } from 'react-bootstrap'

const BookingPreview = ({show,setShow,selectedEvent}) => {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
        <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
        style={{ width: "40%" }}
      >
        <Offcanvas.Header closeButton className="bg-info">
          <Offcanvas.Title>Booking preview</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col>
              <div>
                <label>
                  First Name
                </label>
                <p className="fw-bold">
                  {selectedEvent?.reservation?.booking?.firstName}
                </p>
              </div>
              <div>
                <label>
                Payment method
                </label>
                <p className="fw-bold text-capitalize">
                {selectedEvent?.reservation?.booking?.bookingSource}
                </p>
              </div>
              <div>
                <label>
                Start time
                </label>
                <p className="fw-bold">
                {moment(selectedEvent?.reservation?.booking?.startTime).format('YYYY-MM-DD hh:mm A')}
                </p>
              </div>
              <div>
                <label>
                Total price
                </label>
                <p className="fw-bold">
                ${selectedEvent?.reservation?.booking?.total}
                </p>
              </div>
              <div>
                <label>
                Reservation number
                </label>
                <p className="fw-bold">
                {selectedEvent?.reservation?.booking?.reservationNumber}
                </p>
              </div>
              <div>
                <label>
                Facility
                </label>
                <p className="fw-bold">
                {selectedEvent?.reservation?.facility?.title}
                </p>
              </div>

            </Col>
            <Col>
            <div>
                <label>
                Last name
                </label>
                <p className="fw-bold">
                {selectedEvent?.reservation?.booking?.lastName}
                </p>
              </div>
              <div>
                <label>
                Rate per session
                </label>
                <p className="fw-bold">
                ${selectedEvent?.reservation?.ratePerSession}
                </p>
              </div>

              <div>
                <label>
                End time
                </label>
                <p className="fw-bold">
                {moment(selectedEvent?.reservation?.booking?.endTime).format('YYYY-MM-DD hh:mm A')}
                
                </p>
              </div>
              <div>
                <label>
                Created at
                </label>
                <p className="fw-bold">
                {moment(selectedEvent?.reservation?.booking?.createdAt).format('YYYY-MM-DD hh:mm A')}
                </p>
              </div>
              <div>
                <label>
                Booking status
                </label>
                <p className="fw-bold">
                {selectedEvent?.reservation?.booking?.bookingStatus}
                </p>
              </div>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default BookingPreview