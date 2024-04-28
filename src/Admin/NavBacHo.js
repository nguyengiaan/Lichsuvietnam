import React,{useContext, useState} from 'react'
import '../Admin/Style/BacHo.scss'
import {Link,Outlet}   from "react-router-dom";
import { Contextrouter } from '../App';
import { fetchrouter } from '../redux/action/actionQuiz';
import { useDispatch } from 'react-redux';
import anh from '../Image/logo.png'
import bacho from '../Image/bacho.jpg'
import LinhCuHo from '../Image/LinhCuHo.jpg'
import vonguyengiap from '../Image/vo_nguyen_giap.jpg'
function NavBacHo(){
    return(
        <div className='navAdmin1'>
            <div className='title'>
                 <p>Dân ta phải biết sử ta <br/>
                 Cho tường gốc tích nước nhà Việt Nam
                 </p>
            </div>
            <div className='slide' >
               <img src={bacho}/>
            </div>
            <div className='slide' >
               <img src={vonguyengiap}/>
            </div>
            <div className='slide' >
               <img src={LinhCuHo}/>
            </div>
        </div>
    );
    
}
export default NavBacHo;