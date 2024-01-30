import React from 'react'
import './searchcard.scss'
import tag from '../image/tag.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'


const Searchcard = ({data}) => {
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
    <div onClick={()=>viewProduct()} className='searchcard'>
      <div className="imagearea">
        <div className="image"><img src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" /></div>
        <div className="quality">
          <div className="text10">{data.discount}%</div>
        </div>
        <div className="lowerstock">
             {data.quantity} | Stock
          </div>
        <div className="discountimage"></div>
      </div>
      <div className="detailsarea">
        <div className="itemname">
          {data.name}
        </div>
        <div className="lebal">
          Top quality
        </div>
        <div className="priceandquantity">
           <span className="price">
              <span className="mwk">MKW</span>
              <span className="amountfigure">{calculateDiscountedPrice(data.price,data.discount)}</span>
           </span>
           <span className="quantity">mwk{formatNumberWithCommas(data.price)}</span>
        </div>
      </div>
      <div className="rating">
          <span>Rating | 4.5 |</span>
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon className='rated' icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
      </div>
      
    </div>
  )
}

export default Searchcard
