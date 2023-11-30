import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { useDispatch, useSelector } from "react-redux";
import { FacilitiesAction } from "../Redux/Actions/FacilitiesAction";
import AddFacilities from "./AddFacilities";
import { Link } from "react-router-dom";
import CourtDetails from "./CourtDetails";
import { CourtDetailsAction } from "../Redux/Actions/CourtDetailsAction";
import AddSportsModel from "./AddSportsModel";
import AddSportsFormModel from "./AddSportsFormModel";
import { DeleteFacilities } from "../Redux/Actions/DeleteFacilitiesAction";

const Facilities = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [sportsTitle, setSportsTitle] = useState("")
  const [showCD, setShowCD] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const centerID = localStorage.getItem("centerId");

  const handleCourtDetails = (id)=>{
    dispatch(CourtDetailsAction(id))
    setShowCD(true)
  }

  const handleDeleteFacilities = (id)=>{
    dispatch(DeleteFacilities(id))
  }

  const handleClickModel = ()=>{
    setIsEdit(false)
    setShow(true)
}

  const facilitiesSelector = useSelector(
    (state) => state?.FacilitiesReducer?.facilities
  );

  useEffect(() => {
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (centerID !== undefined) {
      dispatch(FacilitiesAction(centerID));
    }
    // eslint-disable-next-line
  }, [centerID]);

  return (
    <>
      <div className="container-fluid">
        <div className="mx-2">
          <h6 className="fw-bold mt-4">Facilities</h6>
          <hr className="w-100 opacity-25 mt-0" />
        </div>
      </div>

      {Object.keys(facilitiesSelector).length ? (
                  <Card className=" mx-3 py-1 border-0 rounded-3 pb-3">
       { Object.keys(facilitiesSelector)?.map((title, index) => (
             <div key={index}>
            <div className="row d-flex align-items-center mx-2 mt-2 pb-2">
              <div className="col flex-grow-0">
                <h5 className="m-0 fw-bold text-nowrap">{title}</h5>
              </div>
              <div className="col border-dotted flex-grow-1"></div>
              <div className="col flex-grow-0 d-flex align-items-center ms-auto cursor-pointer" onClick={handleClickModel}>
                <Icon icon="gridicons:add" color="#2d77d2" />
                <small className="text-primary fs-6"
                >Add</small>
              </div>
            </div>

            <div className="row ps-4 text-muted">
              <div className="col-1">
                <p className="font-small ms-2 mb-2">S No</p>
              </div>
              <div className="col-3">
                <p className="font-small mb-2">Name</p>
              </div>
              <div className="col-6">
                <p className="font-small mb-2">Features</p>
              </div>
              <div className="col-2">
                <p className="font-small mb-2">Actions</p>
              </div>
            </div>
            {facilitiesSelector[title]?.map((sel, i) => (
              <div
                key={i}
                className="row border rounded-3 bg-ws mx-3 mb-2 py-2"
              >
                <div className="col-1 ps-4">
                  <label>{i + 1}</label>
                </div>
                <div className="col-3">
                  <Link className="text-decoration-none" onClick={()=>handleCourtDetails(sel?.id)}>{sel?.name}</Link>
                </div>
                <div className="col-6">
                  <small>{sel?.features?.join(" | ")}</small>
                </div>
                <div className="col-2">
                  <div className="d-flex flex-row align-items-center justify-content-center mt-1 gap-1">
                    <Icon icon="fa-regular:edit" color="#de342f" onClick={()=>handleCourtDetails(sel?.id)}/>
                    <div class="vr"></div>
                    <Icon icon="raphael:dollar" color="#de342f" />
                    <div class="vr"></div>
                    <Icon icon="mingcute:calendar-fill" color="#de342f" />
                    <div class="vr"></div>
                    <Icon icon="icon-park-outline:copy" color="#de342f" />
                    <div class="vr"></div>
                    <Icon icon="subway:delete" color="#de342f" onClick={()=>handleDeleteFacilities(sel?.id)}/>
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

      <CourtDetails show = {showCD} setShow = {setShowCD} setPopUp = {setPopUp} setIsEdit = {setIsEdit}/>
      <AddSportsModel show={show} setShow={setShow} setPopUp = {setPopUp} setSportsTitle={setSportsTitle} />
      <AddSportsFormModel show={popUp} setShow={setPopUp} sportsTitle = {sportsTitle} isEdit= {isEdit} setIsEdit = {setIsEdit}/> 
    </>
  );
};

export default Facilities;
