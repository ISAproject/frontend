
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GetUserById, UpdateUser } from '../../services/UserService';
import Box from '@mui/material/Box';


function UserUpdateComponent({userInfoFunction,userId}) {
  
  const [open, setOpen] = React.useState(false);

  let user={
    id:0,
    username:"",
    email: "",
    password: "",
    first_name:"",
    last_name:"",
    state:"",
    city:"",
    tel_number:"",
    occupation:"",
    company_info:"",
    role:"",
    verified:false

  

  }
  const [userData,setUserData]=useState(user);

  const handleChange = (field) => (event) => {
    setUserData({ ...userData, [field]: event.target.value });
    
  };
  useEffect(() => {
    GetUserById(userId).then((res) => {
      // Filter out unwanted fields
      const filteredUserData = Object.keys(user).reduce((filtered, key) => {
        if (res.data.hasOwnProperty(key)) {
          filtered[key] = res.data[key];
        }
        return filtered;
      }, {});
  
      setUserData(filteredUserData);
    });
  }, [open, userId]);

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
      console.log(userData)
      UpdateUser(userId,userData).then(()=>userInfoFunction());
      setOpen(false);
    }
    else{
      alert("Please fill all of the fields");
    }
    
  };
  
  return (
    <React.Fragment>
      <Button variant="contained" color='secondary' onClick={handleClickOpen} fullWidth>  
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
              label="First name"
              defaultValue={userData.first_name}
              fullWidth
              variant="filled"
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

export default UserUpdateComponent;
