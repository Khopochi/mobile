import React, { useEffect, useState } from 'react';
import './home.scss';
import Discountcard from '../../components/Discountcard';
import Categoriescard from '../../components/Categoriescard';
import axios from 'axios';
import { FadeLoader } from 'react-spinners'
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
import ReactGA from 'react-ga';
import one from '../../image/1.jpg'
import two from '../../image/2.jpg'
import three from '../../image/4.jpg'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
// import ReactGA from 'react-ga';
  
    const [load,setLoader] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    one,
    two,
    three
  ];

  const navigate = useNavigate()

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
      //console.error(err);
      return null;
    }
  };

  const fetchHome = async () => {
    try {
      const product = await axios.get(process.env.REACT_APP_API_URL + "product/home");
      return product.data;
    } catch (err) {
      //console.error(err);
      return null;
    }
  };

  const fetchShuffle = async () => {
    try {
      const product = await axios.get(process.env.REACT_APP_API_URL + "product/getshuffle");
      return product.data;
    } catch (err) {
      //console.error(err);
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

  //console.log(sessionStorage.getItem('jiabaitime'))




  return (
    <div className="home">
        {load && <div className="loader">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#E3242B" />
            loading items...
        </div>}
        <div className="image-sliderrr">
            <div className="background">
              <div className="bkinside">
                  <div className="insideagainbk">
                    <div className="bkword">
                      {/* Your Ultimate Destination for Online Shopping */}
                    </div>
                  </div>
              </div>
            </div>
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
        <div className="shopdeeSubcategories">
           <div onClick={()=>navigate("/categories/657952bb37e8cd6092d11d12")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon1} alt="" />
              </div>
              <div className="shopdeeword">Appliances </div>
           </div>
           <div onClick={()=>navigate("/categories/6579521f37e8cd6092d11cf2")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon2} alt="" />
              </div>
              <div className="shopdeeword">Kitchen</div>
           </div>
           <div onClick={()=>navigate("/categories/657951f837e8cd6092d11cee")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon3} alt="" />
              </div>
              <div className="shopdeeword">Tools</div>
           </div>
           <div onClick={()=>navigate("/categories/657951ec37e8cd6092d11cde")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon4} alt="" />
              </div>
              <div className="shopdeeword">Electronics</div>
           </div>
           <div onClick={()=>navigate("/categories/6579522f37e8cd6092d11cfa")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon5} alt="" />
              </div>
              <div className="shopdeeword">Toys</div>
           </div>
           <div onClick={()=>navigate("/categories/6579523937e8cd6092d11cfe")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon6} alt="" />
              </div>
              <div className="shopdeeword">Fashion</div>
           </div>
           <div onClick={()=>navigate("/categories/657951e437e8cd6092d11cdb")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon7} alt="" />
              </div>
              <div className="shopdeeword">Hardware</div>
           </div>
           <div onClick={()=>navigate("/categories/6579522637e8cd6092d11cf6")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon8} alt="" />
              </div>
              <div className="shopdeeword">Stationary</div>
           </div>
           <div onClick={()=>navigate("/categories/6579524d37e8cd6092d11d02")} className="shopdeeitem">
              <div className="shopdicon"> 
                  <img src={icon9} alt="" />
              </div>
              <div className="shopdeeword">Automobile</div>
           </div>
           <div onClick={()=>navigate("/categories/657952f037e8cd6092d11d16")} className="shopdeeitem">
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
            {
                homeData?.map((item,index)=>(
                    <Categoriescard key={index} data={item}/>
                ))
            }
        </div> */}
    </div>
  )
}

export default Home
