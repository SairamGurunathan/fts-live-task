import React from 'react'
import NavbarHeader from '../Components/Navbar'
import SideMenu from '../Components/SideMenu'
import { Col, Row } from 'react-bootstrap'

const Home = () => {
  return (
    <>
    <NavbarHeader/>
    <div>
        <Row className='w-100'>
            <Col lg={2} className='p-0'>
            <SideMenu/>
            </Col>
            <Col lg={10} className='bg-main p-0'>
              
            </Col>
        </Row>
    </div>
    
    </>
  )
}

export default Home