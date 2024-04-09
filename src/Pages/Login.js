import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignIn from '../Components/SignIn';
import Logo from '../Assects/Images/brandLogo.png'
import Partnerwithus from '../Components/Partnerwithus';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  
  return (
    <>
    <section className='homebanner'>
    <Container className='min-vh-100 d-flex flex-column pb-3'>

        <div className='mt-5'>
            <img src={Logo} alt='logo' className='w-25'/>
        </div>
      <Row className='h-100'>
        <Col lg={7} className='text-center text-white d-flex flex-column justify-content-center align-items-center mt-5'>
        <h2>Book sports center</h2>
        <hr className='border my-4'/>
        <h2>Connect with other players</h2>
        <hr className='border my-4'/>
        <h2>Signup for lessons</h2>
        </Col>
        
        <Col lg={5} >   
          <div className='mt-4 mx-5'>
        {isSignIn ? (<SignIn setIsSignIn = {setIsSignIn}/>) : (<Partnerwithus setIsSignIn = {setIsSignIn}/>)}
        </div>
        </Col>
      </Row>
      
    </Container>
    </section>
    </>
  )
}

export default Login