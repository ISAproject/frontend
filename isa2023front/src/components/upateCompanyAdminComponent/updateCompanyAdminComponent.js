import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';
import Button from '@mui/material/Button';
import { GetUserById, GetUserByUsername, UpdateCompanyAdmin } from '../../services/UserService.js';
import { useParams } from 'react-router-dom';
import { GetUserByEmail } from '../../services/UserService';
import * as styles from './updateCompanyAdminComponent.css';
import authService from "../../services/auth.service";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';




function UpdateCompanyAdminComponent() {
  const [id, setId] = useState()

  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    tel_number: '',
    state: '',
    city: '',
    role: '',
    occupation: '',
    company_info: '',
    verified: true,
    firstLogin: true
  });

  const [errors, setErrors] = useState({
    username: false,
    password: true,
    email: false,
    first_name: false,
    last_name: false,
    tel_number: false,
    state: false,
    city: false,
    occupation: false,
    company_info: false,
  });

  const [user, setUser] = useState({})
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }


  useEffect(() => {
    GetUserByUsername(authUser.username)
      .then((res) => {
        setId(res.data.id);
        setUser(res.data);

        let userData = res.data;
        userData.password = '';
        console.log(res.data);

        setFormData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      })
  }, [id])

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

    const requiredFields = ['username', 'password', 'email', 'first_name', 'last_name', 'tel_number', 'state', 'city', 'occupation', 'company_info'];

    const hasRequiredFieldErrors = requiredFields.some((field) => formData[field] === '' || errors[field]);

    if (hasRequiredFieldErrors) {
      alert('Please fill in all required fields, ensure password match, and select an occupation.');
    } else {
      console.log('Form submitted successfully:', formData);

      let user = {
        id: id,
        email: formData.email,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        state: formData.state,
        city: formData.city,
        tel_number: formData.tel_number,
        occupation: formData.occupation,
        password: formData.password,
        role: formData.role,
        company_info: formData.company_info,
        verified: formData.verified,
        firstLogin: formData.firstLogin
      };
      UpdateCompanyAdmin(id, user);

      formData.password = '';
      setFormData(formData);

      window.location.href = '/home';
      alert("Your profile info are successfully updated!")
    }
  };

  return (
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
      <div>
        <h2 style={{ color: theme.palette.secondary.main }}>Company admin info</h2>
        <form onSubmit={handleSubmit}>
          <TextField color='secondary' size='small' id="outlined-basic" label="Username" variant="outlined" name="username" className='text-field-wrapper' value={formData.username} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="New password" variant="outlined" name="password" className='text-field-wrapper' value={formData.password} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="Email" variant="outlined" type="email" name="email" className='text-field-wrapper' value={formData.email} onChange={handleChange} disabled />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="Name" variant="outlined" type="text" name="first_name" className='text-field-wrapper' value={formData.first_name} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="Surname" variant="outlined" type="text" name="last_name" className='text-field-wrapper' value={formData.last_name} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="Phone Number" variant="outlined" type="tel" name="tel_number" className='text-field-wrapper' value={formData.tel_number} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="State" variant="outlined" type="text" name="state" className='text-field-wrapper' value={formData.state} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="City" variant="outlined" type="text" name="city" className='text-field-wrapper' value={formData.city} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="Occupation" variant="outlined" type="text" name="occupation" className='text-field-wrapper' value={formData.occupation} onChange={handleChange} />
          <br />

          <TextField color='secondary' size='small' id="outlined-basic" label="Company Info" variant="outlined" type="text" name="company_info" className='text-field-wrapper' value={formData.company_info} onChange={handleChange} />
          <br />

          <Button type="submit" variant="contained" color='secondary' style={{ marginBottom: '4vh', paddingLeft: '64px', paddingRight: '64px' }}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default UpdateCompanyAdminComponent;