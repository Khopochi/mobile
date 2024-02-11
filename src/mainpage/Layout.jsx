import React, { useContext, useEffect, useState } from 'react'
import "./layout.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCartShopping, faFile, faHouse, faList, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FadeLoader } from 'react-spinners'
import { AuthContext } from '../context/AuthContext';
import logo from '../image/Jia Bai Li World-3.png'



const Layout = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [load,setLoader] = useState(true)
    const [activebutton, setbutton] = useState(() => {
        // Check if the current location is the home page
        const isHomePage = window.location.pathname === "/";
      
        // Set active button based on current location
        if (isHomePage) {
          return "home";
        } else {
          // Load the active button from sessionStorage if not home
          return sessionStorage.getItem('activeButton') || "home";
        }
      });

      useEffect (()=>{
        const isHomePage = window.location.pathname === "/";
        if(isHomePage) {
            setbutton("home")
          }else{
            setbutton("home")
          }

      }, [])
      
    const setActive = (name,location) => {
        setbutton(name)
        navigate(location)


    }
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
    useEffect(() => {
        sessionStorage.setItem('activeButton', activebutton);
      }, [activebutton]);

      const [searchWord, setSearchWord] = useState()
     
  
  
      //
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

      const [options,setOptions] = useState(false)


  return (
    <div className='layout'>
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
            <Outlet/>
        </div>
        <div className="bottom">
            <div onClick={()=>setActive("home","/")} className={`navbutton ${activebutton === "home" ? 'activenavv' : ''}`}>
                <div className={`icon ${activebutton === "home" ? 'activenav' : ''}`}><FontAwesomeIcon icon={faHouse} /></div>
                <div className="word">Home</div>
            </div>
            <div onClick={()=>setActive("cat","/categories/")} className={`navbutton ${activebutton === "cat" ? 'activenavv' : ''}`} >
                <div className={`icon ${activebutton === "cat" ? 'activenav' : ''}`}><FontAwesomeIcon icon={faList} /></div>
                <div className="word">Categories</div>
            </div>
            {user && <div onClick={()=>navigate("/cart/")} className="navbutton big">
                {count != 0 && <div className="count">{count}</div>}
                <div className="icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                <div className="word">Cart</div>
            </div>}
            {!user && <div onClick={()=>navigate("/login/")} className="navbutton big">
                {count != 0 && <div className="count">{count}</div>}
                <div className="icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                <div className="word">Cart</div>
            </div>}
            {user && <div onClick={()=>navigate("/myorders/")} className="navbutton">
                <div className="icon"><FontAwesomeIcon icon={faFile} /></div>
                <div className="word">Orders</div>
            </div>}
            {!user && <div onClick={()=>navigate("/login/")} className="navbutton">
                <div className="icon"><FontAwesomeIcon icon={faFile} /></div>
                <div className="word">Orders</div>
            </div>}
            <div className="navbutton">
                {(user && options) && <div className="useroptions">
                    <div className="optionstitle">{user.firstname} {user.lastname}</div>
                    <div className="divider"></div>
                    <div onClick={()=>navigate("/myorders/")} className="orderbutton"><span>View your orders</span><FontAwesomeIcon icon={faAngleRight} /></div>
                </div>}
                {user && <div onClick={()=>setOptions(!options)}  className="icon"><FontAwesomeIcon icon={faUser} /></div>}
                {!user && <div onClick={()=>navigate("/login/")} className="icon"><FontAwesomeIcon icon={faUser} /></div>}
                {user && <div onClick={()=>setOptions(!options)} className="word">Me</div>}
                {!user && <div onClick={()=>navigate("/login/")} className="word">Sign In</div>}
            </div>
         </div>
    </div>
  )
}

export default Layout
