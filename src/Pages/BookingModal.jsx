import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Offcanvas, Row, Table } from "react-bootstrap";
import { SportsList } from "../Redux/Actions/SportsPhotosAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import CheckAvailability from "./CheckAvailability";
import { CheckAvailabilityAction } from "../Redux/Actions/CheckAvailabilityAction";
import "bootstrap/dist/css/bootstrap.min.css";
import { ResetAction } from "../Redux/Actions/ResetAction";
import BookingContext from "../Components/BookingContext";

const BookingModal = ({ show, setShow, sportsListSelector }) => {
  const { bookingData, costValue } = useContext(BookingContext);
  const dispatch = useDispatch();

  const [selectFacility, setSelectFacility] = useState({
    id:"1",
    title:"Tennis Court"
  })
  const [bookingType, setBookingType] = useState("Player");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingCheck, setBookingCheck] = useState("single");
  const [isMultiple, setIsMultiple] = useState(false);
  const [day, setDay] = useState("");
  const [isCheckAvailability, setIsCheckAvailability] = useState(false)
  const [isPricingTable, setIsPricingTable] = useState(false)
  const [errormsg,setErrormsg] = useState('')

  const handleClose = () => {
    setShow(false);
    dispatch(ResetAction());
  };
  
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
  const onChangeValueSingle = (event) => {
    setBookingCheck(event.target.value);
    setIsMultiple(false);
    setDay("");
  };
  const onChangeValueMultiple = (event) => {
    setBookingCheck(event.target.value);
    setIsMultiple(true);
    setDay("");
  };
  const handleFacilityType1 = (event) => {
    setSelectFacility({id:event.target.value,title:event.target.selectedOptions[0].label});
  };
  const handleCheckAvailability = async () => {
    
    const startDateTime =
      moment(`${startDate} ${startTime}`).toISOString().slice(0, -5) + "Z";
    const endDateTime =
      moment(`${endDate} ${endTime}`).toISOString().slice(0, -5) + "Z";
      const response = await dispatch(
        CheckAvailabilityAction(
          selectFacility?.id,
          startDateTime,
          endDateTime,
          isMultiple,
          day
        )
      );
      try {
        if (response?.status === 400) {
          setIsCheckAvailability(false);
          setErrormsg(response?.data?.message); 
        } else {
          setIsCheckAvailability(true);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${period}`;
  };
  const costByPriceSelector = useSelector((state)=>state?.CostByPriceReducer?.cost)

  useEffect(() => {
    dispatch(SportsList());
    // eslint-disable-next-line
  }, []);

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
          {/* <Form> */}
            <Row>
              <Col lg={8}>
                <Row>
                  <Col>
                    <label className="labels">Booking Type *</label>
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
                    <label className="labels" >Facility Type *</label>
                    <Form.Select
                      value={selectFacility.id}
                      name="facilityType"
                      onChange={(event) => handleFacilityType1(event)}
                    >
                      {sportsListSelector?.data?.map((type, index) => (
                        <option key={index} value={type?.sport?.id} label={type?.title}>
                          {type?.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <div className="mt-4">
                  <label className="labels">Booking occurence</label>
                  <div className="d-flex flex-row">
                    <div class="form-check p-0 d-flex align-items-center">
                      <input
                        type="radio"
                        name="bookingCheck"
                        value="single"
                        defaultChecked
                        onChange={onChangeValueSingle}
                        checked={bookingCheck === "single"}
                      />
                      <label className=" ps-2"><small>Single Booking</small></label>
                    </div>
                    <div class="form-check d-flex align-items-center">
                      <input
                        type="radio"
                        name="bookingCheck"
                        value="multiple"
                        onChange={onChangeValueMultiple}
                        checked={bookingCheck === "multiple"}
                      />
                      <label className="ps-2"><small>Multiple Booking</small></label>
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
                    <label className="labels mb-2">End date *</label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="labels mb-2">Start Time *</label>
                    <Form.Control
                      type="time"
                      value={startTime}
                      onChange={(event) => handleStartTimeChange(event)}
                    />
                  </div>
                  <div>
                    <label className="labels mb-2">End Time *</label>
                    <Form.Control
                      type="time"
                      value={endTime}
                      onChange={(event) => handleEndTimeChange(event)}
                    />
                  </div>
                </div>
                <Button
                  className="mt-4"
                  onClick={() => handleCheckAvailability()}
                  disabled={!startDate || !startTime || !endDate || !endTime}
                > 
                  Check Availability
                </Button>
               <p className="error text-danger m-1 fw-medium">{errormsg}</p>
                {isCheckAvailability ? (
              <CheckAvailability setIsPricingTable={setIsPricingTable} startDate={startDate} startTime={startTime} endDate={endDate} endTime={endTime} isMultiple={isMultiple}
              day={day}/>
            ) : null}
                <div className="mt-4">
                  <label className="labels">Notes</label>
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
                  <p className="fw-bold">{bookingType}</p>
                </div>
                <hr className="w-100" />
                <div>
                  <p>Start date and time</p>
                  {startDate && startTime && (
                    <p className="fw-bold">
                      {moment(startDate).format("LL")} {formatTime(startTime)}
                    </p>
                  )}
                  <p>End date and time</p>
                  {endDate && endTime && (
                    <p className="fw-bold">
                      {moment(endDate).format("LL")} {formatTime(endTime)}
                    </p>
                  )}
                </div>
                <hr className="w-100" />
                <div>
                  <p>Facility Type</p>
                  <p className="fw-bold">{selectFacility?.title}</p>
                </div>
                <hr className="w-100" />
                <p className="fw-bold">Player's Facility and Pricing Details</p>
                {isPricingTable ? <Table striped bordered hover>
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
                      <td>${costValue}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Total</td>
                      <td>
                        <Button>${costByPriceSelector}</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table> : null}
                
              </Col>
            </Row>
            <div className="mt-4 bg-info">
              <Button className="float-end" disabled>Proceed to Book</Button>
            </div>
          {/* </Form> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BookingModal;
