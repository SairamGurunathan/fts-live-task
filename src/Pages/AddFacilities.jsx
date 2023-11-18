import React, { useEffect, useState } from 'react'
import AddFacilitie from "../Assects/Images/addplus.svg";
import AddSportsModel from './AddSportsModel';
import { AccountAction } from '../Redux/Actions/AccountAction';
import { useDispatch } from 'react-redux';
import AddSportsFormModel from './AddSportsFormModel';


const AddFacilities = () => {
  const [show, setShow] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [sportsTitle, setSportsTitle] = useState("")
  const dispatch = useDispatch()

  const handleClickModel = ()=>{
      setShow(true)
  }

  useEffect(() => {
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, []);

  return (
    <>
        <div className="container-fluid">
          <div className="card border-0 rounded-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-8 col-md-6 col-lg-3">
                  <div className="add-center rounded-3 d-flex flex-column align-items-center justify-content-center w-100 my-2">
                    <img
                      src={AddFacilitie}
                      alt="Add Facilities"
                      className="add-banner"
                      onClick={handleClickModel}
                    />
                    <div className="mt-2">
                      <p className="text-muted fw-light fs-5">Add Facilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AddSportsModel show={show} setShow={setShow} setPopUp = {setPopUp} setSportsTitle={setSportsTitle} />

        <AddSportsFormModel show={popUp} setShow={setPopUp} sportsTitle = {sportsTitle}/>

    </>
  )
}

export default AddFacilities