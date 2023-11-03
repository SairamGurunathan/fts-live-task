import React, { useEffect } from "react";
import AddBanner from "../Assects/Images/addplus.svg";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { useDispatch, useSelector } from "react-redux";
import { CentersListAction } from "../Redux/Actions/CentersListAction";

const Center = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountDataSelector = useSelector(
    (state) => state.AccountReducer?.account
  );
  const centerListSelector = useSelector((state)=> state?.CenterReducer?.centerList)

  const handleClickFacilities = ()=>{
    navigate('/facilities')
  }

  useEffect(() => {
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accountDataSelector?.success) {
      dispatch(CentersListAction(accountDataSelector?.data?.orgId));
    }
    // eslint-disable-next-line
  }, [accountDataSelector]);
  return (
    <>
      <div className="container-fluid">
        <div className="mx-2">
          <h6 className="fw-bold mt-4">Center</h6>
          <hr className="mt-1 w-100 opacity-25" />
        </div>
        <div className="container">
          <div className="card border-0 rounded-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-8 col-md-6 col-lg-3">
                  <div className="add-center rounded-3 d-flex flex-column align-items-center justify-content-center w-100 my-2">
                    <img
                      src={AddBanner}
                      alt="Add Center"
                      className="add-banner"
                      onClick={() => navigate("/addcenter")}
                    />
                    <div className="mt-2">
                      <p className="text-muted fw-light fs-5">Add Center</p>
                    </div>
                  </div>
                </div>
                {centerListSelector.map((acc, index) => (
                <div className="col-sm-8 col-md-6 col-lg-3" onClick={handleClickFacilities}>           
                    <Card className="add-center-card mt-2" key={index}>
                      <CardHeader className="border-0 card-bg ">
                        <p className="m-0 pt-3 mt-5 text-white text-capitalize">{acc?.title}</p>
                      </CardHeader>
                      <CardBody className="py-1" >
                        <small className="m-0">{acc?.streetAddress}</small>
                        <div className="d-flex mb-3">
                        <small className="m-0">{acc?.city},</small>
                        <small className="m-0">{acc?.stateProvince}</small>
                        </div>
                        <p className="text-muted labels m-0">Business hours</p>
                        <p className="m-0">
                          {acc?.centerHours?.map((time,index)=>(
                          <small key={index}>{time?.weekday}{time?.startTime} to {time?.endTime}</small>))}
                        </p>
                        <button className="btn btn-outline btn-link text-decoration-none cursor-pointer">Show More...</button>
                      </CardBody>
                    </Card>       
                </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Center;
