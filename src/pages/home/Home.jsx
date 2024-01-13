import React, { useEffect, useState } from 'react';
import './home.scss';
import Discountcard from '../../components/Discountcard';
import Categoriescard from '../../components/Categoriescard';
import axios from 'axios';
import { FadeLoader } from 'react-spinners'

const Home = () => {
    const [load,setLoader] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://amazcart.ischooll.com/public/uploads/images/04-01-2023/63b508b5b7c35.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/05-01-2023/63b6990a4cd4d.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/03-01-2023/63b43e3b21095.jpeg'
  ];
  

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
    });
  }, []);

  // Use local state for products, homeData, and shuffled
    let storedProducts = sessionStorage.getItem('products');
    let storedHomeData = sessionStorage.getItem('homeData');
    let storedShuffled = sessionStorage.getItem('shuffled');

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
  console.log( sessionStorage.getItem('shuffled'))



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
        <div className="discount">
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
        </div>
    </div>
  )
}

export default Home
