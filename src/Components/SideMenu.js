import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <>
 <div class="d-flex flex-column flex-shrink-0 ms-4 me-2 pt-3 text-bg-white d-lg-block" >
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <Link to="#" class="nav-link active" aria-current="page">
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center ms-1 gap-1 text-danger'>
        <Icon icon="ic:baseline-home" color="#de342f" width="20" height="20" />
          <p className='m-0'>Home</p>
          </div>
          <div className='text-muted'>
          <Icon icon="iconamoon:arrow-right-2-light" width="20" height="20" />
          </div>
          </div>
        </Link>
      </li>
    </ul>
    
    </div>
    </>
  )
}
export default SideMenu