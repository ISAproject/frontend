import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import {GetUserByUsername} from "../../services/UserService";
import authService from "../../services/auth.service";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export default function HomePageContainer() {
  function logOut() {
    window.location.href='/home';
    authService.logout();
  }

  const authUser =  localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
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

          {authUser?
              <Button color="accent" component={Link} onClick={logOut}>Logout</Button>
              :<><Button color="accent" component={Link} to="/login">Login</Button>
                <Button color="accent" component={Link} to="/register">Register</Button></>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}