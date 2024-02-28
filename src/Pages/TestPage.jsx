import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Col, Row, Form } from 'react-bootstrap';

const TestPage = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(1,"required").required("Please enter a first name"),
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
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          facility: "",
          pricingRule: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
          try {
            console.log(values);
            
          } catch (error) {
            console.log(error);
          }
          setSubmitting(false);
        },
      });
  return (
    <>
    <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-4">
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
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </Form.Group>
                </div>
                <div>
                  <Form.Group>
                    <Form.Label className="labels mb-2">
                      Phone Number
                    </Form.Label>
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
                {/* <div>
                  <label className="labels mb-2">Facility *</label>
                  <div className="border border-1 overflow-auto check-height p-2">
                    {checkAvailabilitySelector?.map((val) => (
                      <div className="form-check ps-0" key={val?.id}>
                        <input
                          type="radio"
                          name="facility"
                          value={val?.id}
                          checked={formik.values.facility === val?.id}
                          onChange={() => {
                            handleFacilityCheck(val?.id);
                            formik.setFieldValue("facility", val?.id);
                            // formik.setFieldTouched("facility", true);
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
                </div> */}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column justify-content-between mt-4">
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
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="error text-danger m-1 fw-medium">
                        {formik.errors.lastName}
                      </p>
                    )}
                  </Form.Group>
                </div>
                <div>
                  <Form.Group>
                    <Form.Label className="labels mb-2">
                      Email Address
                    </Form.Label>
                    <Form.Control
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
                  </Form.Group>
                </div>
                {/* <div>
                  <label className=" labels mb-2">Pricing rule *</label>
                  <div className="border border-1 overflow-auto check-height p-2">
                    {pricingRuleSelector && pricingRuleSelector.length > 0 ? (
                      <>
                        <p className="fw-bold">
                          {pricingRuleSelector[0]?.facility?.title}
                        </p>
                        {pricingRuleSelector.map((rule) => (
                          <div className="form-check ps-0" key={rule?.id}>
                            <input
                              type="radio"
                              name="pricingRule"
                              value={rule?.id}
                              checked={formik.values.pricingRule === rule?.id}
                              onChange={() => {
                                formik.setFieldValue("pricingRule", rule?.id);
                              //   formik.setFieldTouched("pricingRule", true);
                              }}
                            />
                            <label className="ps-2">
                              {rule?.pricingRule?.ruleName}
                            </label>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                  {formik.errors.pricingRule && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.pricingRule}
                    </p>
                  )}
                </div> */}
              </div>
            </Col>
            <div className="mt-3">
             
                <Button type="submit" className="float-end">
                  Save
                </Button>
              
            </div>
          </Row>
        </Form>
    </>
  )
}

export default TestPage