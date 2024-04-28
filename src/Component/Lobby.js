import { useState } from "react"
import { Form,Button } from "react-bootstrap"
import '../Style/Lobby.scss'
import { fetchroom } from "../redux/action/actionQuiz"
import { Contextuser } from "../App"
import { useDispatch } from "react-redux"
const Lobby=({joinRoom})=>{
    const [user,setUser]=useState();
    const [room,setRoom]=useState('');
    const dispatch=useDispatch();
    return(
    <div className="containerCol1">
     <Form className="lobby"
        onSubmit={e=>{
           e.preventDefault();
            dispatch(fetchroom(room))
           joinRoom(user,room); 
        }}
     >      
            <Form.Group>
                <span>Hãy tạo phòng chat</span>
                <Form.Control placeholder='Hãy nhập họ và tên' onChange={e=>setUser(e.target.value)} />
                    <Form.Control placeholder='Hãy nhập tên phòng' value={room} onChange={e=>setRoom(e.target.value)} />
            </Form.Group>
            <Button variant='success' type="sumbit" disabled={!user || ! room}>Join Room</Button>
    </Form>
    </div>
    )
}
export default Lobby;