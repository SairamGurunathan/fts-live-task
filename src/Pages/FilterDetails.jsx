import moment from 'moment/moment';
import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const FilterDetails = ({showFD,setShowFD}) => {
    const handleClose = () => setShowFD(false);
    const FDSelector = useSelector((state)=>state?.RefundFilterDetailsReducer?.filterDetails?.data)

    const dateObject = moment(FDSelector?.booking?.createdAt);
    const bookingDate = dateObject.format('MMMM Do, YYYY h A');

    const dateObject1 = moment(FDSelector?.booking?.startTime);
    const playDate = dateObject1.format('MMMM Do, YYYY h A');

    const dateObject2 = moment(FDSelector?.requestAt);
    const reservationDate = dateObject2.format('MMMM Do, YYYY h A');

  return (
    <>
    <Modal
    show={showFD}
    onHide={handleClose}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="my-modal"
    >
        <Modal.Header closeButton>
            Refunds Pending
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <label className='labels'>Name</label>
                    <p>{FDSelector?.facility?.title}</p>
                </Col>
                <Col>
                    <label className='labels'>Requested amount</label>
                    <p>${FDSelector?.reservation?.ratePerSession}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className='labels'>Booking date</label>
                    <p>{bookingDate}</p>
                </Col>
                <Col>
                    <label className='labels'>Play date</label>
                    <p>{playDate}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className='labels'>Requested date</label>
                    <p>{reservationDate}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className='labels'>Reason for cancellation</label>
                    <p>{FDSelector?.reason}</p>
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default FilterDetails