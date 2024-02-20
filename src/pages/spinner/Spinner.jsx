import React, { useEffect, useState } from 'react';
import './LottoSpinner.scss'; // Import your CSS file for styling
import spinner from '../../image/rainbow-spinning-wheel-png.webp'
import axios from 'axios';
import { FadeLoader } from 'react-spinners';

const LottoSpinner = () => {
  let arrayPast = [995810691,998039353,986469995,993945872,999038828]
  const [vList, setList] = useState()
  const [officialList, setOfficialList] = useState()

  const [winner, setWinner] = useState()

  useEffect(()=>{
    getWinner()
  }, [])

  const getWinner = async () => {
    try{
        const res = await axios.get("http://localhost:8080/api/user/")
        setList(res.data)
    }catch(err){

    }
  }

  const addToOfficialList = () => {
    const filteredList = vList.filter(user => !arrayPast.includes(user.phonenumber));
    setOfficialList(filteredList);
  };

  const selectRandomObject = () => {
    // Check if the list is empty
    if (officialList.length === 0) {
      console.log("The list is empty.");
      return null;
    }

    // Generate a random index within the range of the officialList array
    const randomIndex = Math.floor(Math.random() * officialList.length);

    // Return the randomly selected object
    return officialList[randomIndex];
  };

  const handleClick = () => {
    setShow(true)
    setTimeout(() => {
      const randomObject = selectRandomObject();
      if (randomObject) {
        setShow(false)
        setWinner(randomObject);
      }
    }, 10000); // 30 seconds delay
  };

  const [show, setShow] = useState(false)



  console.log(officialList)
  return (
        <div className="spinnerHome">

          <div onClick={()=>addToOfficialList()} className="topspinner">
                www.jiabaili.shop T-shirts Spinner
          </div>
          <div className="bottomspinner">
              <div className="leftspinner">
                  <img src={spinner} alt="" />
              </div>
              <div className="rightspinner">
                {show && <div className="fader">
                    <FadeLoader color="#E3242B" />
                </div>}
                {winner && <div className="winner">
                  <div className="namespinner">{winner.firstname} {winner.lastname}</div>
                  <div className="namespinnerp">{winner.phonenumber}</div>
                </div>}
                <button className='bspinner' onClick={()=>handleClick()}>Get winner</button>
              </div>
          </div>
        </div>
  );
};

export default LottoSpinner;
