import React, { useContext, useEffect, useRef, useState } from 'react'
import './Productsearch.scss'
import Searchcard from '../../components/Searchcard'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faFile, faHouse, faList, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../image/Jia Bai Li World-3.png'
import { FadeLoader } from 'react-spinners'


const Categorysearch = () => {
    const {id} = useParams()
    const {name} = useParams()
    const [data,setData] = useState()
    const [products, setProducts] = useState()
    const [ids, setIds] = useState()
    const getProducts = async () => {
        setLoader(true)
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/categories/"+id)
            setProducts(res.data.products)
            setData(res.data)
            if(res.data.products.length < 12){
                sethasmore(false)
            }
            let idss = []
              res.data.products.forEach((bits) => {
                idss.push(bits._id);
              });
            setIds(idss)
            setLoader(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        if(id.length >= 1){
            getProducts()
        }
    },[id])


    const [load,setLoader] = useState(true)

    //fetch again
    const [hasmore, sethasmore] = useState(true)
    const fetchmore = async () => {
        console.log("Reached")
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/searchproductscategory/"+ids+"/"+id)
            setProducts(products.concat(res.data))
            if(res.data.length < 12){
                sethasmore(false)
            }
            console.log(res.data)
            let idss = []
            res.data.forEach((bits) => {
              idss.push(bits._id);
            });
            setIds(ids.concat(idss))
            

          }catch(err){

          }
    }
    const itemsBodyRef = useRef(null);




    //search staff
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    // const [load,setLoader] = useState(true)
    const [activebutton,setbutton] = useState(() => {
        // Load the active button from localStorage on component mount
        return sessionStorage.getItem('activeButton') || "home";
      })
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
              setCredentials({
                ...credentials,
                searchTerm: ""
              });
  
  
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
  return (
    <div className='productseaerch'>
         {load && <div className="loader">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#E3242B" />
            loading items...
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
                <input id='searchTerm' value={credentials.searchTerm} onKeyDown={handleKeyDown} onChange={handleChange} type="text" placeholder='Search item...' />
                <FontAwesomeIcon onClick={()=>NavigateTo()} className='searchicon' icon={faMagnifyingGlass} />
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
        {data && <div className="divtitle">
            {data.categories[0].name}
        </div>}
        <div className="sepearter"></div>
        {data && <div className="cccover loading">
            <div className="cccoverinside" style={{ backgroundImage: `url(https://api.jiabaili.shop/api/photos/${data.categories[0]._id}.jpg)` }}>
                
            </div>
        </div>}
        {products && <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} loader={<p style={{ textAlign: 'center', marginTop: '10px', color: '#E3242B' }}>
                        Loading...
                        </p>} scrollableTarget="window">
                        <div  id="products" className="itemsbody">
                                {
                                    products.map((item,index)=>(
                                        <Searchcard data={item} key={index} />
                                    ))
                                }
                        </div>
        </InfiniteScroll> } 
    </div>
  )
}

export default Categorysearch

