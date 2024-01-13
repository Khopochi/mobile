import React from 'react'
import './subcategory.scss'
import { useNavigate } from 'react-router-dom';

const Subcategory = ({subdata,twindeep,deepdata}) => {
    const filteredData = deepdata?.filter(item => item.subcategoryid === subdata._id);
    const getNameById = (id) => {
        const foundItem = twindeep.find(item => item._id === id);
    
        // If an item with the given _id is found, return its name
        // Otherwise, return a default value or handle it accordingly
        return foundItem ? foundItem.photos[0] : 'Item not found';
      };
      const navigate = useNavigate()
  return (
    <div className='subcategory'>
      <div className="uppersubcat">
            {subdata.name}
      </div>
      <div  className="lowercat">
       {filteredData && <>
        {
                filteredData.map((item,index)=>(
                    <div onClick={()=>navigate("/deepcategories/"+item._id+"/"+item.name+"/")} key={index} className="lowercatholder">
                        <div className="imagesub">
                            <img src={"https://api.jiabaili.shop/api/photos/"+getNameById(item._id)} alt="" />
                        </div>
                        <div className="subdeepcat">
                            {item.name}
                        </div>
                    </div>
                ))
            } 
        </>}
        {!filteredData && <>
                    <div  className="lowercatholder">
                        <div className="imagesub">
                            
                        </div>
                        <div className="subdeepcat">
                            loading..
                        </div>
                    </div>
                    <div  className="lowercatholder">
                        <div className="imagesub">
                            
                        </div>
                        <div className="subdeepcat">
                            loading..
                        </div>
                    </div>
                    <div  className="lowercatholder">
                        <div className="imagesub">
                            
                        </div>
                        <div className="subdeepcat">
                            loading..
                        </div>
                    </div>
        </>}
                    
      </div>
    </div>
  )
}

export default Subcategory
