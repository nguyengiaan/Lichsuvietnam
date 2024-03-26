import React, { useState } from 'react';
import '../Style/Nav.scss'
import logo from'../Image/logo.png'
import icon1 from '../Image/search.jpg'
import {Link,Outlet}   from "react-router-dom";
import { useSelector } from 'react-redux';
function NavBar() {
  const token=useSelector((state)=>state.user.token)
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  console.log(tokenPayload)
  return (
    <div className='Container'> 
      <div className='Image'>
           <img src={logo} />
      </div>
      <table>
          <td>
              <Link to='/trangchu'><p>Trang chủ</p></Link>
          </td>
          <td>
             <Link to='/lichsuvietnam'><p>Lịch sử Việt Nam</p></Link>
          </td>
        
          <td className='nohovers'>
              <div className='search'>
                      <input className='searchinput' placeholder='Search...'/>
                      <img src={icon1} />
              </div>
     
          </td>
          <td>
              <p>Phim tài liệu</p>
          </td>
          <td>
          <Link to='/tracnghiem'><p>Trắc nghiệm</p></Link>
          </td>
          {token != null ? 
            <>      
          <>
               <td>
               <Link to='/dangky'><p>{tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</p></Link>
           </td>
           <td>
               <Link to='/dangnhap'><p>Chat</p></Link>
           </td>
            </>
     
     
  </>
  : 
  <>
      <td>
          <Link to='/dangky'><p>Đăng ký</p></Link>
      </td>
      <td>
          <Link to='/dangnhap'><p>Đăng nhập</p></Link>
      </td>
  </>
}
      </table>
   
    </div>
  );
}

export default NavBar;
