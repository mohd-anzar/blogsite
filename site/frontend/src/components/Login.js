import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate= useNavigate();
  const dispath =  useDispatch();
  const [isSignUp,setSignUp]=useState(false);
  const [inputs,setInputs] = useState({
    name:"",
    email:"",
    password:"",
  })
  const sendRequest = async (type="login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  } 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(isSignUp){
      sendRequest("signup")
      .then((data) => localStorage.setItem("userid",data.user._id))
      .then(() => dispath(authActions.login()))
      .then(() => navigate("/blogs"))
      .then(data=>console.log(data));
    }
    else{
      sendRequest()
      .then((data) => localStorage.setItem("userid",data.user._id))
      .then(() => dispath(authActions.login()))
      .then(() => navigate("/blogs/"))
      .then(data=>console.log(data));
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Box maxWidth="400px" display="flex" flexDirection="column" justifyContent="center" alignItems={"center"} boxShadow="10px 10px 20px 20px #ccc" margin={"auto"} marginTop={10} padding={3}>
          <Typography variant="h4" marginTop={3}> {!isSignUp ? "Login" : "Signup"}</Typography>
          {isSignUp && <TextField name="name" value={inputs.name} onChange={handleChange} placeholder={"NAME"} margin={"normal"}/>}
         <TextField name="email" value={inputs.email} type="email" onChange={handleChange} placeholder={"EMAIL"} margin={"normal"}/>
          <TextField name="password" value={inputs.password} type="password" onChange={handleChange} placeholder={"PASSWORD"} margin={"normal"}/>
          <Button type="submit" margin="normal" variant="contained" sx={{borderRadius: 2}}>SUBMIT</Button>
          <Button onClick={()=> setSignUp(!isSignUp)}>CHANGE TO {isSignUp ? "LOGIN" : "SIGNUP"}</Button>

        </Box>
      </form>
    </div>
  )
}

export default Login;