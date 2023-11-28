import React, { useEffect } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AccountAction } from '../Redux/Actions/AccountAction';

const CourtDetails = ({showCD,setShowCD}) => {
  const dispatch = useDispatch()
    const handleClose = () => setShowCD(false);

    const courtDetailSelector = useSelector((state)=>state?.CourtDetailsReducer?.courtDetails)
    console.log(courtDetailSelector);

    useEffect(()=>{
      dispatch(AccountAction()) 
        // eslint-disable-next-line
    },[])
    console.log(courtDetailSelector?.center?.displayName)
  return (
    <Modal
        show={showCD}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <small>Court details</small>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row    >
                <Col lg={7}>
                    <label>
                        <strong>Name</strong>
                    </label>
                    <hr className='w-100'/>
                    <Row >
                        <Col lg={5}>
                        <p>{courtDetailSelector?.title}</p>
                        </Col>
                        <Col lg={7}>
                        <div className="d-flex gap-2">
                <Form.Check type="checkbox" checked={courtDetailSelector?.center?.displayName}/>
                
                <label>Open to Athlitik users</label>
              </div>
                        </Col>
                    </Row>
                    
                </Col>
                <Col lg={5}>
                <label>
                        <strong>Timings</strong>
                    </label>
                    <hr className='w-100'/>
                    {/* <p>{courtDetailSelector}</p> */}
                </Col>
            </Row>
            <div>
            <label>
                <strong>Reseravtion attributes</strong>
            </label>
            <hr className='w-100'/>
            <Row>
                <Col>
                <p className='mb-0'>
                Players allowed
                </p>
                <div className='mb-3  mt-1'>
                <strong>{courtDetailSelector?.reservationAttribute?.playerAllowedMin} - {courtDetailSelector?.reservationAttribute?.playerAllowedMax}</strong>
                </div>
                </Col>
                <Col>
                <p className='mb-0'>
                Duration allowed
                </p>
                <div className='mb-3 mt-1'>
                <strong className='mb-3'>{courtDetailSelector?.reservationAttribute?.durationAllowedMin} - {courtDetailSelector?.reservationAttribute?.durationAllowedMax} hours</strong>
                </div>
                </Col>
                <Col>
                <p className='mb-0'>
                Advance booking window
                </p>
                <div className='mb-3 mt-1'>
                <strong >{courtDetailSelector?.reservationAttribute?.advanceBookingMin} - {courtDetailSelector?.reservationAttribute?.advanceBookingMax} hours</strong>
                </div>
                </Col>
            </Row>
            </div>
            <div>
                <label>
                <strong className='mb-3'>Court highlights</strong>
                </label>
            <hr className='w-100'/>
            <p className='text-muted m-0'>
            Features
            </p>
            <div className='mb-3 mt-1'>
            {courtDetailSelector?.facilityMetas?.map((val,index)=>(
              <strong >{val?.value}{index===courtDetailSelector?.facilityMetas?.length-1 ? "" :  <span> | </span>} </strong>
            ))}
            </div>
            
            </div>
            <label className='text-muted'>Images</label>
            {courtDetailSelector?.photo ? <img src={courtDetailSelector?.photo} alt="photos" className='img-thumbnail float-start' /> : <p className='m-3 p-3'></p>}
            
        </Modal.Body>
        <Modal.Footer className="bg-white">
        <div className="d-flex gap-2 justify-content-end">
                      <Button
                        variant="outline-primary"
                        className="border-0 text-danger"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="btn-danger text-white">
                        Edit
                      </Button>
                    </div>
        </Modal.Footer>
      </Modal>
  )
}

export default CourtDetails