import React, { useState } from 'react';
import '../Style/Nav.scss'
import logo from'../Image/logo.png'
import icon1 from '../Image/search.jpg'
import {Link,Outlet}   from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostsSuccess } from '../redux/action/actions';
function NavBar() {
  const token=useSelector((state)=>state.user.token)
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  const [idjoin,setidjoin]=useState();
  const Navigator=useNavigate();
  const[role,setRole]=useState(tokenPayload && tokenPayload[tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]] ? tokenPayload[tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]] : null )
  const dispacth=useDispatch()
  const jointquiz=()=>{
    Navigator('/lamtracnghiem/'+idjoin)
  }
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
                      <input type='text' className='searchinput' placeholder='Join Quest' value={idjoin} onChange={(e)=>{setidjoin(e.target.value)}}/>
                      <img src={icon1} className='BtnImage' onClick={jointquiz} style={{cursor:'pointer'}}/>
              </div>
     
          </td>
          <td>
            <Link to='/ranking'><p>Xếp hạng</p></Link>
          </td>
         
         
          <td>
          <Link to='/tracnghiem'><p>Trắc nghiệm</p></Link>
          </td>
          {token != null ? 
            <>      
          <>
          { tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ==='Administrator' ?  <td>
            <Link to='/admin'><p>Admin</p></Link>
          </td> : null}
               <td>
              
               <Link to='/Lobby'><p>Chat</p></Link>
           </td>
           <td>
               <Link to='/trangcanhan'><p>{tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</p></Link>
           </td>
           <td onClick={()=>dispacth(dispacth(fetchPostsSuccess(null)))}>
              
              <p>Đăng Xuất</p>
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
