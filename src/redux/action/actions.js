import { wait } from '@testing-library/user-event/dist/utils';
import { FETCH_USER_ERROR,FETCH_USER_REQUEST,FETCH_USER_SUCCESS, DECODE_TOKEN_SUCCESS,DECODE_TOKEN_FAILURE } from './type';
import axios from 'axios'; 
import { isExpired, decodeToken } from "react-jwt";
import { toast } from 'react-toastify';
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
