import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import AddFacilityImage from "./AddFacilityImage";
import {FacilitiesEditFormAction,FacilitiesFormAction,} from "../Redux/Actions/FacilitiesFormAction";
import DatePickerEnd from "../Components/DatePickerEnd";
import DatePickerStart from "../Components/DatePickerStart";
import { FacilitiesAction } from "../Redux/Actions/FacilitiesAction";
import { DeleteFacilitiesMetas } from "../Redux/Actions/DeleteFacilitiesMetaAction";
import { ResetAction } from "../Redux/Actions/ResetAction";
import { getWeekDayFormat } from "../Utilities/Utility";

const AddSportsFormModel = ({
  show,
  setShow,
  sportsTitle,
  isEdit,
  response,
  editID,
}) => {
  const weekdays = [
    { fullName: "Sunday", halfName: "Sun", index: 0 },
    { fullName: "Monday", halfName: "Mon", index: 1 },
    { fullName: "Tuesday", halfName: "Tue", index: 2 },
    { fullName: "Wednesday", halfName: "Wed", index: 3 },
    { fullName: "Thursday", halfName: "Thu", index: 4 },
    { fullName: "Friday", halfName: "Fri", index: 5 },
    { fullName: "Saturday", halfName: "Sat", index: 6 },
  ];
  const [allchecked, setAllChecked] = useState("");
  const [isPlayer, setIsPlayer] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [newFeatures, setNewFeatures] = useState("");
  const [features, setFeatures] = useState([]);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [apiData, setApiData] = useState([]);
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const [facilitySelect,setFacilitySelect] = useState([])
  const [selectChange, setSelectChange] =  useState([])

  const facilitiesMetasSelector = useSelector(
    (state) => state?.FacilitiesMetasReducer?.facilitesMetas
  );
  
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
    const sortedChecked = allchecked.sort((a, b) => {
      const indexA = weekdays.find((day) => day.halfName === a)?.index || 0;
      const indexB = weekdays.find((day) => day.halfName === b)?.index || 0;
      return indexA - indexB;
    });

    const selectedTimeRange = {
      startTime: moment(startTime).format("h:mm A"),
      endTime: moment(endTime).format("h:mm A"),
      days: getWeekDayFormat(sortedChecked.toString()),
    };

    setSelectedTimes([...selectedTimes, selectedTimeRange]);
    setStartTime("");
    setEndTime("");
    setAllChecked("");
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

  const facilitieDataSelector = useSelector(
    (state) => state?.AddSportsFormReducer?.addSports
  );

  const mappedData = features?.map((feature) => {
    return { value: feature?.value };
  });
  const statusCode = useSelector(
    (state) => state?.AddSportsFormReducer?.addSports?.statusCode
  );

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
      if (!isEdit) {
        setAllChecked("");
        setStartTime("");
        setEndTime("");
        formik.resetForm();
        try {
          dispatch(FacilitiesFormAction(payLoad,formData));
          setShow(false);
          setFeatures([]);
          setApiData([]);
          
         } catch (error) {
          console.log(error);
        }
        setSubmitting(false);
      } else {
        try {
          dispatch(FacilitiesEditFormAction(editID, payloadEdit));
          setShow(false);
          setFeatures([]);
          setApiData([]);
          formik.resetForm();
        } catch (error) {
          console.log(error);
        }
        setSubmitting(false);
      }
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
    displayName: isPlayer,
    defaultPlayDuration: "30",
    sku: sku,
    createdBy: userID,
    photos: null,
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
    facilityMetas: mappedData,
  };

  const payloadEdit = {
    reservationAttribute: {
      advanceBookingMax: formik.values.advanceBookingMax,
      advanceBookingMin: formik.values.advanceBookingMin,
      durationAllowedMax: formik.values.durationAllowedMax,
      durationAllowedMin: formik.values.durationAllowedMin,
      playerAllowedMax: formik.values.playerAllowedMax,
      playerAllowedMin: formik.values.playerAllowedMin,
      facility: facilitieDataSelector?.reservationAttribute?.facility,
      id: facilitieDataSelector?.reservationAttribute?.id,
    },
    id: facilitieDataSelector?.id,
    title: formik.values.title,
    displayName: isPlayer,
    defaultPlayDuration: "30",
    sku: "Edit",
    createdBy: userID,
    photos: null,
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
      id: facilitieDataSelector?.sport?.id,
    },
    facilityHours: [
      {
        id: facilitieDataSelector?.facilityHours?.id,
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

    facilityMetas: mappedData,
  };

  const handleClose = () => {
    setShow(false);
    setFeatures([]);
    setApiData([]);
    setNewFeatures("");
    formik.resetForm();
    setSelectChange([])
    dispatch(ResetAction());
  };

  const handleChange = (e) => {
    setNewFeatures(e.target.value);
    setIsAddButtonDisabled(!e.target.value.trim());
  };

  const handleFeatures = () => {
    if (newFeatures.trim() !== "") {
      setFeatures([...features, { value: newFeatures }]);
      setNewFeatures("");
      setIsAddButtonDisabled(true);
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handledeleteFeature = (id) => {
    dispatch(DeleteFacilitiesMetas(id, editID));
    setApiData(facilitiesMetasSelector);
  };

  const combinedFeatures = [apiData, ...features];

  const formData = new FormData()
    formData.append('userId',userID)
    formData.append('file_0', facilitySelect)
    formData.append('tags_0',"photo")

  const handleClear = () => {
    setSelectedTimes([]);
  };

  useEffect(() => {
    try {
      formik.setFieldValue("title", response?.title || "");
      formik.setFieldValue(
        "playerAllowedMin",
        response?.reservationAttribute?.playerAllowedMin || ""
      );
      formik.setFieldValue(
        "playerAllowedMax",
        response?.reservationAttribute?.playerAllowedMax || ""
      );
      formik.setFieldValue(
        "durationAllowedMin",
        response?.reservationAttribute?.durationAllowedMin || ""
      );
      formik.setFieldValue(
        "durationAllowedMax",
        response?.reservationAttribute?.durationAllowedMax || ""
      );
      formik.setFieldValue(
        "advanceBookingMin",
        response?.reservationAttribute?.advanceBookingMin || ""
      );
      formik.setFieldValue(
        "advanceBookingMax",
        response?.reservationAttribute?.advanceBookingMax || ""
      );
      setApiData(response?.facilityMetas);
      const businessHours = response?.facilityHours || [];
      const mappedSelectedTimes = businessHours?.map((businessHour) => {
        return {
          startTime: businessHour?.startTime, 
          endTime: businessHour?.endTime, 
          days: getWeekDayFormat(businessHour?.weekday),
        };
      });
      setSelectedTimes(mappedSelectedTimes);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [response]);

  useEffect(() => {
    
    if (statusCode === 201) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Facility record has been created successfully",
        showConfirmButton: false,
        showCloseButton: true,
      });
      dispatch(FacilitiesAction(centerID));
    }
    // eslint-disable-next-line
  }, [statusCode]);

  useEffect(() => {
    setApiData(facilitiesMetasSelector, ...combinedFeatures);
    dispatch(FacilitiesAction(centerID));
    // eslint-disable-next-line
  }, [facilitiesMetasSelector]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? (
              <small className="m-0">Edit</small>
            ) : (
              <small className="m-0">Add {sportsTitle?.title}</small>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Form onSubmit={formik.handleSubmit}>
            <div className="p-3">
              <Form.Label className="m-0 fw-bold">Name</Form.Label>
              <hr className="w-100 opacity-25" />
              <Form.Group className="d-flex flex-row align-items-center gap-4">
                <div className="col-lg-6 col-md-6">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                </div>
                <div className="col-lg-6 col-md-6 d-flex ">
                  <Form.Check type="checkbox" onChange={handlePlayer} />
                  <Form.Label className="ms-2">
                    Open to Athlitik users
                  </Form.Label>
                </div>
              </Form.Group>
              {formik.touched.title && formik.errors.title && (
                <p className="error text-danger m-1 fw-medium">
                  {formik.errors.title}
                </p>
              )}

              <Form.Label className="m-0 fw-bold mt-3">Timings</Form.Label>
              <hr className="w-100 opacity-25" />
              <Row>
                <Col lg={6} sm={12}>
                  <div className="d-flex flex-column flex-md-row align-items-baseline mt-2 gap-2">
                  {weekdays?.map(({ halfName, index }) => (
                      <div className="d-flex gap-2" key={index}>
                        <Form.Check
                          onChange={handleWeekDaysChange}
                          type="checkbox"
                          value={halfName}
                          checked={allchecked?.includes(halfName)}
                        />
                        <Form.Label>{halfName}</Form.Label>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col lg={6} sm={12}>
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
              {displayErrorMessage && (
                <div className="text-danger mt-2">
                  Please Enter All The Details In Business Hours.
                </div>
              )}
    {selectedTimes?.length > 0 &&
                  selectedTimes?.filter(timeRange => timeRange?.days && timeRange?.startTime && timeRange?.endTime).map((timeRange, index) => (
                    <div key={index} className="text-muted mt-3">
                      {timeRange?.days} : {timeRange?.startTime} - {timeRange?.endTime}
                      <Icon
                        icon="pajamas:close-xs"
                        color="#de342f"
                        width="20"
                        height="20"
                        onClick={handleClear}
                      />{" "}
                    </div>
                  ))}
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
                  {formik.touched.playerAllowedMin &&
                    formik.errors.playerAllowedMin && (
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
                  {formik.touched.playerAllowedMax &&
                    formik.errors.playerAllowedMax && (
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
                  {formik.touched.durationAllowedMin &&
                    formik.errors.durationAllowedMin && (
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
                  {formik.touched.durationAllowedMax &&
                    formik.errors.durationAllowedMax && (
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
                  {formik.touched.advanceBookingMin &&
                    formik.errors.advanceBookingMin && (
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
                  {formik.touched.advanceBookingMax &&
                    formik.errors.advanceBookingMax && (
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
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={newFeatures}
                  />
                </Col>
                <Col lg={6}>
                  <div
                    className="d-flex flex-nowrap align-items-center cursor-pointer"
                    disabled={isAddButtonDisabled}
                  >
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small
                      className="text-primary fs-6"
                      onClick={handleFeatures}
                    >
                      Add
                    </small>
                  </div>
                </Col>
              </Row>
              {
                <div className="mt-1">
                  {Array.isArray(apiData) && apiData.length > 0
                    ? apiData.map((apiItem, index) => (
                        <span
                          key={index}
                          className="badge rounded-pill bg-white text-dark fw-normal border me-1"
                        >
                          {apiItem.value}
                          <Icon
                            icon="pajamas:close-xs"
                            color="#de342f"
                            width="20"
                            height="20"
                            onClick={() => handledeleteFeature(apiItem.id)}
                          />
                        </span>
                      ))
                    : null}

                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="badge rounded-pill bg-white text-dark fw-normal border me-1"
                    >
                      {feature.value}
                      <Icon
                        icon="pajamas:close-xs"
                        color="#de342f"
                        width="20"
                        height="20"
                        onClick={() => handleRemoveFeature(index)}
                      />
                    </span>
                  ))}
                </div>
              }
              <Form.Label>
                <small className="m-0 text-muted">Images</small>
              </Form.Label>
              <div>
                <AddFacilityImage setFacilitySelect={setFacilitySelect} facilitySelect={facilitySelect} selectChange={selectChange} setSelectChange={setSelectChange}/>
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
              {isEdit ? (
                <Button type="submit" className="btn-danger text-white">
                  Update
                </Button>
              ) : (
                <Button type="submit" className="btn-danger text-white">
                  Save
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddSportsFormModel;
