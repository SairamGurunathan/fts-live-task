import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const Filter = ({showFilter, setShowFilter}) => {
    const handleClose = () => setShowFilter(false);
  return (
    <>
    <Modal
    show={showFilter}
    onHide={handleClose}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="my-modal">
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
                <Form.Control/>
                </Col>
            </Row>
                    
            <Row className='mt-3'>
            <Form.Label>
              Booking date
            </Form.Label>
              <Col>
              <Form.Label>From</Form.Label>
              <Form.Control type='date' />
              </Col>
              <Col>
              <Form.Label>To</Form.Label>
              <Form.Control type='date' />
              </Col>
            </Row>

            <Row className='mt-2'>
            <Form.Label>
            Reservation date
            </Form.Label>
              <Col>
              <Form.Label>From</Form.Label>
              <Form.Control type='date' />
              </Col>
              <Col>
              <Form.Label>To</Form.Label>
              <Form.Control type='date' />
              </Col>
            </Row>
            <div className="d-flex gap-2 justify-content-end mt-2">
                  <Button
                    variant="outline-primary"
                    className="border-0 text-danger"
                    // onClick={() => navigate("/center")}
                  >
                    Clear
                  </Button>
                  <Button type="submit" className="apply border-0 text-white">
                    Apply
                  </Button>
                </div>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default Filter