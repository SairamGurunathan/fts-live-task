import React, { useContext } from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ResetAction } from "../Redux/Actions/ResetAction";
import { useDispatch } from "react-redux";
import BookingContext from "../Components/BookingContext";
import { PricingRuleAction } from "../Redux/Actions/PricingRuleAction";

const AddPlayer = ({
  show,
  setShow,
  pricingRuleSelector,
  setIsAddPlayer,
  checkAvailabilitySelector,
  isEdit,
  pricingRuleId,
  setPricingRuleId
}) => {
  const { setBookingData } = useContext(BookingContext);

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter a first name"),
    lastName: Yup.string().required("Please enter a last name"),
    facility: Yup.string().required("Please select a facility"),
    pricingRule: Yup.string().required("Please select a pricing rule"),
  });
  const handleClose = () => {
    setShow(false);
    dispatch(ResetAction());
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      facility:"",
      pricingRule:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        console.log(values);
        setIsAddPlayer(true);
        // setShow(false);
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });
 
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
        style={{ width: "50%" }}
      >
        <Offcanvas.Header closeButton className="bg-info">
          <Offcanvas.Title>Add Booking</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={formik.handleSubmit}>
          <div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
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
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Same as primary
              </label>
            </div>
            <Row>
              <Col>
              <div>
                  <label className="labels mb-2">Facility *</label>
                  <div className="border border-1 overflow-auto check-height p-2">
                    {checkAvailabilitySelector?.map((val) => (
                      <div className="form-check ps-0" key={val?.id} >
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
                              checked={formik.values.pricingRule === rule?.pricingRuleId}
                              onChange={() => {
                                formik.setFieldValue("pricingRule", rule?.pricingRuleId);
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
              <Button>Close</Button>
            </div>
          </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddPlayer;
