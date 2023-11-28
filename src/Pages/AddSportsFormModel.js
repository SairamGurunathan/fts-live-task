import { Icon } from "@iconify/react";
import React, { useState } from "react";
import AddImages from "../Assects/Images/addimage.svg";
import {
    Button,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import DatePickerStart from "../Components/DatePickerStart";
import DatePickerEnd from "../Components/DatePickerEnd";


const AddSportsFormModel = ({ show, setShow,sportsTitle}) => {
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [allchecked, setAllChecked] = useState("");
  const [isPlayer, setIsPlayer] = useState(false)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Enter the Name"),
    playerAllowedMin: Yup.string().required("Enter Minimun Value"),
    playerAllowedMax: Yup.string().required("Enter Maximum Value"),
    durationAllowedMin: Yup.string().required("Enter Minimun Value"),
    durationAllowedMax: Yup.string().required("Enter Maximum Value"),
    advanceBookingMin: Yup.string().required("Enter Minimun Value"),
    advanceBookingMax: Yup.string().required("Enter Maximum Value"),
  });

  const handlePlayer = (e) => {
      if(e.target.checked){
        setIsPlayer(true)
      }else{
        setIsPlayer(false)
      }
    }

    console.log(isPlayer);
    const handleWeekDaysChange = (e) =>{
      if (e.target.checked) {
        setAllChecked([...allchecked, e.target.value]);
      } else {
        setAllChecked(allchecked?.filter((item) => item !== e.target.value));
      }
    }
    // const selectedValuesString = allchecked?.toString();
    const formik = useFormik({
      initialValues: {
        title: "",
        
      },
      validationSchema: validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
        } catch (error) {
          console.log(error);
        }
        setSubmitting(false);
      },
    });

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <small className="m-0">Add {sportsTitle}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Label className="m-0 fw-bold" >
              Name
            </Form.Label>
            <hr className="w-100 opacity-25" />
            <Form.Group className="d-flex flex-row align-items-center gap-4">
              <div className="col-6">
                <Form.Control type="text"
                    required
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.title}
                    </p>)}
              </div>
              <div className="col-6 d-flex">
                <Form.Check type="checkbox" onChange={handlePlayer}/>
                <Form.Label className="ms-2">Open to Athlitik users</Form.Label>
              </div>
            </Form.Group>

            <Form.Label className="m-0 fw-bold mt-3">
             Timings
            </Form.Label>
            <hr className="w-100 opacity-25" />
            <Row>
              <Col lg={6}>
                <div className="d-flex flex-row gap-2 mt-2 ">
                  {allDays?.map((day, index) => (
                    <div className="d-flex flex-row gap-2" key={index}>
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
              </Col>
              <Col lg={6}>
                <div className="d-flex align-items-center ps-3">
                 <DatePickerStart />
                  <div className="arrow-select1">
                    <Icon icon="fe:arrow-down" />
                  </div>

                  <DatePickerEnd />
                  <div className="arrow-select1">
                    <Icon icon="fe:arrow-down" />
                  </div>

                  <div className="d-flex flex-nowrap align-items-center">
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small className="text-primary fs-6">Add</small>
                  </div>
                </div>
              </Col>
            </Row>

            <Form.Label className="m-0 fw-bold mt-3">
              Reservation attributes
            </Form.Label>
            <hr className="w-100 opacity-25" />
            <Row className="mb-2 d-flex align-items-center">
              <Col lg={4}>
                <p className="m-0 text-muted">Players allowed</p>
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Min" 
                required
                name="playerAllowedMin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.playerAllowedMin}/>
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.playerAllowedMin}
                    </p>)}
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Max" 
                
                required
                name="playerAllowedMax"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.playerAllowedMax}
                />
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.playerAllowedMax}
                    </p>)}
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col lg={4}>
                <p className="m-0 text-muted">Duration allowed (hours)</p>
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Min" 
                required
                name="durationAllowedMin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.durationAllowedMin}/>
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.durationAllowedMin}
                    </p>)}
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Max" 
                required
                name="durationAllowedMax"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.durationAllowedMax}/>
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.durationAllowedMax}
                    </p>)}
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col lg={4}>
                <p className="m-0 text-muted">Advance booking window (hours)</p>
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Min" 
                required
                name="advanceBookingMin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.advanceBookingMin}/>
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.advanceBookingMin}
                    </p>)}
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Max" 
                required
                name="advanceBookingMax"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.advanceBookingMax}/>
                {formik.errors.title && (
                    <p className="error text-danger m-1 fw-medium">
                      {formik.errors.advanceBookingMax}
                    </p>)}
              </Col>
            </Row>
            <Form.Label className="m-0 fw-bold mt-3">
              Court highlights
            </Form.Label>
            <hr className="w-100 opacity-25" />
            <Form.Label className="text-muted">
                <small className="m-0">Features
                </small>
                </Form.Label>
            <Row className="d-flex flex-row align-items-center">
                <Col lg={6}>
                  <Form.Control type="text" />
                </Col>
                <Col lg={6}>
                  <div className="d-flex flex-nowrap align-items-center">
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small className="text-primary fs-6">Add</small>
                  </div>
                </Col>
            </Row>
            <Form.Label>
                <small className="m-0 text-muted">Images</small>
            </Form.Label>
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
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-white">
        <div className="d-flex gap-2 justify-content-end">
                      <Button
                        variant="outline-primary"
                        className="border-0 text-danger"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="btn-danger text-white">
                        Save
                      </Button>
                    </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSportsFormModel;
