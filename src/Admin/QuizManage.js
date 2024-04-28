import React, { useEffect, useState } from 'react'
import '../Admin/Style/Sidebar.scss'
import Table from 'react-bootstrap/Table';
import EditRichText from '../View/EditRichText';
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import { fetchupdate,fetchrouter } from '../redux/action/actionQuiz';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function QuizManage() {
  const [addtext,setAddtext]=useState(true);
  const [history,Sethistory]=useState([]);
  const dispatch=useDispatch();
  const fetchData=async ()=>{
    let res=await axios.get('https://localhost:44337/api/Quest/GetCollectionAll');
    if(res.status===200)
    {
      Sethistory(res && res.data ? res.data : []);
    }
  }
  useEffect( ()=>{
    fetchData()
  },[history])
  return ( 
    <div className='contentMain'>
        <div className='title'>
          <h1>Quản lý trắc nghiệm</h1>
        </div>
        {addtext ?
            <>
  <Table striped bordered hover size="sm" style={{marginLeft:"56px"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tiêu đề</th>
          <th>Xóa</th>
          <th>Sửa</th>
        </tr>
      </thead>
      <tbody>
      {history.map((his, index) => (
    <tr key={index}>
      <td><div className='history'><p>{his.id_questcollection}</p></div></td>
      <td><div className='history'><p>{his.title_collection}</p></div></td>
      <td ><Button variant="danger" style={{width:"100px"}} >Xóa</Button></td>
      <td><Button variant="warning" style={{width:"100px"}}>Sửa</Button></td>
    </tr>
  ))}
      </tbody>
      </Table>
            </> :
            <>
            <EditRichText/>
            </>
         } 
    </div>
  );
}

export default QuizManage
