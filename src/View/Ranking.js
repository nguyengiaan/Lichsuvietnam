import React, { useEffect, useRef, useState } from 'react';
import {  Navigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Style/Quest.scss';
import { useSelector } from 'react-redux';
function Ranking() {
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  const [data,setData]=useState([]);
  const Fecthapirank= async ()=>{
    try
    {
      let res= await axios.get("https://localhost:44337/api/Rank/OrderRank")
      setData(res && res.data ? res.data : []);
      
      
    }catch(error)
    {
      console.log(error.message); 
    }
  }
  useEffect(()=>{
    Fecthapirank();
  },[data])
  return (
    <div className='containerMain'>
      <div className='result'>
       <h1>Bảng xếp hạng</h1>
      </div>
      <div className='quesTion2'>
        <ul>
        {data.map((data, index) => {
           return (
          <li key={index}>
              <div className='divli'>
                  <p>Top {index+1} {data.lastName} {data.score} điểm </p>
              </div>
         </li>
        );
})}

           
        </ul>
      </div>
    </div>
     
   
    
  );
}

export default Ranking;
