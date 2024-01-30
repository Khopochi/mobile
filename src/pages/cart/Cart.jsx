import { faMagnifyingGlass, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './cart.scss'
import { AuthContext } from '../../context/AuthContext';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import parse from 'html-react-parser';
import { FadeLoader } from 'react-spinners';
import { SingleCart } from '../../components/cartpopy/SingleCart';
import { io } from 'socket.io-client';
import logo from '../../image/Jia Bai Li World-3.png'




const Cart = () => {
    const navigate = useNavigate()
    ///viewproduct original
    const {user} = useContext(AuthContext)


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
      

    //caculate total
    const calculateDiscountedPriceTotal = (quantity,price,discount) => {
        const nodiscount = price * quantity
        if(!discount)
            return formatNumberWithCommas(nodiscount)


        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice * quantity)
      };

      
      

    
      

      



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
            console.log(res.data)
        }catch(err){

        }
    }
    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    useEffect(()=>{
        if (credentials.searchTerm != " ") {
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

 
  const [loader,setLoader] = useState(false)

  //copied from arignal cart
  const [carts, setCarts] = useState()
    const [load,setLoad] = useState(true)


    //socket io operations
    //socket io
    const socket = useRef()

    // socketio open
    // const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(()=>{
        socket.current = io("wss://api.jiabaili.shop")
    },[])
    useEffect(()=>{
        if(user){
        socket.current.emit("addUser", user._id)
        socket.current.on("getusers", (users)=>{
          setOnlineUsers(users)
        })
        }
    },[user?._id])
    //console.log(onlineUsers)


    const [code, setCode] = useState(undefined)
    const [codemessage, setMessagecode] = useState()
    const [loadingtop, setLoadingTop] = useState(false)
    const [loadingtop1, setLoadingTop1] = useState(false)
    useEffect(()=>{
        socket.current.on("getMessage", (data)=>{
            setCode(data.code)
            setMessagecode(data.message)
        })
     },[])

    
 





    //socketio ends here

    const getCartDetaisl = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/getcartdetails/"+user._id)
            setCarts(res.data)
            setLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCartDetaisl()
    },[])

    //gwt user carts
    const [userCart, setUserCart] = useState()
    const [cartLoaded, setCartLoaded] = useState(false)
    const getUserCart = async () => {
        setCartLoaded(false)
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/usercarts/"+user._id)
            setUserCart(res.data)
            setCartLoaded(true)
        }catch(err){

        }
    }
    useEffect(()=>{
        if(user){
            getUserCart()
        }
    },[])
    const calculateTotal = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total;
      }

      const calculateTotalSTD = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total * 100;
      }

      const [newData,setData] = useState(true)
      const handleRefresh = (id) => {
        
        const updatedCartItems = carts.filter(item => item.cartid !== id);
        setCarts(updatedCartItems)
        getUserCart()
      }


      //payment options
      const [selectedPay, setSelectedPay] = useState()

      const setPayOption = (id) => {
        setSelectedPay(id)
      }
      const [iframe,setIframe] = useState()
      const payOrder = async () => {

       
        if(selectedPay === "airtel"){
            const orderinfo = {
                userid: user._id,
                cart: userCart,
                total: calculateTotal(carts),
                status: "Waiting payment",
                phone: user.phonenumber
            }
            setLoadingTop(true)
            try{
                const res = await axios.post(process.env.REACT_APP_API_URL+"transaction/airtel",orderinfo)

                //add this
                setorderid(res.data.data.transaction.id)
            }catch(err){

            }
        }else if(selectedPay === "STD"){
            const orderinfo = {
                userid: user._id,
                cart: userCart,
                total: calculateTotal(carts),
                status: "Waiting payment",
                phone: user.phonenumber,
                std: {
                    action: "AUTH",  
                    amount : { currencyCode : "MWK", value : calculateTotalSTD(carts) },
                }
            }
            setLoadingTop1(true)
            try{
                const res = await axios.post(process.env.REACT_APP_API_URL+"transaction/stdbank",orderinfo)
                setIframe(res.data.order._links.payment.href)
                setLoadingTop1(false)

            }catch(err){

            }
        }
      }

      //console.log(userCart)
      const [orderid, setorderid] = useState()
      const [userData, setUserData] = useState(null);
      // Function to fetch user data based on userId
      const fetchOrder = async () => {
        try {
          // Assuming you have an API call to fetch user data
          const response = await axios.get(process.env.REACT_APP_API_URL+"ordersubmitted/getsinglebyorderid/"+orderid)
          setUserData(response.data);
        } catch (error) {
          //console.error('Error fetching user data:', error);
        }
      };

      useEffect(() => {
        if(orderid){const fetchData = async () => {
          try {
            // Your API call to fetch data
            const response = await axios.get(process.env.REACT_APP_API_URL+"ordersubmitted/getsinglebyorderid/"+orderid)
            setUserData(response.data);
            // Your logic with the fetched data
          } catch (error) {
            //console.error('Error fetching data:', error);
            // Handle the error as needed
          }
        };
    
        const intervalId = setInterval(() => {
          fetchData();
        }, 3000);
    
        // Cleanup: Stop the interval after 1 minute (60,000 milliseconds)
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          //console.log('Interval stopped after 1 minute');
        }, 60000);
    
        // Return cleanup function
        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          //console.log('Cleanup: Interval cleared');
        };}
      }, [orderid]);

      //console.log(userData)

      useEffect(()=>{
            if(userData){
                if(userData.status === "Paid"){
                    navigate("/completed/")
                }
            }
      },[userData])




      








      //ending here to add
      useEffect(()=>{
        if(code === "TS"){
            navigate("/completed/")
        }
      },[code])


 


  
  return (
    <>
    {
      carts && <div className='viewproduct'>
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
        <div className="topperheading">
            <div className="heading">Shopping Cart</div>
            <div className="yutter">{carts.length} items in cart</div>
        </div>
        <div className="dsher">
            
        </div>
        <div className="cartarea">
        {carts && <div className="bodyitems">
                            {
                                carts.map((cart,index)=>(
                                    <SingleCart key={index} data={cart} onDeleteItem={handleRefresh} /> 
                                ))
                            }
                        </div>}
        </div>

      </div>
      <div className="bottom">
          <div className="buttom-items">
              MWK {formatNumberWithCommas(calculateTotal(carts))}
          </div>
          <div className="bottom-word">
              Pay
          </div>
      </div>
    
  </div>
    }
    </>
    
  )
}

export default Cart
