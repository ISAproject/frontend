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
import { useState, useEffect } from 'react';
import { GetUserByUsername, UpdateCompanyAdmin } from '../../services/UserService';
import authService from '../../services/auth.service.js';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';
import * as styles from './logged-user-container.css';


export default function LoggedUserContainer() {
  const [user, setUser] = useState({});
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

  useEffect(() => {
    console.log(authUser);
    if (!authUser)
      return;
    GetUserByUsername(authUser?.username)
      .then(response => {
        let userData = response.data;
        userData.password = '';
        setUser(userData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    })
  };

  const handleChangePasswordClick = () => {
    if(user.password !== '' && user.password !== null){
      user.firstLogin = false;
      console.log(user)

      let userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        state: user.state,
        city: user.city,
        tel_number: user.tel_number,
        occupation: user.occupation,
        password: user.password,
        role: user.role, 
        company_info: user.company_info,
        verified: user.verified,
        firstLogin: user.firstLogin
      };
      UpdateCompanyAdmin(userData.id, userData);
      
      window.location.href='/home';
    }
    else{
      alert("Fill the field for password")
    }
  }

  return (
    <>
      {user.firstLogin ?
        <>
          <div className='d-flex justify-content-center flex-column first-login-wrapper'>
            <TextField color='secondary' size='small' id="outlined-basic" label="Change password" variant="outlined" name="password" className='text-field-wrapper' value={user.password} onChange={handleChange} />
            <br />

            <Button type="submit" variant="contained" color='secondary' style={{ marginBottom: '4vh', paddingLeft: '64px', paddingRight: '64px' }} onClick={handleChangePasswordClick}>
              Submit
            </Button>
          </div>
        </>
        :
        <>
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
                  <MenuIcon />
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
        </>
      }
    </>
  );
}
