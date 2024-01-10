import React, { useEffect, useState } from "react";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { Icon } from "@iconify/react";
import AddFacilities from "./AddFacilities";
import CourtDetails from "./CourtDetails";
import AddSportsModel from "./AddSportsModel";
import AddSportsFormModel from "./AddSportsFormModel";
import { CourtDetailsAction } from "../Redux/Actions/CourtDetailsAction";
import { FacilitiesAction } from "../Redux/Actions/FacilitiesAction";
import { DeleteFacilities } from "../Redux/Actions/DeleteFacilitiesAction";
import { FacilitiesFormGetAction } from "../Redux/Actions/FacilitiesFormAction";

const Facilities = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [sportsTitle, setSportsTitle] = useState("");
  const [showCD, setShowCD] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState("");

  const centerID = localStorage.getItem("centerId");

  const handleCourtDetails = (id) => {
    dispatch(CourtDetailsAction(id));
    setEditID(id);
    dispatch(FacilitiesFormGetAction(id));
    setShowCD(true);
  };
  
  const handleDeleteFacilities = (id, title, sport) => {
    Swal.fire({
      title: '<header style="color:#de342f;">DELETE</header>',
      html: `
        <div className="card">
          <small>Are you sure you want to delete 
          <span className="fw-bolder">${title}</span>-<span className="fw-bolder">${sport}</span> ?</small>
        </div>`,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteFacilities(id));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "The record has been successfully deleted.",
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    });
  };

  const handleClickModel = () => {
    setIsEdit(false);
    setShow(true);
  };

  const facilitiesSelector = useSelector(
    (state) => state?.FacilitiesReducer?.facilities
  );
  const facilitiesGetSelector = useSelector(
    (state) => state?.AddSportsFormReducer?.addSports
  );
  // console.log(facilitiesGetSelector);
  useEffect(() => {
    if (centerID !== undefined) {
      dispatch(FacilitiesAction(centerID));
    }
    // eslint-disable-next-line
  }, [centerID]);

  const facilitiesSkeleton = (index) => {
    return (
      <div className="row border rounded-3 bg-ws mx-3 mb-2 py-2" key={index}>
        <div className="col-1 ps-4">
          <Skeleton count={1} />
        </div>
        <div className="col-3">
          <Skeleton count={1} />
        </div>
        <div className="col-6">
          <Skeleton count={1} />
        </div>
        <div className="col-2">
          <Skeleton count={1} />
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="mx-2">
          <h6 className="fw-bold mt-4">Facilities</h6>
          <hr className="w-100 opacity-25 mt-0" />
        </div>
      </div>

      {facilitiesSelector && Object.keys(facilitiesSelector).length ? (
        <Card className=" mx-3 py-1 border-0 rounded-3 pb-3">
          {facilitiesSelector &&
            Object.keys(facilitiesSelector)?.map((title, index) => (
              <div key={index}>
                <div className="row d-flex align-items-center mx-2 mt-2 pb-2">
                  <div className="col flex-grow-0">
                    <h5 className="m-0 fw-bold text-nowrap">{title}</h5>
                  </div>
                  <div className="col border-dotted flex-grow-1"></div>
                  <div
                    className="col flex-grow-0 d-flex align-items-center ms-auto cursor-pointer"
                    onClick={handleClickModel}
                  >
                    <Icon icon="gridicons:add" color="#2d77d2" />
                    <small className="text-primary fs-6">Add</small>
                  </div>
                </div>

                <div className="row ps-4 text-muted">
                  <div className="col-lg-1 col-md-1 col-sm-6">
                    <p className="font-small text-nowrap ms-md-2 ms-sm-0 mb-2">S No</p>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <p className="font-small mb-2">Name</p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <p className="font-small mb-2">Features</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-6">
                    <p className="font-small mb-2">Actions</p>
                  </div>
                </div>
                {facilitiesSelector.length === 0
                  ? Array.from({ length: 4 }, (_, index) =>
                      facilitiesSkeleton(index)
                    )
                  : facilitiesSelector[title]?.map((sel, i) => (
                      <div
                        key={i}
                        className="row border rounded-3 bg-ws mx-3 mb-2 py-2"
                      >
                        <div className="col-lg-1 col-md-1 col-sm-6 ps-4">
                          <label>{i + 1}</label>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                          <Link
                            className="text-decoration-none"
                            onClick={() => handleCourtDetails(sel?.id)}
                          >
                            {sel?.name}
                          </Link>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <small>{sel?.features?.join(" | ")}</small>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-6">
                          <div className="d-flex flex-row align-items-center justify-content-center gap-2 cursor-pointer">
                            <OverlayTrigger
                              placement={"bottom"}
                              overlay={
                                <Tooltip >
                                  <small>Edit</small>
                                </Tooltip>
                              }
                            >
                              <Button className="bg-transparent border-0 p-0">
                                <Icon
                                  icon="fa-regular:edit"
                                  color="#de342f"
                                  onClick={() => handleCourtDetails(sel?.id)}
                                />
                              </Button>
                            </OverlayTrigger>

                            <div class="vr"></div>
                            <OverlayTrigger
                              placement={"bottom"}
                              overlay={
                                <Tooltip>
                                  <small>Manage Pricing</small>
                                </Tooltip>
                              }
                            >
                              <Button className="bg-transparent border-0 p-0">
                                <Icon icon="raphael:dollar" color="#de342f" />
                              </Button>
                            </OverlayTrigger>
                            <div class="vr"></div>
                            <OverlayTrigger
                              placement={"bottom"}
                              overlay={
                                <Tooltip>
                                  <small>Schedule</small>
                                </Tooltip>
                              }
                            >
                              <Button className="bg-transparent border-0 p-0">
                                <Icon
                                  icon="mingcute:calendar-fill"
                                  color="#de342f"
                                />
                              </Button>
                            </OverlayTrigger>

                            <div class="vr"></div>
                            <OverlayTrigger
                              placement={"bottom"}
                              overlay={
                                <Tooltip>
                                  <small>Copy</small>
                                </Tooltip>
                              }
                            >
                              <Button className="bg-transparent border-0 p-0">
                                <Icon
                                  icon="icon-park-outline:copy"
                                  color="#de342f"
                                />
                              </Button>
                            </OverlayTrigger>

                            <div class="vr"></div>
                            <OverlayTrigger
                              placement={"bottom"}
                              overlay={
                                <Tooltip>
                                  <small>Delete</small>
                                </Tooltip>
                              }
                            >
                              <Button className="bg-transparent border-0 p-0">
                                <Icon
                                  icon="subway:delete"
                                  color="#de342f"
                                  onClick={() =>
                                    handleDeleteFacilities(
                                      sel?.id,
                                      title,
                                      sel?.name
                                    )
                                  }
                                />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            ))}
        </Card>
      ) : (
        <AddFacilities />
      )}

      <CourtDetails
        show={showCD}
        setShow={setShowCD}
        setPopUp={setPopUp}
        setIsEdit={setIsEdit}
      />
      <AddSportsModel
        show={show}
        setShow={setShow}
        setPopUp={setPopUp}
        setSportsTitle={setSportsTitle}
      />
      <AddSportsFormModel
        show={popUp}
        setShow={setPopUp}
        sportsTitle={sportsTitle}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        response={facilitiesGetSelector}
        editID={editID}
      />
    </>
  );
};

export default Facilities;
