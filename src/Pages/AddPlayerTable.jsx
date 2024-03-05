import { Icon } from '@iconify/react'
import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import BookingContext from '../Components/BookingContext'

const AddPlayerTable = () => {
  const {bookingData,costValue} = useContext(BookingContext)
  return (
    <>
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
                <td>{bookingData.firstName}</td>
                <td>{bookingData.lastName}</td>
                <td>{bookingData.facilityTitle}</td>
                <td>{bookingData.pricingRuleTitle}</td>
                <td>${costValue}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <div>
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
    </>
  )
}

export default AddPlayerTable