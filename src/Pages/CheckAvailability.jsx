import React, { useContext,useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PricingRuleAction } from "../Redux/Actions/PricingRuleAction";
import * as Yup from "yup";
import { useFormik } from "formik";
import AddPlayer from "./AddPlayer";
import { CostByPriceAction } from "../Redux/Actions/CostByPriceAction";
import moment from "moment";
import BookingContext from "../Components/BookingContext";
import AddPlayerTable from "./AddPlayerTable";

const CheckAvailability = ({
  setIsPricingTable,
  startDate,
  startTime,
  endDate,
  endTime,
  day,
  isMultiple,
}) => {
  const { bookingData, setBookingData, setCostValue, setLoading, loading } =
    useContext(BookingContext);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter a first name"),
    lastName: Yup.string().required("Please enter a last name"),
    phoneNumber: Yup.string()
      .max(10, "Max 10 digit")
      .required("Please enter a phone number"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter a email address"),
    facility: Yup.string().required("Please select a facility"),
    pricingRule: Yup.string().required("Please select a pricing rule"),
  });
  const dispatch = useDispatch();
  const [isAddPlayer, setIsAddPlayer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [pricingRuleId, setPricingRuleId] = useState("");
  const [isSave, setIsSave] = useState("Save");

  const numberValidation = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  const checkAvailabilitySelector = useSelector(
    (state) => state?.CheckAvailabilityReducer?.checkavailability?.data
  );

  const pricingRuleSelector = useSelector(
    (state) => state?.PricingRuleReducer?.pricingRule
  );

  const handleAddPlayer = () => {
    setShow(true);
  };
  const startDateTime =
    moment(`${startDate} ${startTime}`).toISOString().slice(0, -5) + "Z";
  const endDateTime =
    moment(`${endDate} ${endTime}`).toISOString().slice(0, -5) + "Z";
  const selectedPricingRule = pricingRuleSelector.find(
    (rule) => rule?.pricingRuleId === pricingRuleId
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      facility: "",
      pricingRule: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (isSave === "Save") {
        try {
          values.facilityTitle = bookingData.facilityTitle;
          values.pricingRuleTitle = bookingData.pricingRuleTitle;
          setBookingData(values);
          const PerCostValue = selectedPricingRule?.pricingRule?.cost;
          setCostValue(PerCostValue);
          dispatch(
            CostByPriceAction(
              pricingRuleId,
              startDateTime,
              endDateTime,
              isMultiple,
              day
            )
          );
          setIsPricingTable(true);
          setIsEdit(true);
          setIsSave("Edit");
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsEdit(false);
        setIsSave("Save");
      }
      setSubmitting(false);
    },
  });

  // useEffect(() => {
  //   if (pricingRuleId) {
  //     setLoading(true);

  //     // Dispatch the pricing rule API request
  //     dispatch(PricingRuleAction(pricingRuleId))
  //       .then(() => setLoading(false))
  //       .catch(error => {
  //         console.error("Error fetching pricing rule:", error);
  //         setLoading(false);
  //       });
  //   }
  //   // eslint-disable-next-line
  // }, [pricingRuleId]);
  return (
    <div>
      <div>
        <div className="my-3">
          <label>Available Facility</label>
        </div>
        <div className="my-3">
          {checkAvailabilitySelector?.map((val) => (
            <Button className="p-0 px-2 py-1">
              <small>{val?.title}</small>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <label>Player Details</label>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-2">
                <div>
                  <Form.Group>
                    <Form.Label className="labels mb-2">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      disabled={isEdit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </Form.Group>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-2">
                <div>
                  <Form.Group>
                    <Form.Label className="labels mb-2">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      disabled={isEdit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.lastName}
                      </p>
                    )}
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-2">
                <div>
                  <Form.Group>
                    <Form.Label className="labels mb-2">
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled={isEdit}
                      maxLength={10}
                      name="phoneNumber"
                      placeholder="Phone number"
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
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-2">
                <div>
                  <Form.Group>
                    <Form.Label className="labels mb-2">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email address"
                      disabled={isEdit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.email}
                      </p>
                    )}
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-2">
                <div>
                  <label className="labels mb-2">Facility *</label>
                  <div className="border border-1 overflow-auto check-height p-2">
                    {checkAvailabilitySelector?.map((val) => (
                      <div className="form-check ps-0" key={val?.id}>
                        <input
                          type="radio"
                          name="facility"
                          disabled={isEdit}
                          value={val?.id}
                          label={val?.title}
                          checked={formik.values.facility === val?.id}
                          onChange={() => {
                            dispatch(PricingRuleAction(val?.id));
                            formik.setFieldValue("facility", val?.id);
                            setBookingData((prevData) => ({
                              ...prevData,
                              facilityTitle: val?.title,
                            }));
                          }}
                        />
                        <label className="ps-2">{val?.title}</label>
                      </div>
                    ))}
                  </div>
                  {formik.touched.facility && formik.errors.facility && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.facility}
                    </p>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-2">
                <div>
                  <label className=" labels mb-2">Pricing rule *</label>
                  <div className="border border-1 overflow-auto check-height p-2">
                    {
                      <>
                        <p className="fw-bold">
                          {pricingRuleSelector[0]?.facility?.title}
                        </p>
                        {pricingRuleSelector.map((rule) => (
                          <div className="form-check ps-0" key={rule?.id}>
                            <input
                              type="radio"
                              name="pricingRule"
                              disabled={isEdit}
                              value={pricingRuleId}
                              checked={
                                formik.values.pricingRule ===
                                rule?.pricingRuleId
                              }
                              onChange={() => {
                                formik.setFieldValue(
                                  "pricingRule",
                                  rule?.pricingRuleId
                                );
                                setPricingRuleId(rule?.pricingRuleId);
                                setBookingData((prevData) => ({
                                  ...prevData,
                                  pricingRuleTitle: rule?.pricingRule?.ruleName,
                                }));
                              }}
                            />
                            <label className="ps-2">
                              {rule?.pricingRule?.ruleName}
                            </label>
                          </div>
                        ))}
                      </>
                    }
                  </div>
                  {formik.touched.pricingRule && formik.errors.pricingRule && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.pricingRule}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <div className="my-3">
            <Button
              type="submit"
              className="d-flex ms-auto"
              variant={isEdit ? "warning" : "success"}
            >
              {isSave === "Save" ? "Save" : "Edit"}
            </Button>
          </div>
        </Form>
        <div className="my-3">
          {isEdit ? (
            <Button variant="danger" onClick={handleAddPlayer}>
              Add Player
            </Button>
          ) : null}
          <AddPlayer
            show={show}
            setShow={setShow}
            setIsAddPlayer={setIsAddPlayer}
            pricingRuleSelector={pricingRuleSelector}
            checkAvailabilitySelector={checkAvailabilitySelector}
            pricingRuleId={pricingRuleId}
            setPricingRuleId={setPricingRuleId}
            setBookingData={setBookingData}
            bookingData={bookingData}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
            isMultiple={isMultiple}
            day={day}
          />
          {isAddPlayer ? <AddPlayerTable /> : ""}
        </div>
      </div>
    </div>
  );
};

export default CheckAvailability;
