import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();  

  const isCenterRoute = location.pathname !== "/center" && location.pathname !== "/addcenter" && location.pathname !== "/organizationinfo";

  return (
    <>
 <div class="d-flex flex-column px-2 pt-3 bg-white h-100 overflow-hidden sidebar" >
    <ul class="nav nav-pills flex-column mb-auto gap-2">
    
      <li class="nav-item" onClick={()=>navigate('/center')}>
        <Link to="#" class="nav-link active" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
        <Icon icon="ic:baseline-home" color="#de342f" width="20" height="20" />
          <p className='m-0 side-text'>Home</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>

      {isCenterRoute && (
      <li class="nav-item" onClick={()=>navigate('/facilities')}>
        <Link to="#" class="nav-link" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
                <Icon icon="ri:home-gear-fill" color="#de342f" width="20" height="20" />          
                <p className='m-0 side-text'>Facilities</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>
      )}

      {isCenterRoute && (
      <li class="nav-item">
        <Link to="#" class="nav-link" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
                <Icon icon="raphael:dollar" color="#de342f" width="20" height="20"/>          
                <p className='m-0 side-text'>Pricing</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>
      )}
      
      {isCenterRoute && (
      <li class="nav-item" >
        <Link to="#" class="nav-link" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
                <Icon icon="lucide:list-todo" color="#de342f" width="20" height="20"/>
              <p className='m-0 side-text'>Reservation</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>
      )}

      {isCenterRoute && (
      <li class="nav-item" >
        <Link to="#" class="nav-link" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
                <Icon icon="ri:refund-2-line" color="#de342f" width="20" height="20"/>
          <p className='m-0 side-text'>Refunds</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>
      )}

      {isCenterRoute && (
      <li class="nav-item" >
        <Link to="#" class="nav-link" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
                <Icon icon="fa-solid:user-cog" color="#de342f" width="20" height="20" />
          <p className='m-0 text-nowrap side-text'>User Management</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>
      )}
    </ul>
    
    </div>
    </>
  )
}
export default SideMenu