import { Icon } from "@iconify/react";
import React, { useState } from "react";
import AddImages from "../Assects/Images/addimage.svg";
import {
    Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  Modal,
  ModalFooter,
  Row,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

const AddSportsFormModel = ({ show, setShow,sportsTitle}) => {
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [allchecked, setAllChecked] = useState("");
  const [isPlayer, setIsPlayer] = useState(false)
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handlePlayer = (e) => {
      if(e.target.checked){
        setIsPlayer(true)
      }else{
        setIsPlayer(false)
      }
    }

    const handleWeekDaysChange = (e) =>{
      if (e.target.checked) {
        setAllChecked([...allchecked, e.target.value]);
      } else {
        setAllChecked(allchecked?.filter((item) => item !== e.target.value));
      }
    }
    // const selectedValuesString = allchecked?.toString();

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
          <Form>
            <FormLabel className="m-0 fw-bold">
              Name
            </FormLabel>
            <hr className="w-100 opacity-25" />
            <Form.Group className="d-flex flex-row align-items-center gap-4">
              <div className="col-6">
                <Form.Control type="text" />
              </div>
              <div className="col-6 d-flex">
                <FormCheck />
                <FormLabel className="ms-2">Open to Athlitik users</FormLabel>
              </div>
            </Form.Group>

            <FormLabel className="m-0 fw-bold mt-3">
             Timings
            </FormLabel>
            <hr className="w-100 opacity-25" />
            <Row>
              <Col lg={6}>
                <div className="d-flex flex-row gap-2 mt-2 ">
                  {allDays?.map((day, index) => (
                    <div className="d-flex flex-row gap-2" key={index}>
                      <FormCheck
                        // onChange={handleWeekDaysChange}
                        type="checkbox"
                        value={day}
                        checked={allchecked?.includes(day)}
                      />
                      <FormLabel>{day}</FormLabel>
                    </div>
                  ))}
                </div>
              </Col>
              <Col lg={6}>
                <div className="d-flex align-items-center ps-3">
                  <DatePicker
                    className="form-control ps-1 cursor-pointer "
                    popperPlacement="bottom"
                    selected={startTime}
                    onChange={(time) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="h:mm aa"
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Start time"
                  />
                  <div className="arrow-select1">
                    <Icon icon="fe:arrow-down" />
                  </div>

                  <DatePicker
                    className="form-control ps-1 cursor-pointer "
                    popperPlacement="bottom"
                    selected={endTime}
                    onChange={(time) => setEndTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="h:mm aa"
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="End time"
                  />
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

            <FormLabel className="m-0 fw-bold mt-3">
              Reservation attributes
            </FormLabel>
            <hr className="w-100 opacity-25" />
            <Row className="mb-2 d-flex align-items-center">
              <Col lg={4}>
                <p className="m-0 text-muted">Players allowed</p>
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Min" />
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Max" />
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col lg={4}>
                <p className="m-0 text-muted">Duration allowed (hours)</p>
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Min" />
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Max" />
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col lg={4}>
                <p className="m-0 text-muted">Advance booking window (hours)</p>
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Min" />
              </Col>
              <Col lg={3}>
                <Form.Control type="number" placeholder="Max" />
              </Col>
            </Row>
            <FormLabel className="m-0 fw-bold mt-3">
              Court highlights
            </FormLabel>
            <hr className="w-100 opacity-25" />
            <FormLabel className="text-muted">
                <small className="m-0">Features
                </small>
                </FormLabel>
            <Row className="d-flex flex-row align-items-center">
                <Col lg={6}>
                  <FormControl type="text" />
                </Col>
                <Col lg={6}>
                  <div className="d-flex flex-nowrap align-items-center">
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small className="text-primary fs-6">Add</small>
                  </div>
                </Col>
            </Row>
            <FormLabel>
                <small className="m-0 text-muted">Images</small>
            </FormLabel>
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
        <ModalFooter className="bg-white">
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
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddSportsFormModel;
