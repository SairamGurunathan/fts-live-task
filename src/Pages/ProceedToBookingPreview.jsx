import React, { useContext } from "react";
import { Button, Card, Col, Offcanvas, Row, Table } from "react-bootstrap";
import BookingContext from "../Components/BookingContext";
import { useSelector } from "react-redux";

const ProceedToBookingPreview = ({
  showBookingPreview,
  setShowBookingPreview,
}) => {
  const { bookingData, addPlayerBooking} = useContext(BookingContext);
  const handleClose = () => {
    setShowBookingPreview(false);
  };
  const costByPriceSelector = useSelector((state)=>state?.CostByPriceReducer?.cost)
  return (
    <>
      <Offcanvas
        show={showBookingPreview}
        placement="end"
        backdrop="static"
        style={{ width: "90%" }}
      >
        <Offcanvas.Header className="off-color">
          <Offcanvas.Title>Booking Preview</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col lg={8}>
              <img src="" alt="" />
              <p className="text-center">title</p>
              <div>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <div className="d-flex text-start justify-content-between">
                          <Col lg={4}>
                            <label>Booking Type</label>
                            <p>Player Booking</p>
                          </Col>
                          <Col lg={4}>
                            <label>Facility Type</label>
                            <p>{}</p>
                          </Col>
                          <Col lg={4}>
                            <label>Booking Occurance</label>
                            <p>Player Booking</p>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex text-start justify-content-between">
                          <Col lg={4}>
                            <label>Start date and time</label>
                            <p>Player Booking</p>
                          </Col>
                          <Col lg={4}>
                            <label>End date and time</label>
                            <p>Player Booking</p>
                          </Col>
                          <Col lg={4}>
                            <label>Notes</label>
                            <p>Player Booking</p>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <hr className="w-100" />
                    <Row>
                      <Col>
                        <div className="d-flex text-start justify-content-between">
                          <Col>
                            <h6>Pricing</h6>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Facility</th>
                      <th>Pricing Rule</th>
                      <th>Per hour ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{bookingData.firstName}</td>
                      <td>{bookingData.facilityTitle}</td>
                      <td>{bookingData.pricingRuleTitle}</td>
                      <td>${bookingData.perHourCost}</td>
                    </tr>
                    {addPlayerBooking?.map((player)=>(
                 <tr>
                 <td>{player.firstName}</td>
                 <td>{player.facility} </td>
                 <td>{player.pricingRule}</td>
                 <td>${player.perHourCost}</td>  
               </tr>
              ))}
                    <tr>
                      <td colSpan={3}>Total</td>
                      <td>
                        <Button>${costByPriceSelector}</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                            {/* <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Facility</th>
                                  <th>Pricing Rule</th>
                                  <th>Per hour ($)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{}</td>
                                  <td>{}</td>
                                  <td>{}</td>
                                  <td>${}</td>
                                </tr>
                                <tr>
                                  <td colSpan={3}>Total</td>
                                  <td>
                                    <Button>${}</Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table> */}
                          </Col>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col lg={4}>
              <h1>Mode of Payment</h1>
              <div className="border border-1 p-4">
                <ul className="list-group">
                  <li className="list-group-item my-2 rounded-3 border d-flex justify-content-between flex-row-reverse">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="list-group-label d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <rect
                          width="416"
                          height="320"
                          x="48"
                          y="96"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                          rx="56"
                          ry="56"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="60"
                          d="M48 192h416M128 300h48v20h-48z"
                        />
                      </svg>
                      <b>Card Payment</b>
                    </label>
                  </li>
                  <li className="list-group-item my-2 rounded-3 border d-flex justify-content-between align-items-center flex-row-reverse">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="list-group-label d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90m62-90a6 6 0 0 1-6 6h-56a6 6 0 0 1-6-6V72a6 6 0 0 1 12 0v50h50a6 6 0 0 1 6 6"
                        />
                      </svg>
                      <b>Pay Later</b>
                    </label>
                  </li>
                  <li className="list-group-item my-2 rounded-3 border d-flex justify-content-between align-items-center flex-row-reverse">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="list-group-label d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21.94 7.64v9.3a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5v-7.3h-7.45a.75.75 0 0 1 0-1.5h7.45v-.5a1.5 1.5 0 0 0-1.5-1.5H9.89a.5.5 0 0 1 0-1h9.55a2.5 2.5 0 0 1 2.5 2.5M8.064 14.246h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1"
                        />
                        <path
                          fill="currentColor"
                          d="M18.935 14.248h-.944a.5.5 0 0 1 0-1h.944a.5.5 0 0 1 0 1m-.175 3.802L4.01 3.3c-.46-.46-1.17.25-.71.7l1.14 1.14a2.5 2.5 0 0 0-2.38 2.5v8.72a2.5 2.5 0 0 0 2.5 2.5h13.6L20 20.7c.45.46 1.16-.25.7-.71ZM3.06 7.64a1.5 1.5 0 0 1 1.5-1.5h.88c.66.67 1.33 1.34 2 2H3.06Zm9.49 5.61h-.12a.5.5 0 0 0-.5.5a.508.508 0 0 0 .5.5h1.12l3.61 3.61H4.56a1.5 1.5 0 0 1-1.5-1.5V9.64h5.88Z"
                        />
                      </svg>
                      <b>No Payment</b>
                    </label>
                  </li>
                </ul>
                <div className="mt-3 text-center">
                  <Button>Book now</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Offcanvas.Body>
        <Offcanvas.Header className="off-color">
          <div className="w-100 d-flex justify-content-end align-items-center">
            <Button className="text-end " onClick={handleClose}>
              Back
            </Button>
          </div>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
};

export default ProceedToBookingPreview;