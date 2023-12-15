import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';
import Button from '@mui/material/Button';
import { GetUserByEmail } from '../../services/UserService';
import InputIcon from '@mui/icons-material/Input';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service.js';

const LoginFormComponent = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    password: false,
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value === '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [ 'email', 'password'];

    const hasRequiredFieldErrors = requiredFields.some((field) => formData[field] === '' || errors[field]);

    if (hasRequiredFieldErrors) {
      alert('Please fill in all required fields.');
    } else {
      console.log('LoginForm submitted successfully:', formData);

    GetUserByEmail(formData.email).then((res)=>{
        if (res.data.verified) {
            let credentials = { username: res.data.username, password: formData.password};
            console.log(credentials);
            authService.login(credentials).then(() =>{
              console.log(localStorage.getItem('authUser')); 
              history(`/logged`);
            });
        }
        else{
            alert('Invalid account.');
        }
      });
    }
  };

  return (
    <div>
      <h2 style={{ color: theme.palette.secondary.main }}>Login User</h2>
      <form onSubmit={handleSubmit}>

        <TextField color='secondary' size='small' id="outlined-basic" label="Email" variant="outlined" type="email" name="email" value={formData.email} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small' id="outlined-basic" label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleChange}/>
        <br />

        <Button type="submit" variant="contained" color='secondary' style={{ marginBottom:'4vh',paddingLeft: '64px', paddingRight: '64px' }}>
          <InputIcon fontSize='medium' sx={{marginRight:'12px'}}></InputIcon>Login
        </Button>
      </form>
    </div>
  );
};

export default LoginFormComponent;
