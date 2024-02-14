import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import moment from "moment/moment";
import AddBanner from "../Assects/Images/addplus.svg";
import { CentersListAction } from "../Redux/Actions/CentersListAction";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { getWeekDayFormat } from "../Utilities/Utility";


const Center = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountDataSelector = useSelector(
    (state) => state.AccountReducer?.account
  );
  const centerListSelector = useSelector(
    (state) => state?.CenterReducer?.centerList
  );

  const handleClickFacilities = (i) => {
    localStorage.setItem("centerId", centerListSelector[i]?.id);
    navigate("/facilities");
  };

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

  const renderSkeletonLoader = () => {
    return (
      <div className="col-sm-8 col-md-6 col-lg-3">
        <Card className="add-center-card custom-index my-2">
          <Skeleton height={270}/>
        </Card>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <Row className="mt-4">
          <Col lg={12} md={12} sm={12}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-16 m-0">
                <li className="breadcrumb-item active fw-bold text-dark">
                  Center
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
        <hr className="mt-1 w-100 opacity-25" />

        <div className="card border-0 rounded-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-8 col-md-6 col-lg-3">
                <div className="add-center rounded-3 d-flex flex-column align-items-center justify-content-center w-100 my-2">
                  <img
                    src={AddBanner}
                    alt="Add Center"
                    className="add-banner cursor-pointer rounded-3"
                    onClick={() => navigate("/addcenter")}
                  />
                  <div className="mt-2">
                    <p className="text-muted fw-light fs-5">Add center</p>
                  </div>
                </div>
              </div>
              {centerListSelector.length === 0 ? 
              Array.from({ length: 3 }, (_, index) => (
                renderSkeletonLoader(index)
              )) :
              centerListSelector?.map((acc, index) => (
                <div
                  className="col-sm-8 col-md-6 col-lg-3"
                  onClick={() => handleClickFacilities(index)}
                >
                  <Card className="add-center-card custom-index my-2" key={index}>
                    <CardHeader className="border-0 card-bg card-img-top p-0">
                      {acc?.photos[0]?.url ? (
                        <img
                          src={acc?.photos[0]?.url}
                          alt="photos"
                          className="card-img"
                        />
                      ) : (
                        <img 
                        src=""
                        alt=""
                          className="card-img"/>
                      )}
                      <div className="pt-3 mt-5 text-white text-capitalize card-img-overlay">
                        <h6 className="d-inline-block text-truncate crd-title">{acc?.title}</h6>
                      </div>
                    </CardHeader>

                    <CardBody className="py-2 card-content cursor-pointer location px-lg-2 px-md-1">
                      <div className="d-inline-block text-truncate">
                      <small className="m-0">{acc?.streetAddress}</small></div>
                      <div className="d-flex mb-3">
                        <small className="m-0">{acc?.city},</small>
                        <small className="m-0">{acc?.stateProvince}</small>
                      </div>
                      <p className="text-muted labels m-0">Business hours</p>
                      <p className="m-0">
                        {acc?.centerHours?.map((time, index) => {
                          if (time.startTime && time.endTime) {
                            time.startTime=(moment(time?.startTime,"hh:mm A"));
                            time.endTime=(moment(time?.endTime,"hh:mm A"));
                            const formattedWeekday = getWeekDayFormat(time?.weekday);
                          return(
                          <small key={index}>
                            {formattedWeekday}{" : "}
                            {moment(time?.startTime).format('hh:mm A')} To {moment(time?.endTime).format('hh:mm A')}<br></br>
                          </small>)
                          } else {
                            return null;
                          }
                          })}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Center;
