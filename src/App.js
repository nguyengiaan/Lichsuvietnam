import React from 'react';
import './App.scss';
import NavBar from './View/NavBar';
import Home from './View/Home'
import Historyvn from './View/Historyvn';
import ShowHistory from './Component/ShowHistory';
import Register from './View/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quest from './View/Quest';
import Login from './View/Login';
import QuestCollection from './View/QuestCollection';
function App() {
  return (
    <div className="App">
      <nav >
          <NavBar/>
      </nav>
      <header className="App-header">
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="trangchu" element={<Home />} />
          <Route path="lichsuvietnam" element={<Historyvn />} />
          <Route path="dangky" element={<Register/>} />
          <Route path="dangnhap" element={<Login/>} />
          <Route path="tracnghiem" element={<QuestCollection/>} />
          <Route path="lamtracnghiem" element={<Quest/>} />

        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClickrtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
        <ToastContainer />

      </header>
    </div>
  );
}

export default App;
