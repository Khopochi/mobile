import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import './completed.scss'
import ReactGA from 'react-ga';


const Completed = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
// import ReactGA from 'react-ga';
  return (
    <div>
        <div className="containerpay">
            <div className="icon"><FontAwesomeIcon icon={faCircleCheck} /></div>
            <div className="worder">Payment Successful</div>
        </div>
      
    </div>
  )
}

export default Completed
