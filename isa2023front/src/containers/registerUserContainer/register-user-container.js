import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RegisterUserFormComponent from '../../components/registerUserFormComponent/register-user-form-component'
import { Link } from 'react-router-dom';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export default function RegisterUserContainer() {
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
          <Button color="accent" component={Link} to="/login">Login</Button>
          <Button color="accent" component={Link} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
      <RegisterUserFormComponent/>
    </Box>
  );
}