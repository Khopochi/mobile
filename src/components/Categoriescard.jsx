import React from 'react'
import './categoriescard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Imageforcatcard from './Imageforcatcard'

const Categoriescard = ({data}) => {
    
    
  return (
    <div className='categoriescard'>
        <div className="topper">
            <div className="left">
                <div className="upper">{data.category.name}</div>
                <div className="lower">
                    <div className="span">25 Subcategories</div>
                </div>
            </div>
            <div className="right">
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
        <div className="downerr">
                {
                    data.products.map((item,index)=>(
                        <Imageforcatcard key={index} data={item} />
                    ))
                }
        </div>
      
    </div>
  )
}

export default Categoriescard
