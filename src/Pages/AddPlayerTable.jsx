import { Icon } from '@iconify/react'
import React from 'react'
import { Table } from 'react-bootstrap'

const AddPlayerTable = () => {
  
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
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
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