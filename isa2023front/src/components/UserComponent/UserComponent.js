
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './user-component.css';
//import { GetUserById } from '../../services/UserService';
function UserComponent() {
  const [open, setOpen] = React.useState(false);

  var user={
    username: 'John Doe',
    email: 'john.doe@example.com',
  };
  const [userData,setUserData]=useState([]);
  useEffect(()=>{
    //GetUserById().then((res)=>setUserData(res.data));
    console.log(userData);
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color='secondary' onClick={handleClickOpen}>
        Update user info
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change user info:
          </DialogContentText>
          <TextField
            autoFocus
            label="Username"
            defaultValue={user.username}
            fullWidth
            variant="filled"
            className='text-field'
          />
          <TextField
            autoFocus
            label="Email"
            defaultValue={user.email}
            fullWidth
            variant="filled"
            className='text-field'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

}

export default UserComponent;
