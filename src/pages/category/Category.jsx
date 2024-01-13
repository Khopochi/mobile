import React, { useEffect, useState } from 'react'
import './Category.scss'
import Subcategory from '../../components/Subcategory'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'


const Category = () => {

    const [load,setLoader] = useState(true)
    useEffect(() => {
        if(storeddata && storeddeepcate && storedsub ){
            setLoader(false)
        }
      }, []);


    let storeddata = sessionStorage.getItem('datamasterjiabaili');
    let storeddeepcate = sessionStorage.getItem('deepcategoriesjiabaili');
    let storedsub = sessionStorage.getItem('categoriesdatajiabaili');


    const [data,setdata] = useState(storeddata ? JSON.parse(storeddata) : null)
    const [subcategory,setsubcategory] = useState(storedsub ? JSON.parse(storedsub) : null)
    const [deepcategories,setdeepcategories] = useState(storeddeepcate ? JSON.parse(storeddeepcate) : null)
    const getdataDeep = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/mobiledeepcategories")
            setdeepcategories(res.data)
            sessionStorage.setItem('deepcategoriesjiabaili', JSON.stringify(res.data));
        }catch(err){

        }
    }
    const getdata = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/mobilecategories")
            setdata(res.data)
            sessionStorage.setItem('datamasterjiabaili', JSON.stringify(res.data));
            setsubcategory(res.data.subcategories)
            sessionStorage.setItem('categoriesdatajiabaili', JSON.stringify(res.data.subcategories));
            setLoader(false)

        }catch(err){

        }
    }
    useEffect(()=>{
        getdata()
        getdataDeep()
    },[])


    //active button
    const [activecat, setActivecat] = useState()
    const setSuper = (id) => {
        const filteredData = data.subcategories.filter(item => item.categoryyid === id);
        setActivecat(id)
        setsubcategory(filteredData)
    }
    
  return (
    <div className='Category'>
        {load && <div className="loader">
            {/* <BeatLoader color="hsla(351, 84%, 49%, 1)" /> */}
            <FadeLoader color="#E3242B" />
            loading items...
        </div>}
      <div className="left">
        {
           data && <>
           {
            data.categories.map((item,index)=>(
                <div onClick={()=>setSuper(item._id)} key={index} className={`item ${item._id === activecat ? 'active' : ''}`}>{item.name}</div>
            ))
           }
            </>
        }
      </div>
      <div className="right">
      {
           (subcategory?.length > 1) && <>
           {
            subcategory.map((item,index)=>(
                <Subcategory key={index} subdata={item} twindeep={data.deepCategoriesWithImages} deepdata={deepcategories} />
            ))
           }
            </>
        }
      </div>
    </div>
  )
}

export default Category
