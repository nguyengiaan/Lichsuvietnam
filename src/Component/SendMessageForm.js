import React, { useState } from 'react';
import { Form, Button, FormControl, InputGroup}  from 'react-bootstrap';
import "../Style/SendMessageForm.scss"
const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };
    return (
       <div className='sent'>
        <Form onSubmit={handleSubmit}>
          
                <input
                    type="text"
                    placeholder="Enter your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                    <Button variant="primary" type="submit" disabled={!message}>
                        Send
                    </Button>
        </Form>
        </div> 
    );
};

export default SendMessageForm; 
