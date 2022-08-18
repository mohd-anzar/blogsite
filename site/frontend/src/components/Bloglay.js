import React from 'react'
import {Box,Card,Avatar,CardContent,Typography,CardMedia,CardHeader, IconButton} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Bloglay({title,disc,imageu,user,isUser,id}) {
  console.log(isUser);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blogs/${id}`).catch((err)=> console.log(err));
    const data = await res.data;
    return data;
  }
  const handledelete = () => {
       deleteRequest().then(() => navigate("/")).then(()=> navigate("/myblogs/"));
  }
  return (
    <div>
        <Card sx={{ width: "50%" ,margin:"auto",marginTop: 4 ,padding: 2,boxShadow: "5px 5px 10px",":hover:":{
            boxShadow: "100px 10px 20px",
        },}}>
          {isUser && 
            <Box display="flex">
               <IconButton onClick={handleEdit} sx={{ml:"auto"}}><EditIcon /></IconButton>
              <IconButton  onClick={handledelete} ><DeleteOutlineIcon /></IconButton>
             
            </Box>
          }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red"}} aria-label="recipe">
            {user}
          </Avatar>
        }
      
        title={title}
      
      />
      <CardMedia
        component="img"
  
        image={imageu}
        alt="Paella dish"
      />
      <CardContent>
        <hr></hr>
        <br></br>
        <Typography variant="body2" color="text.secondary">
          <b>{user}</b> {": "}{disc}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}
