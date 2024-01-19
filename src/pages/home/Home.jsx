import React, { useEffect, useState } from 'react';
import './home.scss';
import Discountcard from '../../components/Discountcard';
import Categoriescard from '../../components/Categoriescard';
import axios from 'axios';
import { FadeLoader } from 'react-spinners'
<<<<<<< HEAD
import icon1 from '../../image/5988246.png'
import icon2 from '../../image/kitchen.png'
import icon3 from '../../image/crane.png'
import icon4 from '../../image/electronics.png'
import icon5 from '../../image/rc-car.png'
import icon6 from '../../image/brand.png'
import icon7 from '../../image/pipes.png'
import icon8 from '../../image/stationary (2).png'
import icon9 from '../../image/car.png'
import icon10 from '../../image/construction.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import DiscountShope from '../../components/DiscountShope';
import CardCategory from '../../components/CardCategory';
=======
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
>>>>>>> a47700e53d2fd57e3812df8e7966018fea8b918f

const Home = () => {
    const [load,setLoader] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://amazcart.ischooll.com/public/uploads/images/04-01-2023/63b508b5b7c35.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/05-01-2023/63b6990a4cd4d.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/03-01-2023/63b43e3b21095.jpeg'
  ];

  const [currentTime, setCurrentTime] = useState(new Date());
  let storedProducts = sessionStorage.getItem('products');
  let storedHomeData = sessionStorage.getItem('homeData');
  let storedShuffled = sessionStorage.getItem('shuffled');
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  const fetchData = async () => {
    try {
      const product = await axios.get(process.env.REACT_APP_API_URL + "product/getproducts");
      return product.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const fetchHome = async () => {
    try {
      const product = await axios.get(process.env.REACT_APP_API_URL + "product/home");
      return product.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const fetchShuffle = async () => {
    try {
      const product = await axios.get(process.env.REACT_APP_API_URL + "product/getshuffle");
      return product.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {

    if(storedHomeData){

    }else{
      const fetchDataAsync = fetchData();
      const fetchHomeAsync = fetchHome();
      const fetchShuffleAsync = fetchShuffle();
  
      Promise.all([fetchDataAsync, fetchHomeAsync, fetchShuffleAsync]).then(([products, homeData, shuffled]) => {
        // Check if any of the data is not null before updating state
        if (products !== null) setProducts(products);
        if (homeData !== null) setHomeData(homeData);
        if (shuffled !== null) setShuffled(shuffled);
        setLoader(false)
  
          sessionStorage.setItem('products', JSON.stringify(products));
          sessionStorage.setItem('homeData', JSON.stringify(homeData));
          sessionStorage.setItem('shuffled', JSON.stringify(shuffled));
          sessionStorage.setItem('jiabaitime', currentTime);
      });
    }
  }, []);

  // Use local state for products, homeData, and shuffled


    const [products, setProducts] = useState(storedProducts ? JSON.parse(storedProducts) : null);
    const [homeData, setHomeData] = useState(storedHomeData ? JSON.parse(storedHomeData) : null);
    const [shuffled, setShuffled] = useState(storedShuffled ? JSON.parse(storedShuffled) : null);


  // Use browser storage to cache data
  useEffect(() => {
    // Save data to sessionStorage
    sessionStorage.setItem('products', JSON.stringify(products));
    sessionStorage.setItem('homeData', JSON.stringify(homeData));
    sessionStorage.setItem('shuffled', JSON.stringify(shuffled));
  }, [products, homeData, shuffled]);

//   Check sessionStorage on component mount
  useEffect(() => {
    if(storedProducts && storedHomeData && storedShuffled ){
        setLoader(false)
    }
  }, []);

  console.log(sessionStorage.getItem('jiabaitime'))




  return (
    <div className="home">
        {load && <div className="loader">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#E3242B" />
            loading items...
        </div>}
        <div className="image-sliderrr">
            {images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className={index === currentIndex ? 'active' : ''}
                style={{ transform: `translateY(${(index - currentIndex) * 100}%)` }}
            />
        ))}
        </div>
<<<<<<< HEAD
        <div className="shopdeeSubcategories">
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon1} alt="" />
              </div>
              <div className="shopdeeword">Appliances </div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon2} alt="" />
              </div>
              <div className="shopdeeword">Kitchen</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon3} alt="" />
              </div>
              <div className="shopdeeword">Tools</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon4} alt="" />
              </div>
              <div className="shopdeeword">Electronics</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon5} alt="" />
              </div>
              <div className="shopdeeword">Toys</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon6} alt="" />
              </div>
              <div className="shopdeeword">Fashion</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon7} alt="" />
              </div>
              <div className="shopdeeword">Hardware</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon8} alt="" />
              </div>
              <div className="shopdeeword">Stationary</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon9} alt="" />
              </div>
              <div className="shopdeeword">Automobile</div>
           </div>
           <div className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon10} alt="" />
              </div>
              <div className="shopdeeword">Construction</div>
           </div>
        </div>
        <div className="homeseperator"></div>
        <div className="shopediscount">
           <div className="sdiscotop">
              <div className="stleft">BEST DEALS</div>
              <div className="stright"><span>View more</span> <FontAwesomeIcon icon={faAngleRight} /></div>
           </div>
           <div className="sdiscodown">
              {shuffled && <>
                {
                  Array(6).fill().map((_, index) => (
                    <DiscountShope key={index} data={shuffled[index]} />
                  ))
                }
              </>}
           </div>
        </div>
        <div className="homeseperator"></div>
        <div className="cardcardcatt">
          {homeData && <>
            {
                homeData?.map((item,index)=>(
                    <div key={index}>
                      <CardCategory key={index} data={item}/>
                      <div className="homeseperator"></div>
                    </div>
                ))
            }
          </>}
        </div>




        {/* <div className="discount">
=======
        <div className="ourparteners">
          <div className="partholder">
              <div className="partitem">
                 <div className="particon"><PeopleOutlineOutlinedIcon fontSize='large'/></div>
                 <div className="partword">Buyers countrywide</div>
              </div>
              <div className="partitem">
                 <div className="particon"><LocalShippingOutlinedIcon fontSize='large'/></div>
                 <div className="partword">Fast Delivery</div>
              </div>
              <div className="partitem">
                 <div className="particon"><CreditCardOutlinedIcon fontSize='large'/></div>
                 <div className="partword">Safe Payments</div>
              </div>
              <div className="partitem">
                 <div className="particon"><GppGoodOutlinedIcon fontSize='large'/></div>
                 <div className="partword">Buyer Protection</div>
              </div>
          </div>
        </div>

        <div className="newdiscount">
          <div className="left-new">
            <div className="img">
              <img src="https://api.jiabaili.shop/api/photos/159274_MG_0811.jpg" alt="" />

            </div>
          </div>
          <div className="right">
            <div className="topright">
              The Best Product are here
            </div>
          </div>

        </div>
        <div className="discount">
>>>>>>> a47700e53d2fd57e3812df8e7966018fea8b918f
            <div className="title">
                <div className="father">Best deals</div>
                <div className="son">Up to 30% discount</div>
            </div>
            <div className="holderslider">
                {
                    shuffled?.map((item,index)=>(
                        <Discountcard data={item} key={index}/>
                    ))
                }
            </div>

        </div>
        <div className="categorymother">
<<<<<<< HEAD
            {
                homeData?.map((item,index)=>(
                    <Categoriescard key={index} data={item}/>
                ))
            }
        </div> */}
=======
    {homeData?.map((item, index) => (
        <React.Fragment key={index}>
            <Categoriescard data={item} />
            {(index + 1) % 2 === 0 && (
                <div className="image-sliderrr2">
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            alt={`Image ${i + 1}`}
                            className={i === currentIndex ? 'active' : ''}
                            style={{ transform: `translateY(${(i - currentIndex) * 100}%)` }}
                        />
                    ))}
                </div>
            )}
        </React.Fragment>
    ))}
</div>
>>>>>>> a47700e53d2fd57e3812df8e7966018fea8b918f
    </div>
  )
}

export default Home
