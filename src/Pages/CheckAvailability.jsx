import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PricingRuleAction } from "../Redux/Actions/PricingRuleAction";
// import { CostByPriceAction } from "../Redux/Actions/CostByPriceAction";

const CheckAvailability = ({setIsPricingTable}) => {
  const dispatch = useDispatch()
  const [isAddPlayer, setIsAddPlayer] = useState(false)
  const checkAvailabilitySelector = useSelector((state)=>state?.CheckAvailabilityReducer?.checkavailability?.data)

  const pricingRuleSelector = useSelector((state)=>state?.PricingRuleReducer?.pricingRule)
  console.log(pricingRuleSelector);
  const handleFacilityCheck=(id)=>{
    dispatch(PricingRuleAction(id))
  }

  const handleSave = ()=>{
    // dispatch(CostByPriceAction())
    setIsPricingTable(true)
  }

  const handleAddPlayer = ()=>{
    setIsAddPlayer(true)
  }
  return (
    <div>
        <div>
        <div>
          <label>Available Facility</label>
        </div>
        <div>
          {checkAvailabilitySelector?.map((val)=>(<Button className="p-0 px-2 mx-1"><small>{val?.title}</small></Button>))}
        </div>
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
                    <label className="mb-2">Facility *</label>
                    <div className="border border-1 overflow-auto check-height p-2">
                    {
  checkAvailabilitySelector?.map((val) => (
    <div className="form-check" key={val?.id}>
      <input
        type="radio"
        name="facility"
        value={val?.id}
        onChange={() => handleFacilityCheck(val?.id)}
      />
      <label className="ps-2">{val?.title}</label>
    </div>
  ))
}
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
                    <label className="mb-2">Pricing rule *</label>
                    <div className="border border-1 overflow-auto check-height p-2">
                    {
                      pricingRuleSelector?.map((rule)=>(
                        <div className="form-check" key={rule?.id}>
      <input
        type="radio"
        name="pricingrule"
        value={rule?.id}
      />
      <label className="ps-2">{rule?.pricingRule?.ruleName}</label>
    </div>
                      ))
                      }
                    </div>
                  </div>
                </div>
              </Col>
              <div className="mt-3">
                <Button className="float-end" onClick={handleSave}>Save</Button>
              </div>
            </Row>

            <div className="mt-3">
              <Button variant="danger" onClick={handleAddPlayer}>Add Player</Button>
            </div>
          </Form>
        </div>
        {isAddPlayer ? 
        <div className="mt-3">
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
        </div> : null}
        
    </div>
  );
};

export default CheckAvailability;
