import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
import  { useState,useEffect } from 'react';
import { GetUserByUsername } from '../../services/UserService';
import authService from '../../services/auth.service.js';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
export default function LoggedUserContainer() {
    const [user, setUser] = useState({});
    const authUser =  localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

    useEffect(() => {
      console.log(authUser);
      if(!authUser)
        return;
        GetUserByUsername(authUser?.username)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      function logOut() {
         window.location.href='/home';
         authService.logout();
      }
      

  return (
    <Box sx={{ flexGrow: 1 }}>
      {
        authUser
          ?
          <>
          <AppBar position="static" color='secondary'>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="accent"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MonitorHeartIcon />
              </IconButton>
              <Typography variant="h6" color="accent" component="div" sx={{ flexGrow: 1 }}>
              <span style={{ fontWeight: 'bold' }}>MediConnect</span>
              </Typography>
              <Button color="accent" component={Link} to="/home">Home</Button>
              <Button color="accent" component={Link} onClick={logOut}>Logout</Button>
            </Toolbar>
          </AppBar>
          <h2 style={{ color: theme.palette.secondary.main }}>Welcome {user.username}</h2>
          </>
          :
          <>
            <h2 style={{ color: theme.palette.secondary.main }}>Page not found :/</h2>
          </>
      }
    </Box>
  );
}