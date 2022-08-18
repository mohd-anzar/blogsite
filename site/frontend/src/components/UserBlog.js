import React, { useEffect, useState } from 'react'
import Bloglay from './Bloglay';
import axios from "axios";
const UserBlog = () => {
  const [user,setUser] = useState();
  const [blogs,setBlog] = useState();
  const id = localStorage.getItem("userid");
  const sendRequest = async () => {
      const res = await axios.get(`http://localhost:5000/api/blogs/user/${id}`).catch((err) => console.log(err));
      const data = await res.data;
      console.log(data);
      return data;
  }
  useEffect(() => {
    sendRequest().then((data)=> {setBlog(data.blog.blogs) 
    setUser(data.blog.name)});
  },);
  console.log(blogs);
  return (
    <div>
       {blogs && blogs.map((blog,index)=>{
        return <Bloglay id={blog._id} isUser={true} title={blog.title} disc={blog.discription} imageu={blog.image} user={user}/>
      })}
    </div>
  )
}

export default UserBlog