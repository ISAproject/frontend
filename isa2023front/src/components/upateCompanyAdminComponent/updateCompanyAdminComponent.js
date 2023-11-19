import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';
import Button from '@mui/material/Button';
import { GetUserById, UpdateUser } from '../../services/UserService.js';
import { useParams } from 'react-router-dom';
import { GetUserByEmail } from '../../services/UserService'; 


function UpdateCompanyAdminComponent() {
    const id = useParams().id;

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

    useEffect ((res) => {
        GetUserById(id)
            .then((res) => {
                setFormData(res.data)
            })
            .catch((error) => console.log('Eerror fetching user data ', error))
    }
    , []);

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
    
        const requiredFields = ['username', 'email', 'first_name', 'last_name', 'tel_number', 'state', 'city', 'occupation', 'company_info'];

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
          };
          UpdateUser(id, user);

        }
      };

    return (
        <div>
            <h2 style={{ color: theme.palette.secondary.main }}>Company admin info</h2>
            <form onSubmit={handleSubmit}>
                <TextField color='secondary' size='small' id="outlined-basic" label="Username" variant="outlined" name="username" value={formData.username} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="Email" variant="outlined" type="email" name="email" value={formData.email} onChange={handleChange} disabled/>
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="Name" variant="outlined" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="Surname" variant="outlined" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="Phone Number" variant="outlined" type="tel" name="tel_number" value={formData.tel_number} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="State" variant="outlined" type="text" name="state" value={formData.state} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="City" variant="outlined" type="text" name="city" value={formData.city} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="Occupation" variant="outlined" type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
                <br />

                <TextField color='secondary' size='small' id="outlined-basic" label="Company Info" variant="outlined" type="text" name="company_info" value={formData.company_info} onChange={handleChange} />
                <br />

                <Button type="submit" variant="contained" color='secondary' style={{ marginBottom: '4vh', paddingLeft: '64px', paddingRight: '64px' }}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default UpdateCompanyAdminComponent;