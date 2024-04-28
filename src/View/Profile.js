import React, { useEffect, useState ,useContext, createContext} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchloginUsers } from '../redux/action/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { useJwt } from "react-jwt";
import '../Style/Profile.scss'
import {Link,Outlet}   from "react-router-dom";
import anhdemo from '../Image/1.jpg'
import Addquiz from '../Component/AddQuiz';
import { Contextquiz } from '../App';
function Profile() {
  const [item,setitem]=useState([]);
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const Fecthapiques= async ()=>{
    try
    {
      let res= await axios.get(`https://localhost:44337/api/Quest/GetCollectionUser?iduser=${tokenPayload.UserId}`)
      setitem(res && res.data ? res.data : []);
      
    }catch(error)
    {
      console.log(error.message); 
    }
  }
  useEffect(()=>{
    Fecthapiques()
  },[item])
  const setQuiz=()=>
  {
    setIsQuizVisible(!isQuizVisible)
    console.log("da nhan")
  };
  return (
    <div className='containerCol'>
            <div className='user'>
              <img src={anhdemo}/>
              <p>{tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</p>
              <button onClick={setQuiz}><p>Thêm quiz</p></button>
            </div>
            <div className='containerquiz'>
           {item && item.length > 0 && (
             <>
                {item.map((itemData, index) => (
                   <div key={index} className='titleQuestC'>
                   <Link to={'/lamtracnghiem/'+itemData.id_questcollection}>
                     <p>{itemData.title_collection} {itemData.id_questcollection}</p> 
                   </Link>
                <div className='imagequiz'>
                    <img src={'https://localhost:44337/Resources/'+itemData.image_quest} alt="quiz image" /> 
                </div>
            </div>
          ))}
       </>
      )}
 
            </div>
            {isQuizVisible && ( <>
            <Contextquiz.Provider value={setQuiz}>
                <Addquiz/>
            </Contextquiz.Provider>
            </>)}
            
      </div>
  );
}

export default Profile;
