import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import './completed.scss'

const Completed = () => {
  return (
    <div>
        <div className="containerpay">
            <div className="icon"><FontAwesomeIcon icon={faCircleCheck} /></div>
            <div className="word">Payment Successful</div>
        </div>
      
    </div>
  )
}

export default Completed
