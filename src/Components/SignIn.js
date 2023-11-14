import React from "react";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../Redux/Actions/LoginAction";
import { Link } from "react-router-dom";

const SignIn = ({ setIsSignIn }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsSignIn(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .test("password", "Invalid password", (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        dispatch(
          fetchLogin({ email: values.email, password: values.password })
          
        );

      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });


  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Form
          className="p-4 form-login w-100 rounded-3"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group>
            <Form.Label className="mb-3 mt-2">Email address</Form.Label>
            <Form.Control
              id="email"
              className="mb-2 shadow input-field"
              type="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && 
            (<p className='error text-danger fw-bold m-0'>{formik.errors.email}</p>)}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-3 mt-3">Password</Form.Label>
            <Form.Control
              id="password"
              className="mb-2 shadow input-field"
              type="password"
              placeholder="Password"  
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className='error text-danger fw-bold m-0'>{formik.errors.password}</p>
            )}
          </Form.Group>
          <Link to="#" className="text-decoration-none float-end f-red my-3">
            <p className="m-0">Forgot Password?</p>
          </Link>
          <Button className="w-100 signin border-0" type="submit" 
          disabled={!formik.isValid || formik.isSubmitting}>
            Sign In
          </Button>
        
        <div className="d-flex justify-content-between gap-2 mt-4">
          <div>
            <small className="font-small">Don't have an account?</small>
            <p className="f-red fw-bold linkbtn mb-1 font-16">Sign up</p>
          </div>
          <div>
            <small className="font-small">Are you a sports organization?</small>
            <p className="f-red fw-bold linkbtn mb-1 font-16" onClick={handleClick}>
              Partner with us
            </p>
          </div>
        </div>
        </Form>
      </div>
      
    </>
  );
};

export default SignIn;
