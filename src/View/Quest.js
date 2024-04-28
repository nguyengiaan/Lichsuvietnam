import React, { useEffect, useRef, useState } from 'react';
import {  Navigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Style/Quest.scss';
import { useSelector } from 'react-redux';
function Quest(props) {
  const [item, setItem] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [lock, setlock] = useState(false);
  const { id } = useParams();
  const optionsRefs = useRef([]); // Sử dụng một mảng tham chiếu thay vì một tham chiếu đơn
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [idx,setIdx]=useState(null);
  const [indexans,setindexans]=useState(null);
  const [score,setScore]=useState(0);
  const [lengtq,setlengtq]=useState(0);
  const [rans,setrans]=useState(0);
  const [wans,setwans]=useState(0);
  const token=useSelector((state)=>state.user.token)
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  if (token== null)
  {
    window.location.href = '/dangnhap';
    console.log("Đã kiểm tra");
  }
  const fetchItemQuest = async () => {
    try {
      const res = await axios.get(`https://localhost:44337/api/Quest/Quest?questid=${id}`);
      setItem(res.data || []);
      setData(res.data[index]);
      setlengtq(res.data.length)
      setCorrectAnswer(null); // Reset correct answer
      setindexans(null)
    } catch (error) {
      console.log(error.ErrorMessage);
    }
  };
  const NextIndex = () => {
    setIndex(index + 1);
    if (optionsRefs.current && optionsRefs.current[idx]) {
      optionsRefs.current[idx].style.backgroundColor = 'white';
      optionsRefs.current[indexans].style.backgroundColor ='white';
    } else {
      console.log("Không có đủ phần tử hoặc optionsRefs.current là null.");
    }
  };
  const checkAns = (e, ans, correctAns,idx) => {
    let indexAns = data.questions.findIndex(x => x === correctAns);
    setSelectedQuestion(index);
    setindexans(indexAns)
    setIdx(idx)
    if (data.answer === ans) {
      optionsRefs.current[idx].style.backgroundColor ='#64F03A';
      setlock(true);
      setrans(rans+1)
      setScore(score+10)
    } else {;
      optionsRefs.current[idx].style.backgroundColor ='red';
      optionsRefs.current[indexAns].style.backgroundColor ='#64F03A';
      setlock(true);
      setwans(wans+1)
      setCorrectAnswer(correctAns);
    }
  };
  const fecthrank=async ()=>
  {
      if(index && lengtq && index === lengtq)
      {
        try
        {
          const formData = new FormData();
          formData.append("Id",tokenPayload.UserId)
          formData.append("score",score)
          const res=await axios.post("https://localhost:44337/api/Rank/PostScore",formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (res.status==200)
          {
            console.log("Thành công update score")
          }
        }catch(error)
        {
            console.log(error)
        }
     
      }
  }
  useEffect(() => {
    fetchItemQuest();
    fecthrank();
  }, [id, index]);

  return (
    <>
      {index && lengtq && index === lengtq ? 
          <>
    <div className='containerMain'>
      <div className='result'>
       <h1>Bảng kết quả</h1>
      </div>
      <div className='quesTion2'>
        <ul>
            <li>
              <div>
                <p>{tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</p>
              </div>
            </li>
            <li>
               <div>
                  <p>Số câu đúng: {rans} </p>
              </div>
            </li>
            <li>
               <div>
                  <p>Số câu sai: {wans} </p>
              </div>
            </li>
            <li>
              <div >
                <p>Số điểm: {score}</p>
              </div>
            </li>
        </ul>
      </div>
    </div>
          </>:
         <>
            <div className='containerMain'>
      <div className='titleQuest'>
        {data && data.question && <h1>{index + 1}.{data.question}</h1>}
      </div>
      <div className='quesTion'>
        <ul>
          {data && data.questions && data.questions.length > 0 && data.questions.map((question, idx) => (
            <li key={idx}>
              <div
                ref={ref => optionsRefs.current[idx] = ref} // Lưu trữ tham chiếu của từng phần tử
                className={`quest${idx + 1}`}
                onClick={(e) => checkAns(e, question, data.answer,idx)}
                style={{ pointerEvents: selectedQuestion !== null && selectedQuestion === index ? 'none' : 'auto' }}>
                <p>{question}</p>
              </div>
            </li>
          ))}
        </ul>
        
      </div>
              {indexans !==null &&
                <button onClick={() => { NextIndex() }} >Next</button>
               }
          
    </div>
         </>
      }
    </>
    
  );
}

export default Quest;
