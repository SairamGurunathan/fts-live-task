import { Icon } from "@iconify/react";
import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const CheckAvailability = () => {
  return (
    <div>
      <div>
        <div>
          <label>Available Facility</label>
        </div>
        <div>
          <label>Player Details</label>
          <Form>
            <Row>
              <Col>
                <div className="d-flex flex-column justify-content-between mt-4">
                  <div>
                    <label className="mb-2">First Name</label>
                    <Form.Control type="text" />
                  </div>
                  <div>
                    <label className="mb-2">Phone Number</label>
                    <Form.Control type="text" />
                  </div>
                  <div>
                    <label>Facility *</label>
                    <div className="border border-1">
                      <Form.Check
                        type="radio"
                        // id={`default-${type}`}
                        // label={`default ${type}`}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex flex-column justify-content-between mt-4">
                  <div>
                    <label className="mb-2">Last Name</label>
                    <Form.Control type="text" />
                  </div>
                  <div>
                    <label className="mb-2">Email Address</label>
                    <Form.Control type="text" />
                  </div>
                  <div>
                    <label>Pricing rule *</label>
                    <div className="border border-1">
                      <Form.Check
                        type="radio"
                        // id={`default-${type}`}
                        // label={`default ${type}`}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <div className="mt-3">
                <Button className="float-end">Edit</Button>
              </div>
            </Row>

            <div className="mt-3">
              <Button variant="danger">Add Player</Button>
            </div>
          </Form>
        </div>
        <div>
          <label>Added Player's</label>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Facility name</th>
                <th>Pricing rule name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <div >
                    <Icon icon="fa-regular:edit" />
                    </div>
                    <div>
                    <Icon icon="ic:outline-delete" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CheckAvailability;
