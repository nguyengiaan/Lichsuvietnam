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
import '../Style/QuestCollection.scss'
import {Link,Outlet}   from "react-router-dom";
import anhdemo from '../Image/2.png'
function QuestCollection() {
  return (
    <div className='containerCol'>
        <div className='titleQuestC'>
        <Link to='/lamtracnghiem'><p>Lịch sử 12 32133131</p></Link>
            <div className='imagequiz'>
                <img src='https://localhost:44337/Resources/95a2fea2-229d-4d57-8edd-f4fa777623e0.jpg' />
             </div>
            </div>
      </div>
  );
}

export default QuestCollection;
