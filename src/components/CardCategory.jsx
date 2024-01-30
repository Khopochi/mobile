import React from 'react'
import './cardcategory.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import Discountcardcard from './Discountcardcard'
import { useNavigate } from 'react-router-dom'

const CardCategory = ({data}) => {
  const navigate = useNavigate()
  return (
    <div className='cardcategory'>
      <div className="cctop">
        <div onClick={()=>navigate("/categories/"+data.category._id)} className="cctopleft">{data.category.name}</div>
        <div className="cctopright"><span onClick={()=>navigate("/categories/"+data.category._id)}>View more</span>  <FontAwesomeIcon icon={faAngleRight} /></div>
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
            <div className="cccoverinside" style={{ backgroundImage: `url(https://api.jiabaili.shop/api/photos/${data.category._id}.jpg)` }}>
                
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
