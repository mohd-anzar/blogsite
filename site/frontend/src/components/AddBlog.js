import React, { useState } from 'react';
import {Box,Typography,InputLabel,Button} from "@mui/material";
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    title:"",
    description:"",
    imageURL:"",
  });
  const handlerChange = (e) => {
    
    setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
  console.log(inputs); 
} 
  const sendRequest = async () => {
      const res =await axios.post("http://localhost:5000/api/blogs/add",{
        title: inputs.title,
        discription: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userid")
      }).catch((err) => console.log(err));
      const data = res.data;
      return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=> console.log(data)).then(()=> navigate("/myblogs/"));
  }
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <Box border={3} width="60%" borderColor="green" boxShadow="10px 10px 20px " padding={4} margin="auto"  marginTop={5} display="flex" flexDirection={'column'}>
            <Typography  fontWeight={'bold'} padding={3} color="grey" variant="h3" textAlign={'center'}>Post Your Blog</Typography>
            <InputLabel  sx={{mb:1,mt:2,fontSize: "24px",fontWeight: "bold"}}>Title</InputLabel>
            <TextField name="title"type="string" onChange={handlerChange} value={inputs.title} margin={"auto"} variant="outlined"/>
            <InputLabel  sx={{mb:1,mt:2,fontSize: "24px",fontWeight: "bold"}}>Description</InputLabel>
            <TextField name="description" onChange={handlerChange} value={inputs.description} margin={"auto"} variant="outlined"/>
            <InputLabel  sx={{mb:1,mt:2,fontSize: "24px",fontWeight: "bold"}}>ImageURL</InputLabel>
            <TextField name="imageURL"  value={inputs.imageURL} onChange={handlerChange} margin={"auto"} variant="outlined"/>
            <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
