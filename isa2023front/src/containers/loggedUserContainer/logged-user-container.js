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
import { useParams } from 'react-router-dom';
import { GetUserById } from '../../services/UserService';
import  { useState,useEffect } from 'react';


export default function LoggedUserContainer() {
    const userId = useParams().userId;
    const [user, setUser] = useState({});

    useEffect(() => {
        GetUserById(userId)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="accent" component="div" sx={{ flexGrow: 1 }}>
          <span style={{ fontWeight: 'bold' }}>MediConnect</span>
          </Typography>
          <Button color="accent" component={Link} to="/home">Home</Button>
        </Toolbar>
      </AppBar>
      <h2 style={{ color: theme.palette.secondary.main }}>Welcome {user.username}</h2>
    </Box>
  );
}