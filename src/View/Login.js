import React, { useEffect, useState } from 'react';
import {  CSSProperties } from "react";
import axios from 'axios';
import '../Style/Register.scss';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchloginUsers } from '../redux/action/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import ClipLoader from "react-spinners/ClipLoader";
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import { fetchPostsRequest,fetchPostsError,fetchDecodeSuccess,fetchPostsSuccess } from '../redux/action/actions';
function Login() {

  const dispatch = useDispatch();
  const Navigate=useNavigate();
  const token = useSelector((state) => state.user.token?.data);
  const isLoading = useSelector((state) => state.user.isLoading);
  const decodeToken1 = (token) => { 
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    console.log("myDecodedToken", myDecodedToken);
    console.log("isMyTokenExpired", isMyTokenExpired);
  };
  const fetchloginUsers=async (email,password)=>{

        dispatch(fetchPostsRequest())
        try {
          const data={
             email:email,
             password:password,
           }
           await axios.post("https://localhost:44337/api/Account/SignIn",data)
             .then((res) => {
              setTimeout(()=>{
                  dispatch(fetchPostsRequest);
              },2000)
               if (res.status === 200) { 
                dispatch(fetchPostsSuccess(res))
                const decode=decodeToken(res.data)
                dispatch(fetchDecodeSuccess(decode))
                Navigate("/trangchu")
               }
             })
             .catch((error) => {
              dispatch(fetchPostsError(error))
               toast.error("Tài khoản hoặc mật khẩu sai")
               console.error("Có lỗi xảy ra trong quá trình gửi form:", error);
               console.error("Đăng ký thất bại. Lỗi:", error.response.status);
               console.error("Thông điệp lỗi từ máy chủ:", error.response.data);
             });
         } catch (error) {
           console.error("Có lỗi xảy ra trong quá trình thực hiện đăng ký:", error);
    }
}
  useEffect(() => {
    console.log("Token", token);
    decodeToken1(token);
  }, [token]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email không được để trống")
      .matches(/^[^\d]/, "Tên đăng nhập không được bắt đầu bằng số")
      .min(6, "Tài khoản phải dài ít nhất 6 ký tự")
      .max(100, "Tài khoản tối đa 20 ký tự")
      .email("Không đúng định dạng email"),
    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Mật khẩu phải ít nhất 8 ký tự, bao gồm 1 chữ số và 1 ký tự đặc biệt"
      ),
  });

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
        <Formik
          initialValues={{ firstname: "", email: "", password: "", lastname: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            dispatch(fetchloginUsers(values.email, values.password));
          }}
        >
          {(formik) => (
            <div className="mainRegister">
              <div className="form">
                <div className="title">
                  <h1>ĐĂNG NHẬP</h1>
                </div>
                <Form>
                  <input
                    type="text"
                    placeholder="Nhập email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="form-error">
                      <p>{formik.errors.email}</p>
                    </div>
                  )}
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="form-error">
                      <p>{formik.errors.password}</p>
                    </div>
                  )}
                  <button type="submit">
                    <span>Đăng nhập</span>
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}


export default Login;
