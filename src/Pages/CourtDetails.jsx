import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AddSportsFormModel from "./AddSportsFormModel";
import { ResetAction } from "../Redux/Actions/ResetAction";

const CourtDetails = ({ show, setShow, setPopUp, popUp, setIsEdit }) => {
  const dispatch = useDispatch()
  const handleClose = () => {
    setShow(false);
    setPopUp(false);
    dispatch(ResetAction())
  };
  const handleEdit = () => {
    setIsEdit(true);
    setPopUp(true);
    setShow(false);
  };
  const courtDetailSelector = useSelector((state) => state?.CourtDetailsReducer?.courtDetails);
  const select = useSelector((state) => state?.FacilitiesPhotoReducer?.facilitiesPhotos);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <small>Court details</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={7}>
              <label>
                <strong>Name</strong>
              </label>
              <hr className="w-100" />
              <Row>
                <Col lg={5}>
                  <p>{courtDetailSelector?.title}</p>
                </Col>
                <Col lg={7}>
                  <div className="d-flex gap-2">
                    <Form.Check
                      type="checkbox"
                      checked={courtDetailSelector?.center?.displayName}
                    />

                    <label>Open to Athlitik users</label>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={5}>
              <label>
                <strong>Timings</strong>
              </label>
              <hr className="w-100" />
              <p className="m-0">
                        {courtDetailSelector?.facilityHours?.map((time, index) => {
                           if (time.startTime && time.endTime) {
                          time.startTime=(moment(time?.startTime,"hh:mm a"));
                          time.endTime=(moment(time?.endTime,"hh:mm a"));
                          return(
                          <small key={index} className="text-capitalize">
                            {time?.weekday?.split(",").map((day,dayIndex)=>(`${day.substring(0,3)}${dayIndex===time?.weekday?.split(",")?.length-1?"":", "}`))}
                            <p>{moment(time?.startTime).format('hh:mm a')} to {moment(time?.endTime).format('hh:mm a')}</p>
                          </small>)
                           } else {
                            return null;
                          }
                          })}
              </p>
            </Col>
          </Row>
          <div>
            <label>
              <strong>Reseravtion attributes</strong>
            </label>
            <hr className="w-100" />
            <Row>
              <Col>
                <p className="mb-0">Players allowed</p>
                <div className="mb-3  mt-1">
                  <strong>
                    {
                      courtDetailSelector?.reservationAttribute
                        ?.playerAllowedMin
                    }{" "}
                    -{" "}
                    {
                      courtDetailSelector?.reservationAttribute
                        ?.playerAllowedMax
                    }
                  </strong>
                </div>
              </Col>
              <Col>
                <p className="mb-0">Duration allowed</p>
                <div className="mb-3 mt-1">
                  <strong className="mb-3">
                    {
                      courtDetailSelector?.reservationAttribute
                        ?.durationAllowedMin
                    }{" "}
                    -{" "}
                    {
                      courtDetailSelector?.reservationAttribute
                        ?.durationAllowedMax
                    }{" "}
                    hours
                  </strong>
                </div>
              </Col>
              <Col>
                <p className="mb-0">Advance booking window</p>
                <div className="mb-3 mt-1">
                  <strong>
                    {
                      courtDetailSelector?.reservationAttribute
                        ?.advanceBookingMin
                    }{" "}
                    -{" "}
                    {
                      courtDetailSelector?.reservationAttribute
                        ?.advanceBookingMax
                    }{" "}
                    hours
                  </strong>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <label>
              <strong className="mb-3">Court highlights</strong>
            </label>
            <hr className="w-100" />
            <p className="text-muted m-0">Features</p>
            <div className="mb-3 mt-1">
              {courtDetailSelector?.facilityMetas?.map((val, index) => (
                <strong>
                  {val?.value}
                  {index === courtDetailSelector?.facilityMetas?.length - 1 ? (
                    ""
                  ) : (
                    <span> | </span>
                  )}{" "}
                </strong>
              ))}
            </div>
          </div>
          <label className="text-muted">Images</label>
          {select ? (
            select?.map((photo) => (
              <div>
                <img
                  src={photo?.url}
                  className="mt-2"
                  alt="img"
                  style={{ height: "120px", overflow: "auto" }}
                />
              </div>
            ))
          ) : (
            <div
              className="border border-4 col-2 mt-2"
              style={{ height: "120px", overflow: "auto" }}
            ></div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-white p-1 pe-3">
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="outline-light"
              className="border-0 text-danger"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button className="btn-danger text-white" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <AddSportsFormModel show={popUp} setShow={setPopUp} />
    </>
  );
};

export default CourtDetails;
