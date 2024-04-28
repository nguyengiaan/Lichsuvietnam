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
function Sidebar() {
  const [addtext,setAddtext]=useState(true);
  const [history,Sethistory]=useState([]);
  const dispatch=useDispatch();
  const addbutton=()=>{
    setAddtext(!addtext)
  }
  const fetchData=async ()=>{
    let res=await axios.get('https://localhost:44337/api/Historys');
    if(res.status===200)
    {
      Sethistory(res && res.data ? res.data : []);
    }
  }
  const btnupdate=(iD_HISTORY)=>{
    dispatch(fetchupdate(iD_HISTORY))
    dispatch(fetchrouter("4"))
  }
  const btndelete=async (id)=>
  {
    try
    {
      let res=  await axios.delete(`https://localhost:44337/api/Historys/Deletehis?id=${id}`);
      if (res.status  ===200)
      {
        toast.success("Xóa thành công")
      }
    }catch(error)
    {
        console.log(error)
        toast.warning("Xóa thất bại")
    }
  }
  useEffect( ()=>{
    fetchData()
  },[history])
  return ( 
    <div className='contentMain'>
        <div className='title'>
          <h1>Quản lý bài viết</h1>
          <Button variant="primary" onClick={addbutton}>
            {addtext ? <> Thêm bài viết </> : <>Quay về</>}          
            </Button>
        </div>
        {addtext ?
            <>
  <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tiêu đề</th>
          <th>Nội dung</th>
          <th>Xóa</th>
          <th>Sửa</th>
        </tr>
      </thead>
      <tbody>
      {history.map((his, index) => (
    <tr key={index}>
      <td><div className='history'><p>{his.iD_HISTORY}</p></div></td>
      <td><div className='history'><p>{his.title}</p></div></td>
      <td><div className='history'><p>{his.content}</p></div></td>
      <td><Button variant="danger" onClick={() => btndelete(his.iD_HISTORY)}>Xóa</Button></td>
      <td><Button variant="warning" onClick={()=>btnupdate(his.iD_HISTORY)}>Sửa</Button></td>
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

export default Sidebar
