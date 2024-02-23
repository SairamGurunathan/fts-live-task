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
                <p>
                  {}
                </p>
              </div>
              <div>
                <label>
                Payment method
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Start time
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Total price
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Reservation number
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Facility
                </label>
                <p>
                  
                </p>
              </div>

            </Col>
            <Col>
            <div>
                <label>
                Last name
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Rate per session
                </label>
                <p>
                  
                </p>
              </div>

              <div>
                <label>
                End time
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Created at
                </label>
                <p>
                  
                </p>
              </div>
              <div>
                <label>
                Booking status
                </label>
                <p>
                  
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