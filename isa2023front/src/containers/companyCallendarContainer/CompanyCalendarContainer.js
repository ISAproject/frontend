import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import {GetUserById, GetUserByUsername} from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import EquipmentSearchComponent from "../../components/equipmentSearchComponent/equipmentSearchComponent";
import CompanyCreationComponent from "../../components/CompanyCreationComponent/companyCreationComponent";
import CompanyCalendarComponent from "../../components/companyCalendarComponent/companyCalendar";
import authService from "../../services/auth.service";
import {GetByComapany} from "../../services/ReservedDateService";
function CompanyCalendarContainer() {
    let reservedDates = {
        id: '',
        dateTimeInMS: '',
        duration: '',
        equipments: '',
        userId: ''
    };
    const [user, setUser] = useState({});
    const authUser =  localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

    const [reservedDatesData,setreservedDatesData]=useState(reservedDates);
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




    return (
        <Box>{
            (user && user?.role==='ROLL_COMPANY_ADMIN') ?
                (<CompanyCalendarComponent></CompanyCalendarComponent>):
                <h2>Page not found!</h2>
        }

        </Box>
    );
}

export default CompanyCalendarContainer;