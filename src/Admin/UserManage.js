import React, { useEffect, useState } from 'react';
import '../Admin/Style/User.scss'
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
const UserManage = () => {
    // State để lưu trữ danh sách người dùng
    const [users, setUsers] = useState([{}]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', username: '' });
    const [showEditForm, setShowEditForm] = useState(false);
    const [editUser, setEditUser] = useState({ id: '', name: '', email: '', username: '' });
    const addUser = () => {
        setShowAddForm(true);
    };
    const fecthdata=async ()=>{
        try
        {
            const res=await axios.get('https://localhost:44337/api/Account/GetDataUser');
            console.log("res user",res.data)  
            if(res.status===200)
            {
                setUsers( res && res.data ? res.data : [])
            } 
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
       fecthdata()
    },[])
    const deleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    const editClicked = (user) => {
        setShowEditForm(true);
        setEditUser(user);
    };


    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    // Hàm để lưu thông tin người dùng đã sửa
    const saveEditUser = () => {
        const updatedUsers = users.map(user => {
            if (user.id === editUser.id) {
                return { ...user, ...editUser };
            }
            return user;
        });
        setUsers(updatedUsers);
        setShowEditForm(false);
        setEditUser({ id: '', name: '', email: '', username: '' });
    };

    // Hàm để hủy bỏ việc chỉnh sửa thông tin người dùng
    const cancelEditUser = () => {
        setShowEditForm(false);
        setEditUser({ id: '', name: '', email: '', username: '' });
    };

    // Hàm để lưu thông tin người dùng mới
    const saveUser = () => {
        if (!newUser.name || !newUser.email || !newUser.username) {
            alert("Vui lòng điền đầy đủ thông tin người dùng.");
            return;
        }
        // Tạo một người dùng mới
        const id = users.length + 1;
        const user = { id, ...newUser };
        // Thêm người dùng mới vào danh sách
        setUsers([...users, user]);
        // Reset trạng thái của form và thông tin người dùng mới
        setShowAddForm(false);
        setNewUser({ name: '', email: '', username: '' });
    };

    const cancelAddUser = () => {
        setShowAddForm(false);
        setNewUser({ name: '', email: '', username: '' });
    };

    return (
        <div className='px-3'>
            {/* <Nav Toggle={Toggle} /> */}
            <div className='container-fluid'>
            <table className="table caption-top bg-white rounded mt-2">
                    <caption className='text-white-fs-4'>Danh sách người dùng</caption>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mật khẩu</th>
                            <th scope="col">Thao tác</th> {/* Thêm cột thể hiện các thao tác */}
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
            <tr key={user.id}> {/* Use user.id as the key */}
        <th scope="row">
            <div className='thuser'>{user.id}</div>
        </th>
        <td>
            <div className='thuser'>{user.lastName}</div>
        </td>
        <td>
            <div className='thuser'>{user.email}</div>
        </td>
        <td>
            <div className='thuser'>{user.passwordHash}</div>
        </td>
        <td>
            {/* Nút xóa với sự kiện onClick */}
            <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.id)}>Xóa</button>
            {/* Nút sửa với sự kiện onClick */}
            <button className="btn btn-primary btn-sm me-2" onClick={() => editClicked(user)}>Sửa</button>
        </td>
    </tr>
))}


                    </tbody>
                </table>


                {/* Nút thêm người dùng với sự kiện onClick */}
                <button className="btn btn-success me-2" onClick={addUser}>Thêm người dùng</button>
                {/* Form thêm người dùng */}
                {showAddForm && (
                    <div className="mt-3">
                        <h5>Thêm người dùng mới</h5>
                        <input type="text" name="name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Tên" className="form-control mt-2" />
                        <input type="email" name="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" className="form-control mt-2" />
                        <input type="text" name="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="Tài khoản" className="form-control mt-2" />
                        <button className="btn btn-primary mt-2 me-2" onClick={saveUser}>Lưu</button>
                        <button className="btn btn-secondary mt-2" onClick={cancelAddUser}>Hủy</button>
                    </div>
                )}
                {/* Form sửa người dùng */}
                {showEditForm && (
                    <div className="mt-3">
                        <h5>Sửa thông tin người dùng</h5>
                        <input type="text" name="name" value={editUser.name} onChange={handleEditInputChange} placeholder="Tên" className="form-control mt-2" />
                        <input type="email" name="email" value={editUser.email} onChange={handleEditInputChange} placeholder="Email" className="form-control mt-2" />
                        <input type="text" name="username" value={editUser.username} onChange={handleEditInputChange} placeholder="Tài khoản" className="form-control mt-2" />
                        <button className="btn btn-primary mt-2 me-2" onClick={saveEditUser}>Lưu</button>
                        <button className="btn btn-secondary mt-2" onClick={cancelEditUser}>Hủy</button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default UserManage;
