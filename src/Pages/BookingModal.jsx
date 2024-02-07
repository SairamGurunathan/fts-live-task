import React from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";

const BookingModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
        style={{ width: "80%" }}
      >
        <Offcanvas.Header closeButton className="bg-info">
          <Offcanvas.Title>Booking</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row>
              <Col lg={8}>
                <Row>
                  <Col>
                    <label>Booking Type *</label>
                    <Form.Select>
                      <option></option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <label>Facility Type *</label>
                    <Form.Select>
                      <option></option>
                    </Form.Select>
                  </Col>
                </Row>
                <div className="mt-4">
                <label>Booking occurence</label>
                <div className="d-flex gap-2 mt-2">
                  <Form.Check
                    inline
                    label="Single Booking"
                    name="group1"
                    type="radio"
                  />
                  <Form.Check
                    inline
                    label="Multiple Booking"
                    name="group2"
                    type="radio"
                  />
                </div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-4">
                    <div >
                    <label className="mb-2">
                        Start date *
                    </label>
                    <Form.Control type="date"/>
                    </div>
                    <div >
                    <label className="mb-2">
                        End date *
                    </label>
                    <Form.Control type="date"/>
                    </div>
                    <div>
                    <label className="mb-2">
                        Start Time *
                    </label>
                    <Form.Control type="time"/>
                    </div>
                    <div>
                    <label className="mb-2">
                        End Time *
                    </label>
                    <Form.Control type="time"/>
                    </div>
                </div>
                <Button className="mt-4">Check Availability</Button>
                <div className="mt-4">
                    <label>
                        Notes
                    </label>
                    <Form.Control as="textarea" rows={3} placeholder="Leave a comment here."/>
                </div>
              </Col>
              <Col lg={4} className="border border-2 p-3">
                <div>
                    <p>Booking Type</p>
                    <p>Player</p>
                </div>
                <hr className="w-100"/>
                <div>
                    <p>Start date and time</p>
                    <p>End date and time</p>
                </div>
                <hr className="w-100"/>
                <div>
                    <p>Facility Type</p>
                    <p>Basket field</p>
                </div>
                <hr className="w-100"/>
                <p>Player's Facility and Pricing Details</p>
              </Col>
            </Row>
            <div className="mt-4 bg-info" >
            <Button className="float-end">
                Proceed to Book
            </Button>
            </div>
          </Form>
        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
};

export default BookingModal;
