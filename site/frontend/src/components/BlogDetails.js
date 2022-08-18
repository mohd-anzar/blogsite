import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {Box,Typography,InputLabel,Button,TextField} from "@mui/material";
const BlogDetails = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
   
  });
  const handlerChange = (e) => {
    
    setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
  console.log(inputs); 
} 
  const [blog,setBlog]=useState();
  const id= useParams().id;
  console.log(id);
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blogs/${id}`).catch((err)=> console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({ title:data.blog.title,
      description:data.blog.discription,
      })
    });
  },[id]);
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blogs/update/${id}`,{
      title: inputs.title,
      discription: inputs.description,
    }).catch((err)=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => navigate("/myblogs/"));
  }
  return (
    
    <div>{inputs&&
        <form  onSubmit={handleSubmit}>
        <Box border={3} width="80%" borderColor="green" boxShadow="10px 10px 20px " padding={4} margin="auto"  marginTop={5} display="flex" flexDirection={'column'}>
            <Typography  fontWeight={'bold'} padding={3} color="grey" variant="h3" textAlign={'center'}>Post Your Blog</Typography>
            <InputLabel  sx={{mb:1,mt:2,fontSize: "24px",fontWeight: "bold"}}>Title</InputLabel>
            <TextField name="title"type="string" onChange={handlerChange} value={inputs.title} margin={"auto"} variant="outlined"/>
            <InputLabel  sx={{mb:1,mt:2,fontSize: "24px",fontWeight: "bold"}}>Description</InputLabel>
            <TextField name="description" onChange={handlerChange} value={inputs.description} margin={"auto"} variant="outlined"/>
            
            <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetails