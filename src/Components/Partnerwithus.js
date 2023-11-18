import React from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { fetchPartner } from "../Redux/Actions/LoginAction";

const Partnerwithus = ({ setIsSignIn }) => {
  const validationSchema = Yup.object().shape({
    organization: Yup.string().required("Organization name is required"),
    fName: Yup.string().required("First name is required"),
    lName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.number().max(10, "Max 10 digit")
    .required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleBack = () => {
    setIsSignIn(true);
  };

  const numberValidation = (e) => {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  };

   const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      organization: "",
      fName: "",
      lName: "",
      phNumber: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try{
      dispatch(fetchPartner({
        organization : values.organization,
        fName : values.fName,
        lName : values.lName,
        phNumber : values.phNumber,
        email : values.email,
        role : "ROLE_ORG_ADMIN"
      }))
    }
    catch (error){
        console.log(error);
    }
      setSubmitting(false);
  }
  });

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center rounded-2">
        <Form
          className="p-4 form-login w-100 rounded-3"
          onSubmit={formik.handleSubmit}
        >
          <div onClick={handleBack} className="left-arrow mb-3">
            <Icon icon="ep:arrow-left" width="22" height="22" />
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <Icon
              icon="gridicons:info-outline"
              color="#de342f"
              width="40"
              height="40"
            />
            
              <small className="m-0 partner-info">
                Please fill this short form and our team will get in touch with
                you shortly
              </small>
          
          </div>

          <Form.Group>
            <Form.Label className="mt-3 partner-label">
              Organization name
            </Form.Label>

            <Form.Control
              className="mb-2 shadow input-field"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organization}
              name="organization"
            />

            {formik.errors.organization && (
              <p className="error text-danger m-1 fw-medium">
                {formik.errors.organization}
              </p>
            )}
          </Form.Group>

          <div className="d-flex flex-row justify-content-between gap-2">
            <Form.Group>
              <Form.Label className="mb-2 partner-label">First name</Form.Label>

              <Form.Control
                className="mb-2 shadow input-field"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="fName"
                value={formik.values.fName}
              />

              {formik.errors.fName && (
                <p className="error text-danger fw-medium">
                  {formik.errors.fName}
                </p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-2 partner-label">Last name</Form.Label>

              <Form.Control
                className="mb-2 shadow input-field"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="lName"
                value={formik.values.lName}
                type="text"
              />
              {formik.errors.lName && (
                <p className="error text-danger fw-medium">
                  {formik.errors.lName}
                </p>
              )}
            </Form.Group>
          </div>

          <div className="d-flex flex-row justify-content-between gap-2">
            <Form.Group>
              <Form.Label className="mb-2 partner-label">
                Phone number
              </Form.Label>

              <Form.Control
                className="mb-2 shadow input-field"
                type="text"
                maxLength={10}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phNumber"
                value={formik.values.phNumber}
                onKeyPress={(e) => {
                  numberValidation(e);
                }}
              />

              { formik.errors.phNumber && (
                <p className="error text-danger fw-medium">
                  {formik.errors.phNumber}
                </p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-2 partner-label">
                Email address
              </Form.Label>

              <Form.Control
                className="mb-2 shadow input-field"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                value={formik.values.email}
              />

              {formik.errors.email && (
                <p className="error text-danger fw-meduim">
                  {formik.errors.email}
                </p>
              )}
            </Form.Group>
          </div>

          <div className="mx-4">
            <Button className="w-100 mt-3 signin border-0 py-2" type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Partnerwithus;
