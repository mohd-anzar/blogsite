import React, { useState } from 'react'

import { AppBar, Button, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { authActions } from '../store';
const Header = () => {
  const dispath = useDispatch();
  const [value, setValue] = useState('1');
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn);
 
  return <AppBar position="sticky" sx={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,121,9,1) 41%, rgba(0,212,255,1) 100%)' }}>
    <Toolbar>
      <Typography variant="h4">Blog Site</Typography>
      {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
        <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
          <Tab LinkComponent={Link} to="/blogs" value="1" label="All Blogs" />
          <Tab LinkComponent={Link} to="/myBlogs" value='2' label="My Blogs" />
          <Tab LinkComponent={Link} to="/blogs/add" value="3" label="Add Blogs" />
        </Tabs>

      </Box>}
      <Box display="flex" marginLeft="auto">
       {!isLoggedIn && <Button LinkComponent={Link} to="/login" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">LogIn</Button>}
        {!isLoggedIn &&  <Button LinkComponent={Link} to="/login" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">SignUp</Button>}
       {isLoggedIn && <Button onClick={() => dispath(authActions.logout())} LinkComponent={Link} to="/login" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">LogOut</Button>}
      </Box>
    </Toolbar>
  </AppBar>;
}

export default Header