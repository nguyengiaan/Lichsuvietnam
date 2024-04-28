import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchloginUsers } from '../redux/action/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { useJwt } from "react-jwt";
import '../Style/Addquiz.scss';
import { Link, Outlet } from "react-router-dom";
import anhdemo from '../Image/2.png';
import Profile from '../View/Profile';
import { Contextquiz } from '../App';
import ClipLoader from "react-spinners/ClipLoader";
import AddQuizList from './AddQuizList';
import { useFormikContext } from 'formik';
import { fetchquestrequest, fetchquestSuccess, fetchquesterror } from '../redux/action/actionQuiz';

function Addquiz() {
  const setQuiz = useContext(Contextquiz);
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  const isLoading=useSelector((state)=>state.quiz.isLoading)
  const dispatch = useDispatch();
  const [fileType, setFileType] = useState(null);
  const [nextscene,setNextscene]=useState(true);
  const [success,setSuccess]=useState(false);
  const initialValues = {
    Id: tokenPayload.UserId,
    title_collection: '',
    image_quest: '',
    file: null,
  };
   const[valuesi,setvaluei]=useState(initialValues);
   const handleFileInputChange = (event) => {
      setFileType(event.currentTarget.files[0]);
    };
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
  
     
      const formData = new FormData();
      formData.append('Id',values.Id);
      formData.append('title_collection', values.title_collection);
      formData.append('image_quest',"")
      formData.append('file', fileType);
      dispatch(fetchquestrequest());
       await axios.post('https://localhost:44337/api/Quest/UploadGetcollection', formData,{
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(  (response)=>{
        if (response.status === 200) {
       
          setTimeout(async ()=>{
          const res = await axios.get(`https://localhost:44337/api/Quest/GetCollection?iduser=${valuesi.Id}`);
          dispatch(fetchquestSuccess(res.data))
          console.log("quez date",res.data)
          toast.success("Lưu thành công");
        },2000)
          setSuccess(true)
          setFileType(null)
          resetForm(); // Clear form after successful submission
        }
      } );
   
    } catch (error) {
      console.error(error);
      // dispatch(fetchquesterror)
    } finally {
      setSubmitting(false); // Allow submitting again after async operation
    }
  };
  const validationSchema = Yup.object().shape({
    title_collection: Yup.string().required('Please enter a title for your quiz collection'),

  });
  const Next=  ()=>
  {
   
      setNextscene(!nextscene)
  }
  return (
    <>
        {isLoading ? (
  <ClipLoader
    color={"#ffffff"}
    loading={isLoading}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
) : (
  nextscene ? (
    <>
      <div className='Addquiz'>
        <div className='quiz'>
          <div className='close'>
            <button onClick={setQuiz}>
              <p>x</p>
            </button>
          </div>
          <Formik initialValues={valuesi} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, handleChange, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div className='form'>
                  <Field
                    type='text'
                    name='title_collection'
                    placeholder='Hãy nhập tiêu đề'
                    onChange={handleChange}
                    value={values.title_collection}
                  />
                  <ErrorMessage name="title_collection" component="div" className="error" onChange={handleChange} />
                  <Field type='file' name='file' placeholder='Hãy nhập file' accept="image/*" onChange={(event) => handleFileInputChange(event)} />
                  <ErrorMessage name="file" component="div" className="error" />
                </div>
                <div className='next'>
                  {success ? (
                    <button onClick={Next}>
                      <p>Next</p>
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting}>
                      <p>Submit</p>
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  ) : (
    <>
      <AddQuizList />
    </>
  )
)}

    </>
   
  );
}

export default Addquiz;
