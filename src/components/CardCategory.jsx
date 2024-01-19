import React from 'react'
import './cardcategory.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import Discountcardcard from './Discountcardcard'

const CardCategory = ({data}) => {
  return (
    <div className='cardcategory'>
      <div className="cctop">
        <div className="cctopleft">{data.category.name}</div>
        <div className="cctopright"><span>View more</span>  <FontAwesomeIcon icon={faAngleRight} /></div>
      </div>
      <div className="ccnegotiator">
        <div className="itemccn">
            <div className="ccicon"><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div className="ccitemword">Secure payments</div>
        </div>
        <div className="itemccn">
            <div className="ccicon"><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div className="ccitemword">Safe delivery</div>
        </div>
        <div className="itemccn">
            <div className="ccicon"><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div className="ccitemword">Customer protection</div>
        </div>
      </div>
      <div className="cccover loading">
            <div className="cccoverinside">

            </div>
        </div>
        <div className="imageproductsarae">
                {
                    data.products.map((item,index)=>(
                        <Discountcardcard key={index} data={item} />
                    ))
                }
        </div>
    </div>
  )
}

export default CardCategory
