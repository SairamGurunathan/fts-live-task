import React, { useEffect, useState } from "react";
import AddBanner from "../Assects/Images/addbanner.svg";
import AddImages from "../Assects/Images/addimage.svg";
import "react-datepicker/dist/react-datepicker.css";

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { fetchCenter } from "../Redux/Actions/AddcenterAction";
import DatePicker from "react-datepicker";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { TimeZone } from "../Redux/Actions/TimeZoneAction";
import moment from "moment";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { useNavigate } from "react-router-dom";

const AddCenter = () => {
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate()
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [allchecked, setAllChecked] = useState("");
  const [isPlayer, setIsPlayer] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

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
    phoneNumber: Yup.number().required("Phone Number is required"),
    // phoneNumber: Yup.string()
    // .required("Phone Number is required")
    // .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the '123-456-7890' format"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const dispatch = useDispatch();

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
    onSubmit: async ({ setSubmitting }) => {
      try {
        dispatch(fetchCenter(payload));
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
    setStartTime(null);
    setEndTime(null);
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

  const payload = {
    displayName: isPlayer,
    ...formik.values,
    organization: { id: accountSelector?.orgId },
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
          id: accountSelector?.id,
        },
      },
    ],
    timezone: {
      id: selectedTimeZone,
    },
  };

  useEffect(() => {
    dispatch(TimeZone());
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <div className="container mx-3"> */}
        <Row className="mt-4">
          <Col lg={12} md={12} sm={12}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-16">
                <li className="breadcrumb-item text-muted ms-2">Centers</li>
                <li className="breadcrumb-item active text-dark fw-bold">
                  Add Center
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
        <hr className="mt-1 w-100 opacity-25" />
      {/* </div> */}
      <Card className="mx-3">
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <FormGroup>
                  <FormLabel>Name*</FormLabel>
                  <FormControl
                    type="text"
                    required
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />

                  {formik.touched.title && formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.title}
                    </p>
                  )}
                </FormGroup>
              </div>
            </div>

            <div className="d-flex gap-2 mt-2">
              <FormCheck type="checkbox" onChange={handlePlayer} />
              <FormLabel>Display this name to Athlitik users</FormLabel>
            </div>
            <div className="mt-3">
              <strong>Address & timings</strong>
              <hr className="w-100 opacity-25" />
              <div className="d-flex row">
                <div className="col-lg-4">
                  <FormGroup>
                    <FormLabel className="labels">Street*</FormLabel>
                    <FormControl
                      required
                      type="text"
                      name="streetAddress"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.streetAddress}
                    />
                    {formik.touched.streetAddress &&
                      formik.errors.streetAddress && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.streetAddress}
                        </p>
                      )}
                  </FormGroup>
                </div>

                <div className="col-lg-1">
                  <FormGroup>
                    <FormLabel className="labels">Suite</FormLabel>
                    <FormControl
                      type="text"
                      name="suite"
                      onChange={formik.handleChange}
                      value={formik.values.suite}
                    />
                  </FormGroup>
                </div>
                <div className="col-lg-2">
                  <FormGroup>
                    <FormLabel className="labels">City*</FormLabel>
                    <FormControl
                      required
                      type="text"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.city}
                      </p>
                    )}
                  </FormGroup>
                </div>
                <div className="col-lg-2">
                  <FormGroup>
                    <FormLabel className="labels">State*</FormLabel>
                    <FormControl
                      required
                      type="text"
                      name="stateProvince"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stateProvince}
                    />
                    {formik.touched.stateProvince &&
                      formik.errors.stateProvince && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.stateProvince}
                        </p>
                      )}
                  </FormGroup>
                </div>
                <div className="col-lg-2">
                  <FormGroup>
                    <FormLabel className="labels">Zip*</FormLabel>
                    <FormControl
                      required
                      type="number"
                      name="zipCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.zipCode}
                    />
                    {formik.touched.zipCode && formik.errors.zipCode && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.zipCode}
                      </p>
                    )}
                  </FormGroup>
                </div>
              </div>
              <div className="d-flex row mt-2">
                <div className="flex-column col-lg-4">
                  <FormGroup>
                    <FormLabel className="labels">Phone number*</FormLabel>
                    <FormControl
                      required
                      type="number"
                      name="phoneNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.errors.phoneNumber}
                        </p>
                      )}
                  </FormGroup>
                </div>
                <div className="flex-column col-lg-4">
                  <FormGroup>
                    <FormLabel className="labels">Email*</FormLabel>
                    <FormControl
                      required
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.email}
                      </p>
                    )}
                  </FormGroup>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-4">
                  <FormGroup>
                    <FormLabel className="labels">Time Zone*</FormLabel>
                    <FormSelect
                      value={selectedTimeZone}
                      onChange={(event) => handleTimeZone(event)}
                    >
                      <option>Select the TimeZone</option>
                      {timezoneSelector?.map((timeZone, index) => (
                        <option key={index} value={timeZone?.id}>
                          {timeZone?.displayName}
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>
                </div>
              </div>
              <div className="mt-2">
                <FormLabel className="labels">Business hours*</FormLabel>
                <div className="d-flex flex-row gap-2">
                  {allDays?.map((day, index) => (
                    <div className="d-flex gap-2" key={index}>
                      <FormCheck
                        onChange={handleWeekDaysChange}
                        type="checkbox"
                        value={day}
                        checked={allchecked?.includes(day)}
                      />
                      <FormLabel>{day}</FormLabel>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex align-items-baseline mt-2">
                <DatePicker
                  className="form-control ps-1 cursor-pointer "
                  popperPlacement="bottom"
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="h:mm aa"
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Please select start time"
                />
                <div className="arrow-select-center">
                  <Icon icon="fe:arrow-down" />
                </div>

                <DatePicker
                  className="form-control ps-1 cursor-pointer "
                  popperPlacement="bottom"
                  selected={endTime}
                  onChange={(time) => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="h:mm aa"
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Please select end time"
                />
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
                    {timeRange.days.join(", ")}: {timeRange.startTime} -{" "}
                    {timeRange.endTime}
                  </div>
                ))
              )}

              <div className="mt-3">
                <strong>Upload images</strong>
                <hr className=" w-100 opacity-25" />
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="row">
                      <div className="col-lg-6">
                        <FormLabel className="labels">Banner image</FormLabel>
                      </div>
                      <div className="col-lg-6">
                        <FormLabel className="labels">
                          Min:800px x 600px
                        </FormLabel>
                      </div>
                    </div>
                    <div>
                      <label for="file-input">
                        <img
                          src={AddBanner}
                          alt="add"
                          width="100%"
                          className="border border-2 rounded-3"
                        />
                      </label>
                      <input id="file-input" type="file" size="60" />
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                    <div className="d-flex flex-row gap-3">
                      <FormLabel className="labels">Add more images*</FormLabel>
                      <FormLabel className="labels">
                        Min : 300px x 300px
                      </FormLabel>
                    </div>
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
                </div>
              </div>
              <label className="btn btn-outline-primary mt-3">
                Browse
                <input type="file" size="60" />
              </label>
              <hr className="w-100 opacity-25" />
              <div className="d-flex gap-2 justify-content-end">
                <Button
                  variant="outline-primary"
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
    </>
  );
};

export default AddCenter;
