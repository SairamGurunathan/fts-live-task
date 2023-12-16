import React, { useEffect, useState } from "react";
import AddBanner from "../Assects/Images/addbanner.svg";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, CardBody, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  OrgInfoAction,
  OrgInfoEditAction,
} from "../Redux/Actions/OrganizationInfoAction";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DatePickerStart from "../Components/DatePickerStart";
import DatePickerEnd from "../Components/DatePickerEnd";
import Swal from "sweetalert2";

const OrganizationInfo = () => {
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [allchecked, setAllChecked] = useState([]);
  const dispatch = useDispatch();
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    streetAddress: Yup.string().required("Street is required"),
    suite: Yup.string(),
    city: Yup.string().required("City is required"),
    stateProvince: Yup.string().required("State is required"),
    zipCode: Yup.number().required("Zip is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        "Phone number must be in the '123-456-7890' format"
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const numberValidation = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  const orgIdSelector = useSelector(
    (state) => state?.OrgInfoStore?.OrgInfo?.data
  );

  const accountDataSelector = useSelector(
    (state) => state?.AccountReducer?.account?.data?.orgId
  );
  const photoSelector = useSelector((state) => state?.OrgPhotosReducer?.photos);
  console.log(photoSelector);
  const handleWeekDaysChange = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked?.filter((item) => item !== e.target.value));
    }
  };
  // const selectedValuesString = allchecked?.toString();
  const handleClear = () => {
    setSelectedTimes([]);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      streetAddress: "",
      city: "",
      stateProvince: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        dispatch(OrgInfoEditAction(accountDataSelector, payload, values));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Organization has been updated successfully.",
          showConfirmButton: false,
          showCloseButton: true,
        });
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  const payload = {
    ...formik.values,
    id: accountDataSelector,
    displayName: true,
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
    setStartTime(null);
    setEndTime(null);
    setAllChecked(null);
    setDisplayErrorMessage(false);
  };

  useEffect(() => {
    if (accountDataSelector !== undefined) {
      dispatch(OrgInfoAction(accountDataSelector));
    }
    // eslint-disable-next-line
  }, [accountDataSelector]);

  useEffect(() => {
    try {
      formik.setFieldValue("title", orgIdSelector?.title || "");
      formik.setFieldValue("streetAddress", orgIdSelector?.streetAddress || "");
      formik.setFieldValue("city", orgIdSelector?.city || "");
      formik.setFieldValue("stateProvince", orgIdSelector?.stateProvince || "");
      formik.setFieldValue("zipCode", orgIdSelector?.zipCode || "");
      formik.setFieldValue("phoneNumber", orgIdSelector?.phoneNumber || "");
      formik.setFieldValue("email", orgIdSelector?.email || "");
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [orgIdSelector]);

  return (
    <>
      <div className="container-fluid">
        <div className="mx-2">
          <h6 className="fw-bold mt-4">Organization info</h6>
          <hr className="w-100 opacity-25" />
        </div>
      </div>
      <Card className="mx-3">
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <Form.Group>
                  <Form.Label>Organization name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    disabled={formik.values.title ? true : false}
                  />

                  {formik.touched.title && formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.title}
                    </p>
                  )}
                </Form.Group>
              </div>
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
                    {formik.touched.streetAddress &&
                      formik.errors.streetAddress && (
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
                    {formik.touched.city && formik.errors.city && (
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
                    {formik.touched.stateProvince &&
                      formik.errors.stateProvince && (
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
                    {formik.touched.zipCode && formik.errors.zipCode && (
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
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
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
                      disabled={formik.values.email ? true : false}
                    />
                    {formik.touched.title && formik.errors.email && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.email}
                      </p>
                    )}
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
                <DatePickerStart
                  startTime={startTime}
                  setStartTime={setStartTime}
                />
                <div className="arrow-select-orginfo">
                  <Icon icon="fe:arrow-down" />
                </div>

                <DatePickerEnd endTime={endTime} setEndTime={setEndTime} />
                <div className="arrow-select-orginfo">
                  <Icon icon="fe:arrow-down" />
                </div>
                <div className="cursor-pointer" onClick={handleAddTime}>
                  <Icon icon="gridicons:add" color="#2d77d2" />
                  <small className="text-primary fs-6">Add</small>
                </div>
              </div>

              {displayErrorMessage && (
                <div className="text-danger mt-2">
                  Please Enter All The Details In Business Hours.
                </div>
              )}
              {selectedTimes?.length &&
                selectedTimes?.map((timeRange, index) => (
                  <div key={index} className="text-muted mt-3">
                    {timeRange.days.join(", ")}: {timeRange.startTime} -{" "}
                    {timeRange.endTime}{" "}
                    <Icon
                      icon="pajamas:close-xs"
                      color="#de342f"
                      width="20"
                      height="20"
                      onClick={handleClear}
                    />{" "}
                  </div>
                ))}

              <div className="mt-3">
                <strong>Upload images</strong>
                <hr className=" w-100 opacity-25" />
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="row">
                      <div className="col-lg-6">
                        <label className="labels">Banner image</label>
                      </div>
                      <div className="col-lg-6">
                        <label className="labels">Min:800px x 600px</label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      {photoSelector ? (
                        photoSelector.map((photo, index) => (
                          <div
                            key={index}
                            className="card-addlocation square"
                            style={{
                              backgroundImage: `url('${photo.url}')`,
                              paddingTop: "25px",
                            }}
                          >
                            <input
                              id={`file-input-${index}`}
                              type="file"
                              size="60"
                            />
                          </div>
                        ))
                      ) : (
                        <label for="file-input">
                          <img
                            src={AddBanner}
                            alt="add"
                            width="100%"
                            className="border border-2 rounded-3"
                          />
                          <input id="file-input" type="file" size="60" />
                        </label>
                      )}
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
                  variant="outline-light"
                  className="border-0 text-danger"
                  onClick={() => navigate("/center")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-danger text-white">
                  Update
                </Button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default OrganizationInfo;
