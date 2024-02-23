import React from 'react'
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import * as Yup from "yup";
import { useFormik } from "formik";

const AddPlayer = ({show, setShow,pricingRuleSelector,setIsAddPlayer,checkAvailabilitySelector,handleFacilityCheck}) => {
    const handleClose = () => {
        setShow(false);
      };

      const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Please enter a first name"),
        lastName: Yup.string().required("Please enter a last name"),
      });
      const formik = useFormik({
        initialValues: {
          firstName:'',
          lastName:"",
          phoneNumber: "",
          email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
          try {
          } catch (error) {
            console.log(error);
          }
          setSubmitting(false);
        },
      });

      const handleAddPlayerTable =()=>{
        setIsAddPlayer(true);
        setShow(false)
      }
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
            <div>
            <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label" for="flexCheckDefault">
    Name not disclosed
  </label>
</div>
<Row>
    <Col>
    <div>
                  <Form.Group>
                  <Form.Label className="labels mb-2">First Name</Form.Label>
                  <Form.Control type="text" 
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}/>
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
                      value={formik.values.lastName}/>
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
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
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
                      <div className="form-check ps-0" key={val?.id}>
                        <input
                          type="radio"
                          name="facility"
                          value={val?.id}
                          onChange={() => handleFacilityCheck(val?.id)}
                        />
                        <label className="ps-2">{val?.title}</label>
                      </div>
                    ))}
                  </div>
                </div>
    </Col>
    <Col>
    <div>
                  <label className=" labels mb-2">Pricing rule *</label>
                  <div className="border border-1 overflow-auto check-height p-2">
                    {pricingRuleSelector?.map((rule) => (
                      <div className="form-check ps-0" key={rule?.id}>
                        <input
                          type="radio"
                          name="pricingrule"
                          value={rule?.id}
                        />
                        <label className="ps-2">
                          {rule?.pricingRule?.ruleName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>           
    </Col>
</Row>
<div className='d-flex flex-column col-6 mx-auto gap-2 mt-4'>
    <Button onClick={handleAddPlayerTable}>Add</Button>
    <Button>Close</Button>
</div>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default AddPlayer