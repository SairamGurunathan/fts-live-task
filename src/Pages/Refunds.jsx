import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Dropdown, Row, Table } from "react-bootstrap";
import Filter from "./Filter";
import { useDispatch } from "react-redux";
import { AccountAction } from "../Redux/Actions/AccountAction";

const Refunds = () => {
  const dispatch = useDispatch()
  const [showFilter, setShowFilter] = useState(false)
  const handleFilter = ()=>{
    setShowFilter(true)
  }

  useEffect(() => {
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="container-fluid">
        <Row className="mt-4">
          <Col lg={10}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-16">
                <li className="breadcrumb-item text-muted cursor-pointer">
                  Refunds
                </li>
                <li className="breadcrumb-item active text-dark fw-bold">
                  Pending
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
        <hr className="mt-1 w-100 opacity-25" />
        <Row className="d-flex flex-row align-items-center">
          <Col className="d-flex">
            <ul className="nav nav-pill bg-white rounded-4 p-1 refund-nav justify-content-around cursor-pointer">
              <div className="nav-link text-center px-2 py-1 active">
                Process
              </div>
              <div className="nav-link text-center px-2 py-1">Claim</div>
              <div className="nav-link text-center px-2 py-1">Past</div>
            </ul>
          </Col>
          
          <Col className="d-flex flex-row align-items-center justify-content-end gap-3">
            <div className="bg-white p-1 rounded-3">
              <Icon icon="mdi:filter" color="#de342f" className="fs-4" hFlip={true} onClick={handleFilter}/>
            </div>
            <div className="bg-white  rounded-3 dropdown">
              
              <Dropdown className="refund-drop" >
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-white border-0 p-1 ">
      <Icon
                icon="tabler:sort-descending-2"
                color="#de342f"
                className="fs-4 bg-white"
                hFlip={true}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >Name</Dropdown.Item>
        <Dropdown.Item >Booked</Dropdown.Item>
        <Dropdown.Item >Reservation Date</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            
            </div>
            
          </Col>
        </Row>
        
      </div>
      <div className="container">
        <Card className="border-0 rounded-4 mt-2">
          <CardBody className="py-0">
            <div className="row">
            <Table className="table table-spacing table-borderless" responsive="sm">
              <thead className="">
                <tr className="bg-white tableheadrow">
                  <th className="pb-0 text-nowrap">Reservation number</th>
                  <th className="pb-0">Name</th>
                  <th className="pb-0">Booking date</th>
                  <th className="pb-0 text-nowrap">Reservation date</th>
                  <th className="pb-0">Amount</th>
                  <th className="pb-0">Reason</th>
                </tr>
              </thead>
              
            </Table>
            <div className="mt-3"></div>
            </div>
            
          </CardBody>
        </Card>
      </div>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter}/>
    </>
  );
};

export default Refunds;
