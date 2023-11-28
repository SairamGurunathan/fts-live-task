import React, { useEffect } from 'react'
import { Card, CardBody, Col, Modal, Row } from 'react-bootstrap'
import { SportsList } from '../Redux/Actions/SportsPhotosAction'
import { useDispatch, useSelector } from 'react-redux'
import { AccountAction } from '../Redux/Actions/AccountAction'

const AddSportsModel = ({show,setShow,setPopUp,setSportsTitle}) => {
    const dispatch = useDispatch()
    

    const handlePopUp = (title) => {
      setPopUp(true)
      setShow(false)
      setSportsTitle(title)
    }
    const handleClose = () => setShow(false);

    const sportsListSelector = useSelector((state) => state?.SportsListReducer?.sportsList)

    useEffect(()=>{
      dispatch(AccountAction()) 
        if(sportsListSelector !== undefined){
            dispatch(SportsList(sportsListSelector));
          }
        // eslint-disable-next-line
    },[AccountAction])
  return (
    <>
    <Modal
    show = {show}
    onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <small>Add</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
                <Row className='row-gap-4'>
                {sportsListSelector?.data?.map((sports,index)=>(
                    <Col lg={3}>
                            <Card onClick={()=>handlePopUp(sports?.title)}>
                            <CardBody key={index} className='d-flex flex-column align-items-center justify-content-center'>
                                <img src={sports?.url} alt='img-sport'/>
                                <p className='m-0 fw-bold'>{sports?.title}</p>
                            </CardBody>
                        </Card>
                    </Col>
                    ))}
                </Row>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default AddSportsModel