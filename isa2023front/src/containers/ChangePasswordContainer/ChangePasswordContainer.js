import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import {
    GetUserByEmail,
    GetUserById,
    GetUserByUsername,
    UpdateUser,
    UpdateUserPassword
} from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import {Link, useParams} from 'react-router-dom';
import EquipmentSearchComponent from "../../components/equipmentSearchComponent/equipmentSearchComponent";
import CompanyCreationComponent from "../../components/CompanyCreationComponent/companyCreationComponent";
import CompanyCalendarComponent from "../../components/companyCalendarComponent/companyCalendar";
import authService from "../../services/auth.service";
import {GetByComapany} from "../../services/ReservedDateService";
import theme from "../../styles/theme";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

function ChangePasswordContainer() {
    const history = useNavigate();
    const [user, setUser] = useState({});
    const authUser =  localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    useEffect(() => {
        console.log(authUser);
        if(!authUser)
            return;
        GetUserByUsername(authUser?.username)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const [errors, setErrors] = useState({
        password: false,
        confirmPassword: false
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
        if(formData.password===formData.confirmPassword) {

            let user1 = {
                email: user.email,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                state: user.state,
                city: user.city,
                tel_number: user.tel_number,
                password: formData.password,
                role: user.role,
                company_info: user.company_info,
                occupation: user.occupation,
                is_verified: true
            };
            UpdateUserPassword(user.id,user1).then(response=>
            {
                alert("Password is changed!")
                history('/logged');
            })
        }
        else
            alert("Password does not match!")

    };


    return (
        <Box>{
            (user && user?.role==='ROLL_SYSTEM_ADMIN') ?
                (
                    <div>
                        <h2 style={{ color: theme.palette.secondary.main }}>Change password</h2>
                        <form onSubmit={handleSubmit}>


                            <TextField color='secondary' size='small'  label="Password" variant="outlined" type="password" name="password" value={formData.password}  onChange={handleChange}/>
                            <br />

                            <TextField color='secondary' size='small'  label="Confirm Password" variant="outlined" type="password" name="confirmPassword" value={formData.confirmPassword}  onChange={handleChange}/>
                            <br />


                            <Button type="submit" variant="contained" color='secondary' style={{ marginBottom:'4vh',paddingLeft: '64px', paddingRight: '64px' }}>
                                Submit
                            </Button>
                        </form>
                    </div>
                ):
                <h2>Page not found!</h2>
        }

        </Box>
    );
}

export default ChangePasswordContainer;