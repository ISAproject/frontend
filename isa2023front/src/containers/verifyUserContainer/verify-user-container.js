import './verify-user-container.css'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function VerifyUserContainer() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', height: '100vh' }}>
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
                    <Button color="accent">Login</Button>
                    <Button color="accent" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>

            <Typography style={{padding:'16vh',paddingBottom:'8vh',fontWeight: 'bold', display: 'flex', alignItems:'center'}}  variant="h4" color="secondary">
                <CheckCircleOutlineIcon fontSize='large' style={{marginRight:'2vh'}}></CheckCircleOutlineIcon>You have successfully registered!
            </Typography>
            <Box sx={{display:'flex', gap:'12px'}}>
                <Button sx={{paddingX:'38px'}} component={Link} to="/home" color='secondary' variant="outlined">Home</Button>
                <Button sx={{paddingX:'38px'}} color='secondary' variant="contained">Login</Button>
            </Box>
        </Box>
    );
}
