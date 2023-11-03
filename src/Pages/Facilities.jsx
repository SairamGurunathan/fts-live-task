import React from 'react'
import NavbarHeader from '../Components/Navbar'
import SideMenu from '../Components/SideMenu'
import { Col, Row } from 'react-bootstrap'

const Facilities = () => {
  return (
    <>
    <NavbarHeader/>
    <Row className="w-100 vh-100 m-0">
      <Col lg={2} md={4} sm={4} className="p-0">
          <SideMenu/>
      </Col>
      <Col lg={10} md={8} sm={8} className="p-0 form-login h-100 m-0">
        <div className="container-fluid">

        </div>
      </Col>
    </Row>
    </>
  )
}

export default Facilities