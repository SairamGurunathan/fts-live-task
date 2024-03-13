import { Icon } from '@iconify/react'
import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import BookingContext from '../Components/BookingContext'

const AddPlayerTable = () => {
  const {addPlayerBooking,setAddPlayerBooking} = useContext(BookingContext)
  const  handleDelete= (index)=>{
    const updatedPlayerList = addPlayerBooking?.filter((_,i)=>i !== index)
    setAddPlayerBooking(updatedPlayerList)
  }
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
              {addPlayerBooking?.map((player,index)=>(
                 <tr key={index}>
                 <td>{index + 1}</td>
                 <td>{player.firstName}</td>
                 <td>{player.lastName}</td>
                 <td>{player.facility} </td>
                 <td>{player.pricingRule}</td>
                 <td>${player.perHourCost}</td>
                 <td>
                   <div className="d-flex align-items-center justify-content-center">
                     <div className='btn'>
                       <Icon icon="fa-regular:edit" />
                     </div>
                     <div className='btn fs-3'>
                       <Icon icon="ic:outline-delete" onClick={()=>handleDelete(index)}/>
                     </div>
                   </div>
                 </td>
               </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </>
  )
}

export default AddPlayerTable