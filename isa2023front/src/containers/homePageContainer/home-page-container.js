import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { GetUserByUsername, UpdateCompanyAdmin } from "../../services/UserService";
import authService from "../../services/auth.service";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';


export default function HomePageContainer() {
  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }

  const [user, setUser] = useState({})
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

  useEffect(() => {

    if (authUser) {
      GetUserByUsername(authUser?.username)
        .then((res) => {
          setUser(res.data);

          console.log(res.data)
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        })
    }
  });

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

          {authUser ?
            <>
              {user?.role === 'ROLL_COMPANY_ADMIN' ?
                <Button color="accent" component={Link} to="/companyAdmin">Profile</Button>
                : <></>
              }
              <Button color="accent" component={Link} to="/companies">Companies</Button>
              <Button color="accent" component={Link} onClick={logOut}>Logout</Button>
            </>
            : <><Button color="accent" component={Link} to="/login">Login</Button>
              <Button color="accent" component={Link} to="/register">Register</Button>
            </>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}