import React from 'react';
import "../Style/ConnectedUsers.scss"
const ConnectedUsers = ({ users }) => (
    <div className='user-list'>
    <div className='user-connection'>
        <h4>Thành viên</h4>
        {users.map((user, idx) => (
            <h6 key={idx}><span>&#10625; </span>{user}</h6>
        ))}
    </div>
    </div>
);

export default ConnectedUsers;
