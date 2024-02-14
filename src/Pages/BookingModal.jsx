import React, { useEffect, useState } from "react";
import { Button, Col, Form, Offcanvas, Row, Table } from "react-bootstrap";
import { SportsList } from "../Redux/Actions/SportsPhotosAction";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment/moment";
import CheckAvailability from "./CheckAvailability";

const BookingModal = ({
  show,
  setShow,
  selectFacilityType,
  sportsListSelector,
  handleFacilityType,
}) => {
  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const [bookingType, setBookingType] = useState("Player");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingCheck, setBookingCheck] = useState("single");
  const handleBookingType = (event) => {
    setBookingType(event.target.value);
  };
  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;
    setStartDate(selectedStartDate);
    setEndDate(selectedStartDate);
  };
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const onChangeValue = (event) => {
    setBookingCheck(event.target.value);
  };
  const handleCheckAvailability = () => {};

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${period}`;
  };
  useEffect(() => {
    if (sportsListSelector !== undefined) {
      dispatch(SportsList(sportsListSelector));
    }
    // eslint-disable-next-line
  }, [sportsListSelector]);
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

                    <Form.Select
                      value={bookingType}
                      name="bookingType"
                      onChange={(event) => handleBookingType(event)}
                    >
                      <option>Player</option>
                      <option>Coach</option>
                      <option>Admin</option>
                      <option>Maintanace</option>
                      <option>Tournament</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <label>Facility Type *</label>
                    <Form.Select
                      value={selectFacilityType}
                      name="facilityType"
                      onChange={(event) => handleFacilityType(event)}
                    >
                      {sportsListSelector?.data?.map((type, index) => (
                        <option key={index}>{type?.title}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <div className="mt-4">
                  <label>Booking occurence</label>
                  <div className="d-flex flex-row ">
                    <div class="form-check p-0">
                      <input
                        type="radio"
                        name="bookingCheck"
                        value="single"
                        defaultChecked
                        onChange={onChangeValue}
                        checked={bookingCheck === "single"}
                      />
                      <label className="ps-2">Single Booking</label>
                    </div>
                    <div class="form-check">
                      <input
                        type="radio"
                        name="bookingCheck"
                        value="multiple"
                        onChange={onChangeValue}
                        checked={bookingCheck === "multiple"}
                      />
                      <label className="ps-2">Multiple Booking</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-4">
                  <div>
                    <label className="mb-2">Start date *</label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(event) => handleStartDateChange(event)}
                    />
                  </div>
                  <div>
                    <label className="mb-2">End date *</label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="mb-2">Start Time *</label>
                    <Form.Control
                      type="time"
                      value={startTime}
                      onChange={(event) => handleStartTimeChange(event)}
                    />
                  </div>
                  <div>
                    <label className="mb-2">End Time *</label>
                    <Form.Control
                      type="time"
                      value={endTime}
                      onChange={(event) => handleEndTimeChange(event)}
                    />
                  </div>
                </div>
                <Button className="mt-4" onClick={handleCheckAvailability}>
                  Check Availability
                </Button>
                <CheckAvailability />
                <div className="mt-4">
                  <label>Notes</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Leave a comment here."
                  />
                </div>
              </Col>

              <Col lg={4} className="border border-2 p-3">
                <div>
                  <p>Booking Type</p>
                  <p>{bookingType}</p>
                </div>
                <hr className="w-100" />
                <div>
                  <p>Start date and time</p>
                  {startDate && startTime && (
                    <p>
                      {moment(startDate).format("LL")} {formatTime(startTime)}
                    </p>
                  )}
                  <p>End date and time</p>
                  {endDate && endTime && (
                    <p>
                      {moment(endDate).format("LL")} {formatTime(endTime)}
                    </p>
                  )}
                </div>
                <hr className="w-100" />
                <div>
                  <p>Facility Type</p>
                  <p>
                    {selectFacilityType ? selectFacilityType : "Tennis court"}
                  </p>
                </div>
                <hr className="w-100" />
                <p>Player's Facility and Pricing Details</p>
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
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>$121</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Total</td>
                      <td>
                        <Button>$1792</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <div className="mt-4 bg-info">
              <Button className="float-end">Proceed to Book</Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BookingModal;
