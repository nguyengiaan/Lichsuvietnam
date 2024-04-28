import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Contextquiz } from '../App';
import ClipLoader from "react-spinners/ClipLoader";
import { fetchquestrequest, fetchquestSuccess, fetchquesterror } from '../redux/action/actionQuiz';
import '../Style/Addquizlist.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
function AddQuizList() {
  const setQuiz = useContext(Contextquiz);
  const tokenPayload = useSelector((state) => state.user.tokenPayload);
  const isLoading = useSelector((state) => state.quiz.isLoading);
  const questcollection=useSelector((state)=>state.quiz.data);
  const dispatch = useDispatch();
  const initialValues = {
    id_questcollection:questcollection[0].id_questcollection,
    Id: tokenPayload.UserId,
    question: '',
    questions: [],
    answer:'',
  };
  const [value,setvalue]=useState(initialValues);

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('hãy nhập câu hỏi '),
    questions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Please enter a question'),
      })
    ),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      //dispatch(fetchquestrequest());
      const dataToSend = {
        id_questcollection: values.id_questcollection,
        Id_user: values.Id,
        question: values.question,
        QuestionList: values.questions.map(question => question.name), // Chuyển đổi mảng câu hỏi thành một mảng các tên câu hỏi
        answer: value.answer.name
      };
      await axios.post('https://localhost:44337/api/Quest/Themcauhoi',dataToSend
     ).then((res)=>{
          if(res.status===200)
          {

            setTimeout(()=>{
              dispatch(fetchquestSuccess(questcollection))
              toast.success('thêm thành công')
            },100)
          }
      })
      resetForm({ values: initialValues });
    } catch (error) {
      console.log(error)
      dispatch(fetchquesterror(error));
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className='Addquizlist'>
          <div className='quizlist'>
            <div className='close'>
              <button onClick={setQuiz}>
                <p>x</p>
              </button>
            </div>
            <Formik initialValues={value} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ values, errors, touched, isSubmitting,setFieldValue,handleChange }) => (
                <Form>
                  <div className='formquiz'>
                    <div className='title'>
                        <Field type='text'name='question' placeholder='Điền câu hỏi' onChange={handleChange}/>
                        <ErrorMessage name="title_collection" component="div" className="error" />
                    </div>
                <div className='questionlist'>
                    <FieldArray name="questions" onChange={handleChange}>
                      {({ push, remove }) => (
                        <div>
                          {values.questions.map((question, index) => (
                    
                            <div key={index} className="col">
                              <Field
                                name={`questions.${index}.name`}
                                placeholder={`Enter question ${index + 1}`}
                                type="text"
                                onChange={handleChange}
                              />
                              <Field type="checkbox" 
                                     id="myCheckbox" 
                                     name={`checkbox.${index}.name`}
                                     onChange={(e)=>{
                                      setFieldValue(`checkbox.${index}.name`,e.target.checked)
                                      if (e.target.checked && values.questions[index])
                                      {
                                        setvalue({
                                          ...value,
                                          answer: values.questions[index]
                                        });
                                      }
                                      else
                                      {
                                        setvalue({
                                          ...value,
                                          answer: ""
                                        });
                                      }
                                     }}

                                />
                              <ErrorMessage
                                name={`questions.${index}`}
                                component="div"
                                className="field-error"
                              />
                    
                              <button type="button" onClick={() => remove(index)}>Xóa</button>
                            </div>
                          ))}

                          <button type="button" onClick={() => push()}>Thêm câu hỏi</button>
                        </div>
                      )}
                    </FieldArray>
                </div>
                  </div>
                  <div className='next'>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default AddQuizList;
