import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {

  return (
   <>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
        />
   </>
  )
}

export default Loader