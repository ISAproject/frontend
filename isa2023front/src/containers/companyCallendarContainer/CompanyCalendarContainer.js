import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import EquipmentSearchComponent from "../../components/equipmentSearchComponent/equipmentSearchComponent";
import CompanyCreationComponent from "../../components/CompanyCreationComponent/companyCreationComponent";
import CompanyCalendarComponent from "../../components/companyCalendarComponent/companyCalendar";
function CompanyCalendarContainer() {
    let reservedDates = {
        id: '',
        dateTimeInMS: '',
        duration: '',
        equipments: '',
        userId: ''
    };
    const [reservedDatesData,setreservedDatesData]=useState(reservedDates);



    return (
        <Box>
            <CompanyCalendarComponent></CompanyCalendarComponent>
        </Box>
    );
}

export default CompanyCalendarContainer;