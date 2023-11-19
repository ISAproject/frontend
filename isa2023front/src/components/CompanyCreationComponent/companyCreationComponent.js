import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {CreateCompany} from "../../services/CompanyService";
import {Routes, Route, useNavigate} from 'react-router-dom';
import RegisterUserFormComponent from "../registerUserFormComponent/register-user-form-component";
import Box from '@mui/material/Box';
import {GetLastUser} from "../../services/UserService";

const CompanyCreationComponent = () => {
    const [formData, setFormData] = useState({
            address: '',
            administratorsId: [],
            description: '',
            name: ''
    });
    const [admin,setAdmin]=useState(false);
    const [adminClicked,setAdminClicked]=useState(false);
    const [errors, setErrors] = useState({
        address: false,
        administratorsId: false,
        avg_grade: false,
        description: false,
        name: false
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

    const handleSubmitUser=(e)=>
    {
        e.preventDefault();
        setAdminClicked(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = ['address', 'description', 'name'];


        const hasRequiredFieldErrors = requiredFields.some((field) => formData[field] === '' || errors[field]);



        if (hasRequiredFieldErrors) {
            alert('Please fill in all required fields, ensure password match, and select an occupation.');
        } else {
            console.log('Form submitted successfully:', formData);

            let company = {
                address: formData.address,
                administratorsId: [],
                description: formData.description,
                name: formData.name
            };
            GetLastUser().then((lastUser)=>{
                company.administratorsId.push(lastUser.data.id);
                CreateCompany(company).then((nesto) => {
                    console.log('Added company:', company);
                    setFormData(
                        {
                            address: '',
                            administratorsId: [],
                            description: '',
                            name: ''
                        }
                    )
                })
                    .catch((err) => {
                        console.error(err);
                    });
                }

            )
        }
    };
    const redirect=(e)=>
    {
        setAdmin(true);
        console.log(admin)
    }

    return (
        <div>
            <h2 style={{ color: theme.palette.secondary.main }}>Register Company</h2>
            <form onSubmit={handleSubmit}>
                <h3>First create administrator</h3>
                <Button variant="contained" color='secondary' style={{ marginBottom:'4vh',paddingLeft: '64px', paddingRight: '64px' }} onClick={redirect}>
                    Create administator
                </Button>
                <TextField  color='secondary' size='small' label="Name" variant="outlined" name="name" value={formData.name} onChange={handleChange}/>
                <br />

                <TextField color='secondary' size='small'  label="Address" variant="outlined"  name="address" value={formData.address} onChange={handleChange}/>
                <br />

                <TextField color='secondary' size='small'  label="Description" variant="outlined" name="description" value={formData.description} onChange={handleChange}/>
                <br />

                <Button type="submit" variant="contained" color='secondary' style={{ marginBottom:'4vh',paddingLeft: '64px', paddingRight: '64px' }}>
                    Submit
                </Button>
            </form>
            <form onSubmit={handleSubmitUser} >
                {admin && <RegisterUserFormComponent />}
            </form>

        </div>
    );
};

export default CompanyCreationComponent;
