import React,{useContext, useState} from 'react'
import '../Admin/Style/Navadmin.scss'
import {Link,Outlet}   from "react-router-dom";
import { Contextrouter } from '../App';
import { fetchrouter } from '../redux/action/actionQuiz';
import { useDispatch } from 'react-redux';

function Nav(){
    const dispatch=useDispatch();
    return(
        <div className='navAdmin'>
                <p>Danh mục quản lý &#128578;</p>
            <div className='navContent' onClick={()=>{dispatch(fetchrouter("1"))}}>
                 <p> Quản lý bài viết &#128511;</p>
            </div>
            <div className='navContent' onClick={()=>{dispatch(fetchrouter("2"))}}>
                  <p> Quản lý người dùng &#128511;</p>   
            </div>
            <div className='navContent' onClick={()=>{dispatch(fetchrouter("3"))}}> 
                  <p> Quản lý trắc nghiệm &#128511;</p>   
            </div>
            <div className='navContent' onClick={()=>{dispatch(fetchrouter("5"))}}> 
                  <p> Quản lý xếp hạng &#128511;</p>   
            </div>
        </div>
    )
}
export default Nav;