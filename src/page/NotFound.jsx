import React from 'react'
import Notfound from './img/Notfound.png' 

const NotFound = () => {
  return (
    <div id="wrapper">
            
            <div id="info" className="text-center mt-5 p-5" >
                <h3>This page could not be found</h3>
                <img src={Notfound} />
            </div>
        </div >
  )
}

export default NotFound