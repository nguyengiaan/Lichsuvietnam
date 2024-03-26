import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchloginUsers } from '../redux/action/actions';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { useJwt } from "react-jwt";
import '../Style/Quest.scss'
function Quest() {
  return (
    <div className='containerMain'>
        <div className='titleQuest'>
            <h1>Đảm bảo văn bản không được cắt ngắn: Sử dụng white-space: nowrap; 
            </h1>
            </div>
            <div className='quesTion'>
            <ul>
                <li><div id='quest1'><p>Đảm bảo văn</p></div> </li>
                <li><div id='quest2'><p>Đảm bảo văn bản không được cắt ngắn: Sử dụng white-space: nowrap;</p></div> </li>
                <li><div id='quest3'><p>Đảm bảo văn bản không được cắt ngắn: Sử dụng white-space: nowrap;</p></div></li>
                <li><div id='quest4'><p>Đảm bảo văn bản không được cắt ngắn: Sử dụng white-space: nowrap;</p></div> </li>
            </ul>
        
        </div>
        <button>Next</button>
    </div>
  );
}

export default Quest;
