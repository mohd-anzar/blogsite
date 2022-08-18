import Header from "./components/Header";
import Login from "./components/Login";
import Blog from "./components/Blog";
import UserBlog from "./components/UserBlog";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import {authActions} from "./store";


function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=> {
     if(localStorage.getItem("userid")){
          dispath(authActions.login());
     }
  },[dispath]);
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        {!isLoggedIn?<Route path="/login" element={<Login/>}/>:
        <>
        <Route path="/blogs" element={<Blog/>}/>
        <Route path="/myblogs" element={<UserBlog/>}/>
        <Route path="/myblogs/:id" element={<BlogDetails />}/>
        <Route path="/blogs/add" element={<AddBlog/>}/></>}
      
      </Routes>
    </main>
  </React.Fragment>;
}

export default App;
