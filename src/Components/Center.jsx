import React, { useEffect } from 'react';
import AddBanner from "../Assects/Images/addplus.svg"
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'react-bootstrap';
import { AccountAction } from '../Redux/Actions/AccountAction';
import { useDispatch } from 'react-redux';

const Center = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(AccountAction())    
        // eslint-disable-next-line
    },[])
  return (
    <>
    <div className='container-fluid'>
        <div className='mx-2'>
    <h6 className='fw-bold mt-4'>Center</h6>
    <hr className='mt-1 w-100 opacity-25'/>
    </div>
    <div className='container'>
        <div className="card rounded-4">
            <div className="card-body">
                <div className="row m-0">
                    <div className="col-md-6 col-lg-3">
                        <div className='add-center rounded-3 d-flex flex-column align-items-center justify-content-center w-100 my-2'>
                        <img src={AddBanner} alt="Add Center" className='add-banner' onClick={()=>navigate('/addcenter')}/>
                        <div className='mt-2'>
                            <p className='text-muted fw-light fs-5'>Add Center</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Card className='add-center-card mt-2'>
                            <CardHeader className='border-0'>
                                <p className='pt-4'>Center</p>
                            </CardHeader>
                            <CardBody className='py-2'>
                                <p className='m-0'>address</p>
                                <p className='m-0 mb-2'>State</p>
                                <p className='text-muted fw-bold'>Business hours</p>
                                <p className='m-0'><small>Sun - Sat: 5:30 AM To 10:00 PM</small></p>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-6 col-lg-3"></div>
                    <div className="col-md-6 col-lg-3"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Center