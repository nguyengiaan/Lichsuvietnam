import { wait } from '@testing-library/user-event/dist/utils';
import { FETCH_USER_ERROR,FETCH_USER_REQUEST,FETCH_USER_SUCCESS, DECODE_TOKEN_SUCCESS,DECODE_TOKEN_FAILURE } from './type';
import axios from 'axios'; 
import { isExpired, decodeToken } from "react-jwt";
import { toast } from 'react-toastify';
export const fetchloginUsers= (email,password)=>{
    return async (dispatch,getstate) =>{
        dispatch(fetchPostsRequest())
        try {
          const data={
             email:email,
             password:password,
           }
           await axios.post("https://localhost:44337/api/Account/SignIn",data)
             .then((res) => {
               if (res.status === 200) { 
                dispatch(fetchPostsSuccess(res))
                const decode=decodeToken(res.data)
                localStorage.setItem("AccessToken",res.data)
                dispatch(fetchDecodeSuccess(decode))
                toast.success("Đăng nhập thành công")
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
}
export const fetchDecodeSuccess=(tokend)=>{
  return {
    type:DECODE_TOKEN_SUCCESS,
    tokendecode:tokend,
  }
}
export const fetchDecodeFallure=()=>{
  return {
    type:DECODE_TOKEN_FAILURE
  }
}
export const fetchPostsRequest=()=>{
    return {
      type:FETCH_USER_REQUEST
    }
  }
  
  export const fetchPostsSuccess=(payload)=> {
    return {
      type: FETCH_USER_SUCCESS,
      payload
    }
  }
  
  export const fetchPostsError=(payload)=> {
    return {
      type: FETCH_USER_ERROR,
      error:payload
    }
  }
