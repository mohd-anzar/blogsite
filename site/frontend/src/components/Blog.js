import axios from 'axios'
import Bloglay from "../components/Bloglay";
import React, { useEffect, useState } from 'react'

const Blog = () => {
  const [blogs,setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs").catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  },[]);
  console.log(blogs)
  return (
    <div>
      {blogs && blogs.map((blog,index)=>{
        return <Bloglay id={blog._id} isUser={localStorage.getItem("userid")===blog.user._id} title={blog.title} disc={blog.discription} imageu={blog.image} user={blog.user.name}/>
      })}
    </div>
  )
}

export default Blog
