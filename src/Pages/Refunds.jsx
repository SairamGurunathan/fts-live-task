import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Card, CardBody, Col, Row, Table } from "react-bootstrap";
import Filter from "./Filter";

const Refunds = () => {
  const [showFilter, setShowFilter] = useState(false)
  const handleFilter = ()=>{
    setShowFilter(true)
  }
  return (
    <>
      <div className="container-fluid overflow-auto">
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
        <Row className="d-flex flex-row justify-content-between align-items-center">
          <Col lg={3}>
            <ul className="nav nav-pill bg-white rounded-4 p-1">
              <div className="nav-link text-center px-2 py-1 active">
                Process
              </div>
              <div className="nav-link text-center px-2 py-1">Claim</div>
              <div className="nav-link text-center px-2 py-1">Past</div>
            </ul>
          </Col>
          <Col></Col>
          <Col className="d-flex flex-row align-items-center justify-content-center text-end gap-3">
            <div className="bg-white p-1">
              <Icon icon="mdi:filter" color="#de342f" hFlip={true} onClick={handleFilter}/>
            </div>
            <div className="bg-white">
              <Icon
                icon="tabler:sort-descending-2"
                color="#de342f"
                hFlip={true}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="bg-white p-0 mx-3">
        <Card className="border-0 rounded-4 mt-2">
          <CardBody className="p-0">
            <Table className="table" responsive="sm">
              <thead>
                <tr>
                  <th>Reservation number</th>
                  <th>Name</th>
                  <th>Booking date</th>
                  <th>Reservation date</th>
                  <th>Amount</th>
                  <th>Reason</th>
                </tr>
              </thead>
              {/* <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody> */}
            </Table>
          </CardBody>
        </Card>
      </div>
      <Filter showFilter={showFilter}/>
    </>
  );
};

export default Refunds;
