import React, { useState } from 'react';
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
import Profile from './View/Profile';
import Lobby from './Component/Lobby';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HubConnectionBuilder,LogLevel } from '@microsoft/signalr';
import Chat from './Component/Chat';
import HomeAdmin from './Admin/HomeAdmin';
import EditRichText from './View/EditRichText';
import Sidebar from './Admin/Sidebar';
import Ranking from './View/Ranking';
export const Contextquiz=React.createContext();
export const Contextuser=React.createContext('');
export const Contextrouter=React.createContext();
function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44337/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }


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
          <Route path="lamtracnghiem/:id" element={<Quest/>} exact />
          <Route path="trangcanhan" element={<Profile/>} exact />
          <Route path="admin" element={<HomeAdmin/>} exact />
          <Route path="ranking" element={<Ranking/>} exact />
          <Route path="Lobby" element={!connection ? <Lobby joinRoom={joinRoom} /> : <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users}/>} exact />
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
