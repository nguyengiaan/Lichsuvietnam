import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Register.scss';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Register() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Họ không được để trống').matches(/^[^\d]/, "Tên đăng nhập không được bắt đầu bằng số").min(4, 'tên phải dài ít nhất 4 ký tự').max(20, 'Họ  tối đa 20 ký tự') ,
    lastname:Yup.string().required('Tên không được để trống').matches(/^[^\d]/, "Tên đăng nhập không được bắt đầu bằng số").min(4, 'Họ phải dài ít nhất 4 ký tự').max(20, 'tên tối đa 20 ký tự') ,
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
        try {
         const data={
            firstname:values.firstname,
            lastname:values.lastname,
            email:values.email,
            password:values.password,
          }
          await axios.post("https://localhost:44337/api/Account/SignUp",data)
            .then((res) => {
              if (res.status === 200) {
                toast.success("Đăng ký thành công")
                values.firstname = "";
                values.lastname = "";
                values.email = "";
                values.password = "";
              }
            })
            .catch((error) => {
              toast.error("Tài khoản đã có người đăng ký")
              console.error("Có lỗi xảy ra trong quá trình gửi form:", error);
              console.error("Đăng ký thất bại. Lỗi:", error.response.status);
              console.error("Thông điệp lỗi từ máy chủ:", error.response.data);
            });
        } catch (error) {
          console.error("Có lỗi xảy ra trong quá trình thực hiện đăng ký:", error);
        }
      }}
    >
      {(formik) => (
        <div className='mainRegister'>
          <div className='form'>
            {/* <div className='title'>
              <h1>Đăng ký</h1>
            </div> */}
            <Form>
              <input type='text' placeholder='Nhập Họ' name='firstname' value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.firstname && formik.touched.firstname && <div className='form-error'><p>{formik.errors.firstname}</p></div>}
              <input type='text' placeholder='Nhập Tên' name='lastname' value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.lastname && formik.touched.lastname && <div className='form-error'><p>{formik.errors.lastname}</p></div>}
              <input type='text' placeholder='Nhập email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.email && formik.touched.email && <div className='form-error'><p>{formik.errors.email}</p></div>}
              <input type='password' placeholder='Nhập mật khẩu' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password && formik.touched.password && <div className='form-error'><p>{formik.errors.password}</p></div>}
              <button type="submit"><span>Đăng ký</span></button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Register;
