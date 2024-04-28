import { FETCH_USER_REQUEST,FETCH_USER_SUCCESS,FETCH_USER_ERROR,DECODE_TOKEN_FAILURE,DECODE_TOKEN_SUCCESS } from '../action/type';
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
const INITIAL_STATE = {
    listdata:[],
    isLoading:false,
    isError:true,
    token:null,
    tokenPayload:null,
};
const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_REQUEST:
            console.log(action)
           return {
             ...state,
             isLoading:true,
             isError:false,
           };
        case FETCH_USER_SUCCESS:

           return {
              ...state,token:action.payload,
              isLoading:false,
              isError:false,
           };
           case FETCH_USER_ERROR:
            console.log(action)
           return {
              ...state, 
              isLoading:false,
              isError:true,
           };
           case DECODE_TOKEN_SUCCESS:
            console.log(action)
           return {
              ...state, 
              tokenPayload:action.tokendecode
           };

         default: return state;

    }

};

export default userReducer;