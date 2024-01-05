import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const Filter = ({showFilter, setShowFilter,handleFormSubmit,reservationDate,reservationNumber,bookingDate,handleBookingDateChange,handleReservationNumberChange,handleReservationDateChange}) => {
    const handleClose = () => setShowFilter(false);
    
  return (
    <>
    <Modal
    show={showFilter}
    onHide={handleClose}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="my-modal"
  backdrop="static"
  keyboard={false}>
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <small>Refunds filter</small>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <Form.Label>
                Reservation number
                </Form.Label>
                <Form.Control type='text' value={reservationNumber} onChange={handleReservationNumberChange}/>
                </Col>
            </Row>
                    
            <Row className='mt-3'>
            <Form.Label>
              Booking date
            </Form.Label>
              <Col>
              <Form.Label>From</Form.Label>
              <Form.Control type='date' value={bookingDate.from} onChange={(e) => handleBookingDateChange(e, 'from')}/>
              </Col>
              <Col>
              <Form.Label>To</Form.Label>
              <Form.Control type='date' value={bookingDate.to} onChange={(e) => handleBookingDateChange(e, 'to')}/>
              </Col>
            </Row>

            <Row className='mt-2'>
            <Form.Label>
            Reservation date
            </Form.Label>
              <Col>
              <Form.Label>From</Form.Label>
              <Form.Control type='date' value={reservationDate.from} onChange={(e) => handleReservationDateChange(e, 'from')}/>
              </Col>
              <Col>
              <Form.Label>To</Form.Label>
              <Form.Control type='date' value={reservationDate.to} onChange={(e) => handleReservationDateChange(e, 'to')}/>
              </Col>
            </Row>
            <div className="d-flex gap-2 justify-content-end mt-2">
                  <Button
                    variant="outline-primary"
                    className="border-0 text-danger"
                  >
                    Clear
                  </Button>
                  <Button type="submit" className="apply border-0 text-white" onClick={handleFormSubmit}>
                    Apply
                  </Button>
                </div>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default Filter