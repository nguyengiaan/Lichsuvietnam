import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import '../Admin/Style/AdminHome.scss'
import Sidebar from './Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contextrouter } from '../App';
import { useSelector } from 'react-redux';
import UserManage from './UserManage';
import QuizManage from './QuizManage';
import UpdateHistory from './UpdateHistory';
import NavBacHo from './NavBacHo';
import RankManage from './RankManage';

function HomeAdmin({ Toggle }) {
    const [componet, setComponet] = useState(null); // Khởi tạo với giá trị null
    const router=useSelector((state)=>state.quiz.component)
    const [swroute,setswrouter]=useState();
    const switchRoute=()=>{
        if (router === "1")
        {
            setswrouter(<Sidebar/>)
        }
        else if(router ==="2")
        {
            setswrouter(<UserManage/>)
        } else if(router==="3")
        {
            setswrouter(<QuizManage/>)
        } else if(router==="4") {
            setswrouter(<UpdateHistory/>)
        }else if(router==="5") {
            setswrouter(<RankManage/>)
        }
    }
    useEffect(() => {
        switchRoute();

    }, [router]); 
    return (
        <>
            <div className='formAdmin'>
                <div className='navAdmin'>
                    <Contextrouter.Provider>
                        <Nav />
                    </Contextrouter.Provider>
                </div>
                <div className='contenAdmin'>
                   {swroute}
                </div>
                <div className='BacHo'>
                         <NavBacHo />
                </div>
            </div>
        </>
    );
}

export default HomeAdmin;
