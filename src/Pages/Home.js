import React from 'react'
import NavbarHeader from '../Components/Navbar'
import SideMenu from '../Components/SideMenu'
import { Col, Row } from 'react-bootstrap'
import Center from '../Components/Center'

const Home = () => {
  return (
    <>
    <NavbarHeader/>

        <Row className='w-100 h-100 m-0'>
            <Col lg={2} className='p-0'>
            <SideMenu/>
            </Col>
            <Col lg={10} className='p-0 form-login h-100 m-0'>
              <Center/>
            </Col>
        </Row>
    
    </>
  )
}

export default Home