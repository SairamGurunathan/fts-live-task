import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Assects/Images/Athlitik_White_New.6786b276b2b3fe3e797b7e8ac9f031c4.svg'
import { NavDropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';


const NavbarHeader= () => {
  return (
    <>
    <Navbar expand="lg" className="text-white bg-dark py-0 header">

      <Navbar.Brand href="#home">
            <img
              alt="logo"
              src={Logo}
              width="230px"
              className="d-inline-block align-top"
            />
        </Navbar.Brand>  
        <div className='d-flex align-items-center gap-1 ms-auto me-1'>
        <Icon icon="healthicons:ui-user-profile" className='fs-3'/>
        <NavDropdown title="Profile" id="collapsible-nav-dropdown" className='text-white fs-6 '>
              <NavDropdown.Item href="#action/3.1">Organization Info</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
            </div>
    </Navbar>
    </>
  )
}

export default NavbarHeader