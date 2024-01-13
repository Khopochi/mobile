import React, { useEffect, useState } from 'react'
import './deepcategory.scss'
import Deeplist from '../../components/Deeplist'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FadeLoader } from 'react-spinners'

const Deepcategory = () => {
    const {id} = useParams()
    const {name} = useParams()
    const [data,setData] = useState()
    const [products, setProducts] = useState()
    const [ids, setIds] = useState()
    const getProducts = async () => {
        setLoader(true)
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/getbydeeepid/"+id)
            setProducts(res.data)
            if(res.data.length < 12){
                sethasmore(false)
            }
            let idss = []
              res.data.forEach((bits) => {
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
            console.log(res.data)
            let idss = []
            res.data.forEach((bits) => {
              idss.push(bits._id);
            });
            setIds(ids.concat(idss))
            

          }catch(err){

          }
    }
    
  return (
    <div className='deepcategory'> 
        {load && <div className="loader">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#E3242B" />
            loading items...
        </div>}
        <div className="deepcattop">
            {name}
        </div>
        {products && <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} loader={<p style={{ textAlign: 'center', marginTop: '10px', color: '#E3242B' }}>
                        Loading...
                        </p>} scrollableTarget="window">
                        <div  id="products" className="right">
                                {
                                    products.map((item,index)=>(
                                        <Deeplist data={item} key={index} />
                                    ))
                                }
                        </div>
        </InfiniteScroll> } 
    </div>
  )
}

export default Deepcategory
