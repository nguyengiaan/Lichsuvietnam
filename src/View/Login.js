import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/Register.scss';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchloginUsers } from '../redux/action/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { useJwt } from "react-jwt";
function Login() {
  const dispatch=useDispatch()
  const token = useSelector((state) => state.user.token?.data);
  const decodeToken1=(token)=>{
    const myDecodedToken =  decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    console.log("myDecodedToken",myDecodedToken)
    console.log("isMyTokenExpired",isMyTokenExpired)
}
  useEffect(()=>{
    console.log("Token",token)
    decodeToken1(token)
  },[token])
  const validationSchema = Yup.object().shape({
    
    email: Yup.string().required('email không được để trống').matches(/^[^\d]/, "Tên đăng nhập không được bắt đầu bằng số").min(6, 'Tài khoản phải dài ít nhất 6 ký tự').max(100, 'Tài khoản tối đa 20 ký tự').email("Không đúng dịnh dạng email") ,
    password: Yup.string().required('Mật khẩu không được để trống').matches(
      /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Mật khẩu phải ít nhất 8 ký tự, bao gồm 1 chữ số và 1 ký tự đặc biệt"
    )
  });
  return (
    <Formik
      initialValues={{ firstname: '', email: '', password: '',lastname: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
          dispatch(fetchloginUsers(values.email,values.password))
      }}
    >
      {(formik) => (
        <div className='mainRegister'>
          <div className='form'>
            <div className='title'>
              <h1>ĐĂNG NHẬP</h1>
            </div>
            <Form>
              <input type='text' placeholder='Nhập email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.email && formik.touched.email && <div className='form-error'><p>{formik.errors.email}</p></div>}
              <input type='password' placeholder='Nhập mật khẩu' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password && formik.touched.password && <div className='form-error'><p>{formik.errors.password}</p></div>}
              <button type="submit"><span>Đăng nhập</span></button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
