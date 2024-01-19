import React from 'react'
import './discountshope.scss'
import { useNavigate } from 'react-router-dom';

const Discountcardcard = ({data}) => {
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
    <div onClick={()=>viewProduct()} className='discountshope addition'>
    <div className="shimage">
        <img src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" />
        <div className="disfigure">10%</div>
        <div className="quantityshd">{data.quantity} Qty</div>
    </div>
    <div className="shopdetails">
        <div className="priceshope">
            <spam className="mkwkw">MWK</spam>  <span className="fgure">{calculateDiscountedPrice(data.price,data.discount)}</span>
        </div>
        
        <div className="nameshope">
            {data.name}
        </div>
        <div className="typicalshopeprice">
            <span className="mkwkw">MWK {formatNumberWithCommas(data.price)}</span>
        </div>
    </div>
</div>
  )
}

export default Discountcardcard
