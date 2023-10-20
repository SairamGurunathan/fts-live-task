import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignIn from '../Components/SignIn';
import Logo from '../Assects/Images/Athlitik_White_New.6786b276b2b3fe3e797b7e8ac9f031c4.svg'
import Partnerwithus from '../Components/Partnerwithus';


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  
  return (
    <>
    <section className='homebanner'>
    <Container className='vh-100 d-flex flex-column'>

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
          <div className='form-login  mt-4 mx-5 rounded-3'>
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