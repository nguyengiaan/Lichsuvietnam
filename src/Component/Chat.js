import MessageContainer from "./MessageContainer";
import SendMessageForm from "../Component/SendMessageForm";
import ConnectedUsers from "./ConnectedUsers";
import { Form,Button } from "react-bootstrap"
import "../Style/Chat.scss"
import { useContext } from "react";
import { Contextuser } from "../App";
import { useSelector } from "react-redux";
const Chat = ({ sendMessage, messages, users, closeConnection }) => {
    const room=useSelector((state)=>state.quiz.room)

    return (
        <div className="formchat">
            <div className='leave-room'>
                 <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
                 <p>Phòng chat:{room}</p>
            </div>
            <ConnectedUsers users={users} />
            <div className="chat">
                <SendMessageForm sendMessage={sendMessage} /> 
                <MessageContainer messages={messages}/>
            </div>
        </div>
    );
};

export default Chat;
