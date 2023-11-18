
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './user-component.css';
import { GetUserById,Update } from '../../services/UserService';

function UserComponent({userInfoFunction}) {
  const [open, setOpen] = React.useState(false);

  let user={
    username:"",
    first_name:"",
    last_name:"",
    state:"",
    city:"",
    tel_number:"",
    occupation:"",
    company_info:""

  }
  const [userData,setUserData]=useState(user);

  const handleChange = (field) => (event) => {
    setUserData({ ...userData, [field]: event.target.value });
    
  };


  
  useEffect(()=>{
    GetUserById(1).then((res)=>setUserData(res.data));
  },[open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateUserData = () => {
    for (const key in userData) {
      if (userData.hasOwnProperty(key) && userData[key] === '') {
        return false; // At least one field is empty
      }
    }
    return true; // All fields are non-empty
  };
  const handleSubmit = () => {
    if(validateUserData()){
      Update(1,userData);
      userInfoFunction();
      setOpen(false);
    }
    else{
      alert("Please fill all of the fields");
    }
    
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
              defaultValue={userData.username}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('username')}
              error={!userData.username}
              margin='normal'
            />
            <TextField
              autoFocus
              label="First name"
              defaultValue={userData.first_name}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('first_name')}
              error={!userData.first_name}
              margin='normal'
            />
            <TextField
              autoFocus
              label="Last name"
              defaultValue={userData.last_name}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('last_name')}
              error={!userData.last_name}
              margin='normal'
            />
            <TextField
              autoFocus
              label="State"
              defaultValue={userData.state}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('state')}
              error={!userData.state}
              margin='normal'
            />
            <TextField
              autoFocus
              label="City"
              defaultValue={userData.city}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('city')}
              error={!userData.city}
              margin='normal'
            />
            <TextField
              autoFocus
              label="Phone number"
              defaultValue={userData.tel_number}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('tel_number')}
              error={!userData.tel_number}
              margin='normal'
            />
            <TextField
              autoFocus
              label="Occupation"
              defaultValue={userData.occupation}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('occupation')}
              error={!userData.occupation}
              margin='normal'
            />
            <TextField
              autoFocus
              label="Company info"
              defaultValue={userData.company_info}
              fullWidth
              variant="filled"
              className='text-field'
              onChange={handleChange('company_info')}
              error={!userData.company_info}
              margin='normal'
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UserComponent;
