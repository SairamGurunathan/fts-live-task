import { Icon } from "@iconify/react";
import React, { useState } from "react";
import AddImages from "../Assects/Images/addimage.svg";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import DatePickerStart from "../Components/DatePickerStart";
import DatePickerEnd from "../Components/DatePickerEnd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { FacilitiesFormAction } from "../Redux/Actions/FacilitiesFormAction";

const AddSportsFormModel = ({ show, setShow, sportsTitle, isEdit }) => {
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [allchecked, setAllChecked] = useState("");
  const [isPlayer, setIsPlayer] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Enter the Name"),
    playerAllowedMin: Yup.number().required("Enter Minimun Value"),
    playerAllowedMax: Yup.number().required("Enter Maximum Value"),
    durationAllowedMin: Yup.number().required("Enter Minimun Value"),
    durationAllowedMax: Yup.number().required("Enter Maximum Value"),
    advanceBookingMin: Yup.number().required("Enter Minimun Value"),
    advanceBookingMax: Yup.number().required("Enter Maximum Value"),
  });
  const sku = `Add ${sportsTitle?.title}`;
  const centerID = localStorage.getItem("centerId");
  const numberValidation = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  const handlePlayer = (e) => {
    if (e.target.checked) {
      setIsPlayer(true);
    } else {
      setIsPlayer(false);
    }
  };

  const handleAddTime = () => {
    if (!allchecked || !startTime || !endTime) {
      setDisplayErrorMessage(true);
      return;
    }

    const selectedTimeRange = {
      startTime: moment(startTime).format("h:mm a"),
      endTime: moment(endTime).format("h:mm a"),
      days: allchecked,
    };

    setSelectedTimes([...selectedTimes, selectedTimeRange]);
    setStartTime();
    setEndTime();
    setDisplayErrorMessage(false);
  };

  const handleWeekDaysChange = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked?.filter((item) => item !== e.target.value));
    }
  };
  const selectedValuesString = allchecked?.toString();

  const formik = useFormik({
    initialValues: {
      title: "",
      playerAllowedMin: "",
      playerAllowedMax: "",
      durationAllowedMin: "",
      durationAllowedMax: "",
      advanceBookingMin: "",
      advanceBookingMax: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ setSubmitting }) => {
      setAllChecked("");
      setStartTime("");
      setEndTime("");
      formik.resetForm()
      try {
        dispatch(FacilitiesFormAction(payLoad));
        setShow(false)
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  const payLoad = {
    reservationAttribute: {
      advanceBookingMax: formik.values.advanceBookingMax,
      advanceBookingMin: formik.values.advanceBookingMin,
      durationAllowedMax: formik.values.durationAllowedMax,
      durationAllowedMin: formik.values.durationAllowedMin,
      playerAllowedMax: formik.values.playerAllowedMax,
      playerAllowedMin: formik.values.playerAllowedMin,
    },
    title: formik.values.title,
    displayName : isPlayer,
    defaultPlayDuration: "30",
    sku: sku,
    createdBy : userID,
    photos : null,
    description: "center courts facility",
    workingPlans: {
      sunday: 0,
      monday: 1,
      tuesday: 1,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 1,
      startTime: startTime,
      endTime: endTime,
    },
    center: {
      id: centerID,
    },
    sport: {
      id: sportsTitle?.sport?.id,
    },
    facilityHours: [
      {
        weekday: selectedValuesString,
        startTime: startTime,
        endTime: endTime,
        createdAt: moment().utc(),
        updatedAt: moment().utc(),
      },
    ],
    createdAt: moment().utc(),
    updatedAt: moment().utc(),
    updatedBy: userID,
    video: null,
    facilityMetas: [
      {
        value: formik.values.features,
      },
    ],
  };
console.log(sportsTitle);
  console.log(payLoad, "payload");
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? <small className="m-0">Edit
            </small> : <small className="m-0">
              Add {sportsTitle?.title}</small>
              }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Form onSubmit={formik.handleSubmit}>
            <div className="p-3">
              <Form.Label className="m-0 fw-bold">Name</Form.Label>
              <hr className="w-100 opacity-25" />
              <Form.Group className="d-flex flex-row align-items-center gap-4">
                <div className="col-6">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                </div>
                <div className="col-6 d-flex ">
                  <Form.Check type="checkbox" onChange={handlePlayer} />
                  <Form.Label className="ms-2">
                    Open to Athlitik users
                  </Form.Label>
                </div>
              </Form.Group>
              {formik.errors.title && (
                <p className="error text-danger m-1 fw-medium">
                  {formik.errors.title}
                </p>
              )}

              <Form.Label className="m-0 fw-bold mt-3">Timings</Form.Label>
              <hr className="w-100 opacity-25" />
              <Row>
                <Col lg={6}>
                  <div className="d-flex flex-row gap-2 mt-2 ">
                    {allDays?.map((day, index) => (
                      <div className="d-flex flex-row gap-2" key={index}>
                        <Form.Check
                          onChange={handleWeekDaysChange}
                          type="checkbox"
                          value={day}
                          checked={allchecked?.includes(day)}
                        />
                        <Form.Label>{day}</Form.Label>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="d-flex align-items-center ps-3">
                    <DatePickerStart
                      startTime={startTime}
                      setStartTime={setStartTime}
                    />
                    <div className="arrow-select1">
                      <Icon icon="fe:arrow-down" />
                    </div>

                    <DatePickerEnd endTime={endTime} setEndTime={setEndTime} />
                    <div className="arrow-select1">
                      <Icon icon="fe:arrow-down" />
                    </div>

                    <div
                      className="d-flex flex-nowrap align-items-center cursor-pointer"
                      onClick={handleAddTime}
                    >
                      <Icon icon="gridicons:add" color="#2d77d2" />
                      <small className="text-primary fs-6">Add</small>
                    </div>
                  </div>
                </Col>
              </Row>
              {displayErrorMessage ? (
                <div className="text-danger mt-2">
                  Please Enter All The Details In Business Hours.
                </div>
              ) : (
                selectedTimes.map((timeRange, index) => (
                  <div key={index} className="text-muted mt-2">
                    {timeRange.days.join(", ")}: {timeRange.startTime} -{" "}
                    {timeRange.endTime}
                  </div>
                ))
              )}

              <Form.Label className="m-0 fw-bold mt-3">
                Reservation attributes
              </Form.Label>
              <hr className="w-100 opacity-25" />
              <Row className="mb-2 d-flex ">
                <Col lg={4}>
                  <p className="m-0 text-muted">Players allowed</p>
                </Col>
                <Col lg={3}>
                  <Form.Control
                    type="string"
                    placeholder="Min"
                    name="playerAllowedMin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.playerAllowedMin}
                    onKeyPress={(e) => {
                      numberValidation(e);
                    }}
                  />
                  {formik.errors.playerAllowedMin && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.playerAllowedMin}
                    </p>
                  )}
                </Col>
                <Col lg={3}>
                  <Form.Control
                    type="string"
                    placeholder="Max"
                    name="playerAllowedMax"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.playerAllowedMax}
                    onKeyPress={(e) => {
                      numberValidation(e);
                    }}
                  />
                  {formik.errors.playerAllowedMax && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.playerAllowedMax}
                    </p>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 d-flex ">
                <Col lg={4}>
                  <p className="m-0 text-muted">Duration allowed (hours)</p>
                </Col>
                <Col lg={3}>
                  <Form.Control
                    type="string"
                    placeholder="Min"
                    name="durationAllowedMin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.durationAllowedMin}
                    onKeyPress={(e) => {
                      numberValidation(e);
                    }}
                  />
                  {formik.errors.durationAllowedMin && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.durationAllowedMin}
                    </p>
                  )}
                </Col>
                <Col lg={3}>
                  <Form.Control
                    type="string"
                    placeholder="Max"
                    name="durationAllowedMax"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.durationAllowedMax}
                    onKeyPress={(e) => {
                      numberValidation(e);
                    }}
                  />
                  {formik.errors.durationAllowedMax && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.durationAllowedMax}
                    </p>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 d-flex ">
                <Col lg={4}>
                  <p className="m-0 text-muted">
                    Advance booking window (hours)
                  </p>
                </Col>
                <Col lg={3}>
                  <Form.Control
                    type="string"
                    placeholder="Min"
                    name="advanceBookingMin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.advanceBookingMin}
                    onKeyPress={(e) => {
                      numberValidation(e);
                    }}
                  />
                  {formik.errors.advanceBookingMin && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.advanceBookingMin}
                    </p>
                  )}
                </Col>
                <Col lg={3}>
                  <Form.Control
                    type="string"
                    placeholder="Max"
                    name="advanceBookingMax"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.advanceBookingMax}
                    onKeyPress={(e) => {
                      numberValidation(e);
                    }}
                  />
                  {formik.errors.advanceBookingMax && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.advanceBookingMax}
                    </p>
                  )}
                </Col>
              </Row>
              <Form.Label className="m-0 fw-bold mt-3">
                Court highlights
              </Form.Label>
              <hr className="w-100 opacity-25" />
              <Form.Label className="text-muted">
                <small className="m-0">Features</small>
              </Form.Label>
              <Row className="d-flex flex-row align-items-center">
                <Col lg={6}>
                  <Form.Control
                    type="text"
                    name="features"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.features}
                  />
                </Col>
                <Col lg={6}>
                  <div className="d-flex flex-nowrap align-items-center cursor-pointer">
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small className="text-primary fs-6">Add</small>
                  </div>
                </Col>
              </Row>
              <Form.Label>
                <small className="m-0 text-muted">Images</small>
              </Form.Label>
              <div>
                <label for="file-input">
                  <img
                    src={AddImages}
                    alt="add"
                    className="border border-2 rounded-3 add-image"
                  />
                </label>

                <input id="file-input" type="file" size="60" />
              </div>
            </div>
            <div className="d-flex gap-1 justify-content-end bg-white p-2">
              <Button
                variant="outline-light"
                className="border-0 text-danger"
                onClick={handleClose}
              >
                Cancel
              </Button>
              {isEdit ? <Button type="submit" className="btn-danger text-white">
                Update
              </Button> : <Button type="submit" className="btn-danger text-white">
                Save
              </Button>}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddSportsFormModel;
