import React, { useState } from "react";
import SideMenu from "../Components/SideMenu";
import NavbarHeader from "../Components/Navbar";
import AddBanner from "../Assects/Images/addbanner.svg";
import "react-datepicker/dist/react-datepicker.css";

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";



const OrganizationInfo = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  

  return (
    <>
      <NavbarHeader />
      <div>
        <Row className="w-100 m-0">
          <Col lg={2} className="p-0">
            <SideMenu />
          </Col>
          <Col lg={10} className="p-0 form-login h-100 m-0">
            <div className="container-fluid">
              <div className="mx-2">
                <h6 className="fw-bold mt-4">Organization info</h6>
                <hr className="w-100 opacity-25" />
              </div>
            </div>
            <Card className="mx-3">
              <CardBody>
                <Form>
                  <div className="row">
                    <div className="col-4">
                      <FormLabel>Organization name*</FormLabel>
                      <FormControl />
                    </div>
                  </div>

                  <div className="mt-3">
                    <strong>Address & timings</strong>
                    <hr className='w-100 opacity-25'/>
                    <div className="d-flex row">
                      <div className="col-4">
                        <FormLabel className="labels">Street*</FormLabel>
                        <FormControl />
                      </div>
                      <div className="col-1">
                        <FormLabel className="labels">Suite</FormLabel>
                        <FormControl />
                      </div>
                      <div className="col-2">
                        <FormLabel className="labels">City*</FormLabel>
                        <FormControl />
                      </div>
                      <div className="col-2">
                        <FormLabel className="labels">State*</FormLabel>
                        <FormControl />
                      </div>
                      <div className="col-2">
                        <FormLabel className="labels">Zip*</FormLabel>
                        <FormControl />
                      </div>
                    </div>
                    <div className="d-flex row mt-2">
                      <div className="flex-column col-4">
                        <FormLabel className="labels">Phone number*</FormLabel>
                        <FormControl />
                      </div>
                      <div className="flex-column col-4">
                        <FormLabel className="labels">Email*</FormLabel>
                        <FormControl />
                      </div>
                    </div>
                    <div className="mt-2">
                      <FormLabel className="labels">Business hours*</FormLabel>
                      <div className="d-flex flex-row gap-2">
                        <FormCheck /> <FormLabel>Sun</FormLabel>
                        <FormCheck /> <FormLabel>Mon</FormLabel>
                        <FormCheck /> <FormLabel>Tue</FormLabel>
                        <FormCheck /> <FormLabel>Wed</FormLabel>
                        <FormCheck /> <FormLabel>Thu</FormLabel>
                        <FormCheck /> <FormLabel>Fri</FormLabel>
                        <FormCheck /> <FormLabel>Sat</FormLabel>
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-baseline mt-2">
                      <div className="">
                        <DatePicker
                          className="form-control ps-1 cursor-pointer "
                          // ref={startTimeRef}
                          popperPlacement="bottom"
                          selected={startTime}
                          onChange={(time) => setStartTime(time)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeFormat="h:mm aa"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          placeholderText="Please select start time"
                        />
                        <div className="arrow-select">
                          <Icon icon="fe:arrow-down" />
                        </div>
                      </div>
                      <div className="">
                        <DatePicker
                          className="form-control ps-1 cursor-pointer "
                          // ref={startTimeRef}
                          popperPlacement="bottom"
                          selected={endTime}
                          onChange={(time) => setEndTime(time)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeFormat="h:mm aa"
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          placeholderText="Please select end time"
                        />
                        <div className="arrow-select">
                          <Icon icon="fe:arrow-down" />
                        </div>
                      </div>
                      <div className="">
                        <Icon icon="gridicons:add" color="#2d77d2" />
                        <small className="text-primary fs-6">Add</small>
                      </div>
                    </div>
                    <div className="mt-3">
                      <strong>Upload image</strong>
                      <hr className='w-100 opacity-25'/>
                      <div>
                        <div className="row gap-5">
                          <div className="col-3">
                            <div className="d-flex flex-row justify-content-between">
                              <FormLabel className="labels">
                                Banner image
                              </FormLabel>
                              <FormLabel className="labels">
                                Min:800px x 600px
                              </FormLabel>
                            </div>
                            <div >
                                <label for="file-input">
                                <img
                              src={AddBanner}
                              alt="add"
                              className="border border-2 rounded-3"
                            />
                              </label>

                                <input id="file-input" type="file" size="60" />
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label className="btn btn-outline-primary mt-3">
                      Browse
                      <input type="file" size="60" />
                    </label>
                    <hr className='w-100 opacity-25'/>
                    <div className="d-flex gap-2 justify-content-end">
                      <Button
                        variant="outline-primary"
                        className="border-0 text-danger"
                      >
                        Cancel
                      </Button>
                      <Button className="btn-danger text-white">Update</Button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrganizationInfo;
