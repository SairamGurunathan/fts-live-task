import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

const Filter = ({showFilter, setShowFilter}) => {
    const handleClose = () => setShowFilter(false);
  return (
    <>
    <Modal
    show={showFilter}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="my-modal">
        <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <small>Refunds filter</small>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <label>
                Reservation number
                </label>
                <input />
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default Filter