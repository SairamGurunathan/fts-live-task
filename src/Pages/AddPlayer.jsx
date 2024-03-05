import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { ResetAction } from "../Redux/Actions/ResetAction";
import { useDispatch } from "react-redux";
import BookingContext from "../Components/BookingContext";
import { PricingRuleAction } from "../Redux/Actions/PricingRuleAction";
import { CostByPriceAction } from "../Redux/Actions/CostByPriceAction";

const AddPlayer = ({
  show,
  setShow,
  pricingRuleSelector,
  setIsAddPlayer,
  checkAvailabilitySelector,
  pricingRuleId,
  setPricingRuleId,
  initialData,
  startDateTime,
  endDateTime,
  isMultiple,
  day,
}) => {
  const { bookingData, setBookingData } = useContext(BookingContext);
  const dispatch = useDispatch();

  const [nameNotDisclosed, setNameNotDisclosed] = useState(false);
  const [sameAsPrimary, setSameAsPrimary] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter a first name"),
    lastName: Yup.string().required("Please enter a last name"),
    facility: Yup.string().required("Please select a facility"),
    pricingRule: Yup.string().required("Please select a pricing rule"),
  });

  const handleClose = () => {
    Swal.fire({
      html: `
        <div className="card">
          <small>Are you sure you want to close ?
          </small>
        </div>`,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result?.isConfirmed) {
        setShow(false);
        setNameNotDisclosed('')
        setSameAsPrimary('')
    dispatch(ResetAction());
    formik.resetForm();
      }
    });
    
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      facility: "",
      pricingRule: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values, { setSubmitting }) => {
      try {
        values.facilityTitle = bookingData.facilityTitle;
        values.pricingRuleTitle = bookingData.pricingRuleTitle;
        dispatch(CostByPriceAction(pricingRuleId, startDateTime, endDateTime, isMultiple, day));
        setIsAddPlayer(true);
        setShow(false);
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        firstName: nameNotDisclosed ? bookingData.firstName : initialData.firstName,
        lastName: nameNotDisclosed ? bookingData.lastName : initialData.lastName,
        facility: sameAsPrimary ? bookingData.facility : initialData.facility,
        pricingRule: sameAsPrimary ? bookingData.pricingRule : initialData.pricingRule,
      }));
    }
  }, [initialData, nameNotDisclosed, sameAsPrimary, formik, bookingData]);
  
  return (
    <>
      <Offcanvas
        show={show}
        placement="end"
        backdrop="static"
        style={{ width: "50%" }}
      >
        <Offcanvas.Header className="bg-info">
          <Offcanvas.Title>Add Booking</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={nameNotDisclosed}
                  id="nameNotDisclosedCheckbox"
                  onChange={() => setNameNotDisclosed(!nameNotDisclosed)}
                />
                <label class="form-check-label" for="nameNotDisclosedCheckbox">
                  Name not disclosed
                </label>
              </div>
              <Row>
                <Col>
                  <div>
                    <Form.Group>
                      <Form.Label className="labels mb-2">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nameNotDisclosed ? 'Name not disclosed' : formik.values.firstName}
                        disabled={nameNotDisclosed}
                      />
                      {formik.errors.firstName && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.touched.firstName && formik.errors.firstName}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Form.Group>
                      <Form.Label className="labels mb-2">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={nameNotDisclosed ? 'Name not disclosed' : formik.values.lastName}
                        disabled={nameNotDisclosed}
                      />
                      {formik.errors.lastName && (
                        <p className="error text-danger m-1 fw-medium">
                          {formik.touched.lastName && formik.errors.lastName}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={sameAsPrimary}
                  id="sameAsPrimaryCheckbox"
                  onChange={() => setSameAsPrimary(!sameAsPrimary)}
                />
                <label class="form-check-label" for="sameAsPrimaryCheckbox">
                  Same as primary
                </label>
              </div>
              <Row>
                <Col>
                  <div>
                    <label className="labels mb-2">Facility *</label>
                    <div className="border border-1 overflow-auto check-height p-2">
                      {checkAvailabilitySelector?.map((val) => (
                        <div className="form-check ps-0" key={val?.id}>
                          <input
                            type="radio"
                            name="facility"
                            disabled={sameAsPrimary}
                            value={sameAsPrimary ? bookingData.facility : val?.id}
                            label={val?.title}
                            checked={sameAsPrimary ? bookingData.facility : formik.values.facility === val?.id}
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
                    {formik.errors.facility && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.facility}
                      </p>
                    )}
                  </div>
                </Col>
                <Col>
                  <div>
                    <label className=" labels mb-2">Pricing rule *</label>
                    <div className="border border-1 overflow-auto check-height p-2">
                      <>
                        <p className="fw-bold">
                          {pricingRuleSelector[0]?.facility?.title}
                        </p>
                        {pricingRuleSelector.map((rule) => (
                          <div className="form-check ps-0" key={rule?.id}>
                            <input
                              type="radio"
                              name="pricingRule"
                              disabled={sameAsPrimary}
                              value={sameAsPrimary ? bookingData.pricingRule : rule?.pricingRuleId}
                              checked={sameAsPrimary ? bookingData.pricingRule === rule?.pricingRuleId : formik.values.pricingRule === rule?.pricingRuleId}
                              onChange={() => {
                                formik.setFieldValue("pricingRule", rule?.pricingRuleId);
                                setPricingRuleId((prevId) => ({
                                  ...prevId,
                                  [rule?.pricingRuleId]: true, 
                                }));
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
                    </div>
                    {formik.errors.pricingRule && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.pricingRule}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="d-flex flex-column col-6 mx-auto gap-2 mt-4">
                <Button type="submit">Add</Button>
                <Button onClick={handleClose}>Close</Button>
              </div>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddPlayer;
