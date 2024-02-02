import { faMagnifyingGlass, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './viewproduct.scss'
import { AuthContext } from '../../context/AuthContext';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import parse from 'html-react-parser';
import { FadeLoader } from 'react-spinners';
import logo from '../../image/Jia Bai Li World-3.png'
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';




const Viewproduct = () => {
    // import ReactGA from 'react-ga';
    useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
  // import ReactGA from 'react-ga';

    const navigate = useNavigate()
    ///viewproduct original
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const location = useLocation()
    const [product,setProduct] = useState(location.state?.data)
    const [currentPhoto, setCurrentPhoto] = useState(product?.photos?.[0] ?? null);

    const [count,setCount] = useState(0)
    const getCount = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/countitems/"+user._id)
            setCount(res.data.numberOfItemsInCart)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCount()
    },[])
    //fetch user
    const [rUser,setRUser] = useState()
    const getUser = async() => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/getSingleUser/"+user._id)
            setRUser(res.data)
        }catch(err){

        }
    }

    //locations
    const [towns, setTowns] = useState()
    const [selectedTown, setSelectedTown] = useState()
    const getTowns = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"shipping")
            setTowns(res.data)
        }catch(err){

        }
    }


    const fetchProduct = async () => {
        const res = await axios.get(process.env.REACT_APP_API_URL+"product/getsingleproduct/"+id)
        if(res.data.error === "Internal Server Error"){

        }else{
            setProduct(res.data)
            setCurrentPhoto(res.data.photos[0])
        }
    }
    useEffect(()=>{
        fetchProduct()
        getTowns()
        if(user){
            getUser()
        }
    },[id])
    const onHoover = (photo) => {
        setCurrentPhoto(photo)
    }
    //value function
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };

    //calculater discount
    const calculateDiscountedPrice = (price,discount) => {
        if(!discount)
            return formatNumberWithCommas(price)
            

        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice)
      };
      //counter
        const [options, setOptions] = useState({
            items: 1,
        });
        const handleOption = (name, operation) => {
            setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
            });
        };

    //caculate total
    const calculateDiscountedPriceTotal = (quantity,price,discount) => {
        const nodiscount = price * quantity
        if(!discount)
            return formatNumberWithCommas(nodiscount)


        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice * quantity)
      };

      //onadd to cart
      const addToCart = async () => {
        const datatoPost = {
            productid: product._id,
            quantity: options.items,
            weight: product.weight,
            location: finalTown
        }
        //console.log(datatoPost)
        setadding(true)
        try{
            const res = await axios.post(process.env.REACT_APP_API_URL+"user/addtocart/"+user._id ,datatoPost)
            getCount()
            setLoader(false)
            getUser()
            
        }catch(err){

        }
      }

      //check if item arleady in cart
      const itemInCart = (cart, productIdToCheck) => {
        if(rUser){
            return cart.some(item => item.productid === productIdToCheck);
        }
      };
      

      //pick function
      const [showLT, setLT] = useState(false)
      const [lock,setLock] = useState("pick")
      const [finalTown, setFinaltown] = useState(undefined)
      const pickLocation = (id) => {
            if(id === "pick"){
                setLock("pick")
                setLT(false)
                setCalculate(false)
                setFinaltown(undefined)
                setSelectedTown(undefined)
            }else if(id === "send"){
                setLock("send")
                setLT(true)

            }
      }

      //handle selected location
      const [costCalculate, setCalculate] = useState(false)
      const selectLocation = (_id) => {
        const selected = towns.find((location) => location._id === _id);
        setSelectedTown(selected);
        setFinaltown(selected.location)
        setLT(false)
      };

      //weight caliculations
      const getChargeByWeight = (weight) => {
        const charge = selectedTown.charge.find(
          (charge) => weight >= charge.minweight && weight <= charge.maxweight
        );
        return charge.cost
        // return charge;
      };

      const [adding,setadding] = useState(false)



      ///statyqhshwjdw












    const [searchWord, setSearchWord] = useState()

    const handleInputChange = (e) => {
        setSearchWord(e.target.value);
      };
    
    //const move to the other page
    const NavigateTo = () => {
        if(credentials.searchTerm){
            navigate("/search/"+credentials.searchTerm)
            setClick(false)


        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          NavigateTo();
        }
      };

    //search item
    const [credentials,setCredentials] = useState({
        searchTerm: ""
    })
    const [searchItems,setSearchItem] = useState()
    const getSearchItem = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/search/"+credentials.searchTerm)
            setSearchItem(res.data)
            setClick(true)
            //console.log(res.data)
        }catch(err){

        }
    }
    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    useEffect(()=>{
        if (credentials.searchTerm != "") {
            const delayTimer = setTimeout(() => {
              getSearchItem();
            }, 500); // Adjust the delay based on your needs (e.g., 500 milliseconds)
      
            return () => clearTimeout(delayTimer);
          }
    },[credentials.searchTerm])

    
    const [click,setClick] = useState(false)
    const HandleAction = (word,key) => {
        setClick(false)
        if(word === "DeepCategory"){
            setClick(false)
            navigate("/categories/"+key+"/")
        }else if(word === "Product"){
            navigate("/viewproduct/"+key+"/")
        }else if(word === "Subcategory"){
            navigate("/subcategories/"+key+"/")
        }else if(word === "Category"){
            navigate("/category/"+key+"/")
        }
    }

    useEffect(()=>{
      if(credentials.searchTerm.length <= 0){
          setClick(false)
      }
    },[credentials.searchTerm])

    //after
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);

  const images = [
    'https://amazcart.ischooll.com/public/uploads/images/04-01-2023/63b508b5b7c35.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/05-01-2023/63b6990a4cd4d.jpeg',
    'https://amazcart.ischooll.com/public/uploads/images/03-01-2023/63b43e3b21095.jpeg'
    // Add more image URLs as needed
  ];

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : product?.photos.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < product.photos.length - 1 ? prevIndex + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      // Swipe to the right
      handleNextSlide();
    } else if (deltaX < -50) {
      // Swipe to the left
      handlePrevSlide();
    }
  };
  const [loader,setLoader] = useState(false)


  //handlce cick
  const addClicked = () => {
    if(user){
      setLoader(true)
      addToCart()
    }else{
      navigate("/login/")
    }
  }


  
  return (
    <>
    {product && <Helmet>
        <meta property="og:image" content={"https://api.jiabaili.shop/api/photos/"+product?.photos[0]} />
        <meta name="twitter:image" content={"https://api.jiabaili.shop/api/photos/"+product?.photos[0]} />
        <meta name="description" content={product.name+" | "+formatNumberWithCommas(product?.price)} />
        <meta property="og:description" content={product.name+" | "+formatNumberWithCommas(product?.price)} />
        <meta name="twitter:description" content={product.name+" | "+formatNumberWithCommas(product?.price)}/>
      </Helmet>}
    {
      product && <div className='viewproduct'>
        {loader && <div className="loaderv">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#007185" />
            Adding to cart...
        </div>}
      <div className="top">
          <div className="logoandcounrey">
              <div className="logo">
              <img className='ourlogo' src={logo} alt="" /> <span className='jiabaili'>JiaBaiLi</span> 

              </div>
              <div className="flag">
                  <span className="fi fi-mw"></span>
              </div>
          </div>
          <div className="search">
              <input id='searchTerm' onKeyDown={handleKeyDown} onChange={handleChange} type="text" placeholder='Search item...' />
              <FontAwesomeIcon className='searchicon' icon={faMagnifyingGlass} />
              {click && <div className="searchresults">
                      { searchItems?.map((item,index)=>(
                          <div key={index} onClick={()=>HandleAction(item.key,item._id)} className="single">
                              <div className="leftsingle">{item.term}</div>
                              <div className="rightsingle">{item.key}</div>
                          </div>
                      ))}
              </div>  }
          </div>

      </div>
      <div className="middle">
      <div
    className="image-slider"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
      {product?.photos.map((image, index) => (
        <div key={index} className="slide">
          <img src={"https://api.jiabaili.shop/api/photos/"+image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>

    <div className="slider-controls">
      <button onClick={handlePrevSlide}>&lt;</button>
      <div className="slider-progress">{`${currentIndex + 1}/${product?.photos.length}`}</div>
      <button onClick={handleNextSlide}>&gt;</button>
    </div>
      </div>

      <div className="product-details">
        <div className="topper-product">
          <span className="mwk">MWK</span>
          <span className="product-price">{calculateDiscountedPrice(product.price,product.discount)}</span>
          <span className="typical-product">MWK{formatNumberWithCommas(product.price)}</span>
          <span className="product-discount">{product.discount}% Off</span>
        </div>
        <div className="taxer-inclusive">Price tax inclusive</div>
        <div className="delivermessage">
          <span className="icon-deliver">
              <LocalShippingOutlinedIcon />
          </span>
          <span className="word-deliver">
              We deliver to you
          </span>
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-quantity">{product.quantity} in stock | {product.weight} KGs</div>
        <div className="product-detail">{parse(product.details)}</div>
        <div className="divider"></div>
        <div className="topper-product">
          <span className="typical-product-">Total MWK {calculateDiscountedPriceTotal(options.items,product.price,product.discount)}</span>
          
        </div>
        <div className="buttons">
                            <button className="minus" disabled={options.items <= 1} onClick={()=>handleOption("items", "d")}>-</button>
                            <span className="amount">{options.items}</span>
                            <button  disabled={options.items == product.quantity} className="plus" onClick={()=>handleOption("items", "i")}>+</button>
          </div>

      </div>
      </div>
      <div className="bottom">
          <div onClick={()=>navigate("/cart/")} className="buttom-items">
              <FontAwesomeIcon icon={faShop} />
              {(count != 0) && <span className="count">{(count != 0) ? count : ""}</span>}
          </div>
          <div onClick={()=>addClicked()} className="bottom-word">
              Add to cart
          </div>
      </div>
    
  </div>
    }
    </>
    
  )
}

export default Viewproduct
