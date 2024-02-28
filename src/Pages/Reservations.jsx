import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BigCalander from "../Components/BigCalander";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment-timezone";

import {
  FacilityAllListAction,
  FacilityListAction,
} from "../Redux/Actions/FacilityListAction";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { SportsList } from "../Redux/Actions/SportsPhotosAction";
import BookingModal from "./BookingModal";
import { ReservationSearch } from "../Redux/Actions/ReservationSearch";

const Reservations = () => {
  const [selectFacilityType, setSelectFacilityType] = useState([]);
  const [selectFacilityListType, setSelectFacilityListType] = useState('');
  const [show, setShow] = useState(false);
  const [searchDate, setSearchDate] = useState(moment().format("YYYY-MM-DD"));
  const dispatch = useDispatch();

  const handleFacilityType = (event) => {
    setSelectFacilityType(event.target.value);
    dispatch(FacilityListAction(event.target.value));
    dispatch(FacilityAllListAction(event.target.value));
  };

  const handleFacilityListType = (event) => {
    setSelectFacilityListType(event.target.value);
  };

  const sportsListSelector = useSelector(
    (state) => state?.SportsListReducer?.sportsList
  );

  const facilityListSelector = useSelector(
    (state) => state?.FacilityListReducer?.facilityList
  );

  const reservationSelector = useSelector(
    (state) => state?.ResevationSearchReducer?.search?.data
  );
  const myEvent = reservationSelector?.events.map((event) => {
    return {
      ...event,
      title: event?.reservation?.title,
      start: (event?.reservation?.start),
      end: (event?.reservation?.end),
      default: 'allDay'
    };
  });


  const facilityAllCourts = useSelector(
    (state) => state?.FacilityAllListReducer?.facilityAllList
  );

  const handleBookingModal = () => {
    setShow(true);
  };

  const handledDate = (event) => {
    setSearchDate(event.target.value);
  };

  const handleSearch = () => {
    const currentDate = moment.tz(searchDate, "America/Denver");
    const searchFormatStart =
      currentDate.utc().toISOString().slice(0, -5) + "Z";

    const nextDate = moment
      .tz(searchDate, "America/Denver")
      .add(1, "day")
      .subtract(1, "seconds");
    const searchFormatend = nextDate.utc().toISOString().slice(0, -5) + "Z";

    const selectedId = selectFacilityListType;
    dispatch(ReservationSearch(searchFormatStart, searchFormatend, selectedId));
  };

  useEffect(() => {
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, [AccountAction]);

  useEffect(() => {

        dispatch(SportsList());
         dispatch(FacilityListAction(1));
         dispatch(FacilityAllListAction(1));
  
        const currentDate = moment.tz(searchDate, "America/Denver");
        const searchFormatStart =
          currentDate.utc().toISOString().slice(0, -5) + "Z";
        const nextDate = moment
          .tz(searchDate, "America/Denver")
          .add(1, "day")
          .subtract(1, "seconds");
        const searchFormatend = nextDate.utc().toISOString().slice(0, -5) + "Z";
          dispatch(ReservationSearch(searchFormatStart, searchFormatend, facilityAllCourts))
    // eslint-disable-next-line
  }, []);
  

  return (
    <>
      <div className="container-fluid overflow-auto ">
        <Card className="rounded-2 border-0 mt-1">
          <Row className="py-3">
            <Col lg={10}>
              <div className="d-flex align-items-center mx-3">
                <div className="me-3">
                  <Icon
                    icon="ic:baseline-crop-square"
                    style={{ color: "#f96d23", background: "#f96d23" }}
                  />
                  <small className="ms-2">Player/Not Paid</small>
                </div>
                <div className="mx-3">
                  <Icon
                    icon="ic:baseline-crop-square"
                    style={{ color: "#ffd11a", background: "#ffd11a" }}
                  />
                  <small className="ms-2">Coach</small>
                </div>
                <div className="mx-3">
                  <Icon
                    icon="ic:baseline-crop-square"
                    style={{ color: "#5d3891", background: "#5d3891" }}
                  />
                  <small className="ms-2">Admin</small>
                </div>
                <div className="mx-3">
                  <Icon
                    icon="ic:baseline-crop-square"
                    style={{ color: "#6c757d", background: "#6c757d" }}
                  />
                  <small className="ms-2">Maintanace</small>
                </div>
                <div className="mx-3">
                  <Icon
                    icon="ic:baseline-crop-square"
                    style={{ color: "#319ff5", background: "#319ff5" }}
                  />
                  <small className="ms-2">Tournament</small>
                </div>
                <div className="mx-3">
                  <Icon
                    icon="ic:baseline-crop-square"
                    style={{ color: "#0f9d58", background: "#0f9d58" }}
                  />
                  <small className="ms-2">Player/Paid</small>
                </div>
              </div>
            </Col>
            <Col lg={2}>
              <label className="fw-bold">Booking schedules</label>
            </Col>
          </Row>
          <hr className="w-100" />
          <div className="mx-3 my-4">
            <div className="d-flex justify-content-between gap-3 mb-5">
              <div className="flex-grow-1">
                <label className="mb-3">Facility type *</label>
                <Form.Select
                  value={selectFacilityType}
                  name="facilityType"
                  onChange={(event) => handleFacilityType(event)}
                >
                  {sportsListSelector?.data?.map((type, index) => (
                    <option key={index} value={type?.sport?.id}>
                      {type?.title}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="flex-grow-1">
                <label className="mb-3">Facilities *</label>
                <Form.Select
                  value={selectFacilityListType}
                  name="facilityList"
                  onChange={(event) => handleFacilityListType(event)}
                >
                  {Object.values(facilityListSelector)?.length > 0 ? (
                    <>
                      <option value={facilityAllCourts}>All Courts</option>
                      {Object.values(facilityListSelector)?.map((facility) =>
                        facility?.map((list) => (
                          <option value={list?.id}>{list?.name}</option>
                        ))
                      )}
                    </>
                  ) : (
                    <option disabled></option>
                  )}
                </Form.Select>
              </div>
              <div className="me-3">
                <label className="mb-3">Date</label>
                <input
                  type="date"
                  class="form-control"
                  value={searchDate}
                  onChange={(event) => handledDate(event)}
                  style={{ width: "200px" }}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between booking-btn gap-3">
                <Button
                  className="btn-secondary text-white align-items-center"
                  onClick={handleSearch}
                >
                  <Icon icon="material-symbols:search" className="fs-6" />
                  Search
                </Button>
                <Button
                  className="btn-danger text-white"
                  onClick={handleBookingModal}
                >
                  Add a booking
                </Button>
              </div>
            </div>
            <hr className="w-100" />
            <BigCalander myEvent={myEvent} searchDate={searchDate} reservationSelector={reservationSelector}/>
          </div>
        </Card>
      </div>
      <Button className="me-5 my-4 float-end">Cancel</Button>
      
      <BookingModal
        show={show}
        setShow={setShow}
        handleFacilityType={handleFacilityType}
        setSelectFacilityType={setSelectFacilityType}
        sportsListSelector={sportsListSelector}
        selectFacilityType={selectFacilityType}
      />
    </>
  );
};

export default Reservations;
