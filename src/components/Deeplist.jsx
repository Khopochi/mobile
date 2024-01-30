import React from 'react'
import './deeplist.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Deeplist = ({data}) => {
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
    };
    const calculateDiscountedPrice = (price,discount) => {
        if(!discount)
            return formatNumberWithCommas(price)
            

        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice)
    };
    const navigate = useNavigate()
      const viewProduct = () => {
        navigate("/viewproduct/"+data._id, {state: {data}})
      }
  return (
    <div onClick={()=>viewProduct()} className="fada">
    <div className="product-container">
    <div className="left-container">
      <img
        className="product-image"
        src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]}
        alt="Product Image"
      />
    </div>
    <div className="right-container">
      <div className="product-info-d">
            <div className="product-info">
            <span className='name'>{data.name}</span>
            <span className='quantity'>In stock | {data.quantity}</span>
            <span className='price'><span className="mwk">MWK</span> <span className="actualfiguredeep">{calculateDiscountedPrice(data.price,data.discount)}</span></span>
            <span className="discountdeep">10% discount</span>
            <div className="actualprice">MWK {data.price}</div>
        </div>
        <div className="rightright">
            <div className="buttoncircle">
                <span className="word">View</span>
                <FontAwesomeIcon icon={faArrowCircleRight} />
            </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Deeplist
