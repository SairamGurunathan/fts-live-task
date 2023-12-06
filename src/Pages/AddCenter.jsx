import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { fetchCenter } from "../Redux/Actions/AddcenterAction";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { TimeZone } from "../Redux/Actions/TimeZoneAction";
import moment from "moment";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { useNavigate } from "react-router-dom";
import AddBannerImage from "./AddBannerImage";
import AddImage from "./AddImage";
import DatePickerStart from "../Components/DatePickerStart";
import DatePickerEnd from "../Components/DatePickerEnd";

const AddCenter = () => {
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allchecked, setAllChecked] = useState("");
  const [isPlayer, setIsPlayer] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  
  const timezoneSelector = useSelector(
    (state) => state?.AccountReducer?.timezone
  );
  const accountSelector = useSelector(
    (state) => state?.AccountReducer?.account
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    streetAddress: Yup.string().required("Street is required"),
    suite: Yup.string(),
    city: Yup.string().required("City is required"),
    stateProvince: Yup.string().required("State is required"),
    zipCode: Yup.number().required("Zip is required"),
    phoneNumber: Yup.string()
      .max(10, "Max 10 digit")
      .required("Phone Number is required"),
    // .matches( /^\d{3}-\d{3}-\d{4}$/),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const dispatch = useDispatch();

  const numberValidation = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      streetAddress: "",
      suite: "",
      city: "",
      stateProvince: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values,{ setSubmitting }) => {
      setAllChecked("");
      try {
        const payload = {
    displayName: isPlayer,
    ...values,
    organization: { id: accountSelector?.data?.orgId },
    centerHours: [
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
    centerusers: [
      {
        user: {
          id: accountSelector?.data?.id,
        },
      },
    ],
    timezone: {
      id: selectedTimeZone,
    },
  };

        dispatch(fetchCenter(payload,formData));
        
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

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

  const handleTimeZone = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const handlePlayer = (e) => {
    if (e.target.checked) {
      setIsPlayer(true);
    } else {
      setIsPlayer(false);
    }
  };

  const handleWeekDaysChange = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked?.filter((item) => item !== e.target.value));
    }
  };
  const selectedValuesString = allchecked?.toString();

  

    const formData = new FormData()

    formData.append('centerId',accountSelector?.data?.centerId)
    formData.append('userId',accountSelector?.data?.id)
    formData.append('file_0',selectedFiles)
    formData.append('tags_0',"banner")


  useEffect(() => {
    dispatch(TimeZone());
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container-fluid overflow-auto">
        <Row className="mt-4">
          <Col lg={10}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-16">
                <li
                  className="breadcrumb-item text-muted cursor-pointer"
                  onClick={() => navigate("/center")}
                >
                  Centers
                </li>
                <li className="breadcrumb-item active text-dark fw-bold">
                  Add Center
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
        <hr className="mt-1 w-100 opacity-25" />

        <Card className="">
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <Form.Group>
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                      type="text"
                     
                      name="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />

                    {formik.errors.title && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.title}
                      </p>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex gap-2 mt-2">
                <Form.Check type="checkbox" onChange={handlePlayer} />
                <Form.Label>Display this name to Athlitik users</Form.Label>
              </div>
              <div className="mt-3">
                <strong>Address & timings</strong>
                <hr className="w-100 opacity-25" />
                <div className="d-flex row">
                  <div className="col-lg-4">
                    <Form.Group>
                      <Form.Label className="labels">Street*</Form.Label>
                      <Form.Control
                        
                        type="text"
                        name="streetAddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.streetAddress}
                      />
                      {formik.errors.streetAddress && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.streetAddress}
                        </p>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-lg-1">
                    <Form.Group>
                      <Form.Label className="labels">Suite</Form.Label>
                      <Form.Control
                        type="text"
                        name="suite"
                        onChange={formik.handleChange}
                        value={formik.values.suite}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-2">
                    <Form.Group>
                      <Form.Label className="labels">City*</Form.Label>
                      <Form.Control
                        
                        type="text"
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                      />
                      {formik.errors.city && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.city}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-lg-2">
                    <Form.Group>
                      <Form.Label className="labels">State*</Form.Label>
                      <Form.Control
                      
                        type="text"
                        name="stateProvince"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.stateProvince}
                      />
                      {formik.errors.stateProvince && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.stateProvince}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-lg-2">
                    <Form.Group>
                      <Form.Label className="labels">Zip*</Form.Label>
                      <Form.Control
                      
                        type="number"
                        name="zipCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zipCode}
                      />
                      {formik.errors.zipCode && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.zipCode}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="d-flex row mt-2">
                  <div className="flex-column col-lg-4">
                    <Form.Group>
                      <Form.Label className="labels">Phone number*</Form.Label>
                      <Form.Control
                      
                        type="text"
                        maxLength={10}
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        onKeyPress={(e) => {
                          numberValidation(e);
                        }}
                      />
                      {formik.errors.phoneNumber && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.phoneNumber}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="flex-column col-lg-4">
                    <Form.Group>
                      <Form.Label className="labels">Email*</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.errors.email && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.email}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-4">
                    <Form.Group>
                      <Form.Label className="labels">Time Zone*</Form.Label>
                      <Form.Select
                        value={selectedTimeZone}
                        onChange={(event) => handleTimeZone(event)}
                      >
                        <option>Select the TimeZone</option>
                        {timezoneSelector?.map((timeZone, index) => (
                          <option key={index} value={timeZone?.id}>
                            {timeZone?.displayName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
                <div className="mt-2">
                  <Form.Label className="labels">Business hours*</Form.Label>
                  <div className="d-flex flex-row gap-2">
                    {allDays?.map((day, index) => (
                      <div className="d-flex gap-2" key={index}>
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
                </div>

                <div className="d-flex align-items-baseline mt-2">
                  <DatePickerStart startTime = {startTime} setStartTime = {setStartTime}/>
                  <div className="arrow-select-center">
                    <Icon icon="fe:arrow-down" />
                  </div>

                  <DatePickerEnd endTime = {endTime} setEndTime = {setEndTime}/>
                  <div className="arrow-select-center">
                    <Icon icon="fe:arrow-down" />
                  </div>
                  <div className="cursor-pointer" onClick={handleAddTime}>
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small className="text-primary fs-6">Add</small>
                  </div>
                </div>
                {displayErrorMessage ? (
                  <div className="text-danger mt-2">
                    Please Enter All The Details In Business Hours.
                  </div>
                ) : (
                  selectedTimes.map((timeRange, index) => (
                    <div key={index} className="text-muted mt-2">
                      {timeRange.days.join(", ")}: {timeRange.startTime} - {" "}
                      {timeRange.endTime}
                    </div>
                  ))
                )}

                <div className="mt-3">
                  <strong>Upload images</strong>
                  <hr className=" w-100 opacity-25" />
                  <div className="row">
                    <div className="col-lg-3 col-md-6 ">
                      <AddBannerImage setSelectedFiles={setSelectedFiles}/>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <AddImage />
                    </div>
                  </div>
                </div>
                
                <hr className="w-100 opacity-25" />
                <div className="d-flex gap-2 justify-content-end">
                  <Button
                    variant="outline-light"
                    className="border-0 text-danger"
                    onClick={() => navigate("/center")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-danger text-white">
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AddCenter;