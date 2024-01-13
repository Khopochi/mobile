import React from 'react'
import './imageforcatcard.scss'
import { useNavigate } from 'react-router-dom';

const Imageforcatcard = ({data}) => {
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
    const truncateString = (str, maxLength) => {
        if (str.length <= maxLength) {
          return str;
        } else {
          return str.slice(0, maxLength) + '...';
        }
      };
      const navigate = useNavigate()
      const viewProduct = () => {
        navigate("/viewproduct/"+data._id, {state: {data}})
      }
  return (
    <div onClick={()=>viewProduct()} className='imageforcatcard'>
        <div className="image">
            <img src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" />
        </div>
        <div className="details">
            <div className="name">
                {truncateString(data.name,18)} 
            </div>
            <div className="price">
                <div className="mwk">MWK</div>
                <div className="figureprice">{calculateDiscountedPrice(data.price,data.discount)}</div>
            </div>
            <div className="discountprice">
                10% Discount
            </div>
            <div className="typicalprice">
                MWK {data.price}
            </div>
        </div>
      
    </div>
  )
}

export default Imageforcatcard
