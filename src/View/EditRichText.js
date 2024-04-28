import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../Component/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Style/EditRichText.scss'
function EditRichText() {
  const [userInfo, setUserInfo] = useState({
    Id:'ef602914-5d0e-4b35-a574-a10f6c1cb760',
    ID_CATEGORY:'',
    CONTENT: '',
    TITLE: '',
  });
  const [selector, setSelector] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const onChangeValue = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://localhost:44337/api/Historys/GetIdCatogary");
        setSelector(res.data || []);
      } catch(error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onContentChange = (value) => {
    setUserInfo({ ...userInfo, CONTENT: value });
  };

  const onCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId); // Lưu trữ ID_CATEGORY được chọn trong state selectedCategory
  setUserInfo({ ...userInfo, ID_CATEGORY: selectedCategoryId });
  };

  const onTitleChange = (e) => {
    setUserInfo({ ...userInfo, TITLE: e.target.value });
  };

  const [isError, setIsError] = useState(null);

  const addDetails = async (event) => {
    try {
      event.preventDefault();
      if (userInfo.CONTENT.length < 50) {
        setIsError('Required, Add description minimum length 50 characters');
        return;
      }
      console.log(userInfo)

     const formData = new FormData();
    formData.append('Id', userInfo.Id);
    formData.append('iD_CATOGERY', selectedCategory);
    formData.append('CONTENT', userInfo.CONTENT);
    formData.append('TITLE', userInfo.TITLE);

axios.post('https://localhost:44337/api/Historys/AddHistory', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
        .then(res => {
          if (res.status===200) {
                toast.success("Lưu Thành Công")
                setUserInfo({
                  ID_CATEGORY: "",
                  CONTENT: "",
                  TITLE: "",
                });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center">Thêm bài viết</h1>
            <form onSubmit={addDetails} className="update__forms">
              <div className="form-group">
                <label className="font-weight-bold">Chọn danh mục <span className="text-danger">*</span></label>
                <select name="ID_CATEGORY" value={userInfo.ID_CATEGORY} onChange={onCategoryChange} className="form-control" required>
                  {selector.map(item => (
                    <option key={item.iD_CATOGERY} value={item.iD_CATOGERY}>{item.namE_CATOGERY}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Nhập tiêu đề bài viết<span className="text-danger">*</span></label>
                <input type="text" name="TITLE" value={userInfo.TITLE} onChange={onChangeValue} className="form-control" placeholder="Title" required />
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Nội dung<span className="text-danger">*</span></label>
                <EditorToolbar toolbarId={'t1'} />
                <ReactQuill
                  theme="snow"
                  value={userInfo.CONTENT}
                  onChange={onContentChange}
                  placeholder={"Write something awesome..."}
                  modules={modules('t1')}
                  formats={formats}
                  style={{height:'150px'}}
                />
              </div>
              {isError && <div className="alert alert-danger">{isError}</div>}
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary" style={{width:'200px',margin:'10px'}}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default EditRichText;
