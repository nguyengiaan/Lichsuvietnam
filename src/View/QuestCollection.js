import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchloginUsers } from '../redux/action/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { useJwt } from "react-jwt";
import '../Style/QuestCollection.scss'
import {Link,Outlet}   from "react-router-dom";
import anhdemo from '../Image/2.png'
function QuestCollection() {
  const [item,setitem]=useState([]);
  const Fecthapiques= async ()=>{
    try
    {
      let res= await axios.get("https://localhost:44337/api/Quest/GetCollectionAdmin")
      setitem(res && res.data ? res.data : []);
      
    }catch(error)
    {
      console.log(error.message); 
    }
  }
  useEffect(()=>{
    Fecthapiques()
  },[item])
  return (
    <div className='containerCol'>
     {item && item.length > 0 && (
    <>
        {item.map((itemData, index) => (
            <div key={index} className='titleQuestC'>
                <Link to={'/lamtracnghiem/'+itemData.id_questcollection}>
                    <p>{itemData.title_collection}</p> 
                </Link>
                <div className='imagequiz'>
                    <img src={'https://localhost:44337/Resources/'+itemData.image_quest} alt="quiz image" /> 
                </div>
            </div>
        ))}
    </>
)}
      </div>
  );
}

export default QuestCollection;
