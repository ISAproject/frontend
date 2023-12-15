import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './register-user-form-component.css';
import { GetUserByEmail } from '../../services/UserService';
import authService from '../../services/auth.service.js';

const RegisterUserFormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    tel_number: '',
    state: '',
    city: '',
    role: '',
    company_info: '',
    occupation: ''
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    first_name: false,
    last_name: false,
    tel_number: false,
    state: false,
    city: false,
    role: false,
    company_info: false,
    occupation: false
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

    const requiredFields = ['username', 'occupation', 'email', 'first_name', 'last_name', 'tel_number', 'state', 'city', 'company_info'];
    const isOccupationSelected = formData.role !== '';

    const hasRequiredFieldErrors = requiredFields.some((field) => formData[field] === '' || errors[field]);

    const passwordMatchError = formData.password !== formData.confirmPassword;

    if (hasRequiredFieldErrors || passwordMatchError || !isOccupationSelected) {
      alert('Please fill in all required fields, ensure password match, and select an occupation.');
    } else {
      console.log('Form submitted successfully:', formData);

      let user = {
        email: formData.email,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        state: formData.state,
        city: formData.city,
        tel_number: formData.tel_number,
        password: formData.password,
        role: formData.role, 
        company_info: formData.company_info,
        occupation: formData.occupation,
        is_verified: false
      };
      GetUserByEmail(user.email).then((res)=>{
        if (!res.data) {
          authService.register(user)
            .then((addedUser) => {
              console.log('Added user:', addedUser);
              setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                first_name: '',
                last_name: '',
                tel_number: '',
                state: '',
                city: '',
                role: '',
                company_info: '',
                occupation:''
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
        
        else{
          alert('Email adress you entered already exists in the system.');
        }
      });

    }
  };

  return (
    <div>
      <h2 style={{ color: theme.palette.secondary.main }}>Register User</h2>
      <form onSubmit={handleSubmit}>
      <TextField  color='secondary' size='small' label="Username" variant="outlined" name="username" value={formData.username} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Confirm Password" variant="outlined" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Email" variant="outlined" type="email" name="email" value={formData.email} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Name" variant="outlined" type="text" name="first_name" value={formData.first_name} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Surname" variant="outlined" type="text" name="last_name" value={formData.last_name} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Phone Number" variant="outlined" type="tel" name="tel_number" value={formData.tel_number} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="State" variant="outlined" type="text" name="state" value={formData.state} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Occupation" variant="outlined" type="text" name="occupation" value={formData.occupation} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="City" variant="outlined" type="text" name="city" value={formData.city} onChange={handleChange}/>
        <br />

        <TextField color='secondary' size='small'  label="Company Info" variant="outlined" type="text" name="company_info" value={formData.company_info} onChange={handleChange}/>
        <br />
        <FormControl style={{ marginBottom: '16px', width:'220px', height:'50px' }} fullWidth variant="outlined" required error={errors.role}>
          <InputLabel id="occupation-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="">Select Occupation</MenuItem>
            <MenuItem value="ROLL_SYSTEM_ADMIN">System admin</MenuItem>
            <MenuItem value="ROLL_COMPANY_ADMIN">Company admin</MenuItem>
            <MenuItem value="ROLL_USER">User</MenuItem>
          </Select>
        </FormControl>
        <br />

        <Button type="submit" variant="contained" color='secondary' style={{ marginBottom:'4vh',paddingLeft: '64px', paddingRight: '64px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterUserFormComponent;
