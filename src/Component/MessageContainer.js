import { useEffect, useRef } from 'react';
import "../Style/MessageCon.scss"
import url from "../Image/anhnen.jpg"
const MessageCon = ({ messages }) => {
    const messageRef = useRef();
    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <div className="message-container" ref={messageRef} >
            {messages.map((m, index) => (
                <div key={index} className="user-message">
                 <div className="messeger"><p>{m.message}</p></div>
                 <div className="from-user"><p>{m.user}</p></div>
                 <div className="Image-user"><img src={url}/></div>
                </div>
            ))}
        </div>
        
    );
   
}
export default MessageCon;
