import React from 'react'
import './discountcard.scss'
import { useNavigate } from 'react-router-dom';

const Discountcard = ({data}) => {
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
    <div onClick={()=>viewProduct()} className='discountcard'>
        <div className="image">
            <img  src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" />
        </div>
        <div className="price">
            <div className="figure">
                MWK {calculateDiscountedPrice(data.price,data.discount)}
            </div>
        </div>
      
    </div>
  )
}

export default Discountcard
