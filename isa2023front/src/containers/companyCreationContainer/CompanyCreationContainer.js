import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import EquipmentSearchComponent from "../../components/equipmentSearchComponent/equipmentSearchComponent";
import CompanyCreationComponent from "../../components/CompanyCreationComponent/companyCreationComponent";
import RegisterUserFormComponent from "../../components/registerUserFormComponent/register-user-form-component";
import RegisterSystemAdminComponent from "../../components/registerSystemAdminComponent/registerSystemAdminComponent";
function CompanyCreationContainer() {
    let company = {
        address: '',
        administrator_id: '',
        avg_grade: '',
        description: '',
        name: ''
    };
    const [companyData,setCompanyData]=useState(company);



    return (
      <Box>
          {/*<CompanyCreationComponent></CompanyCreationComponent>*/}
          <RegisterSystemAdminComponent></RegisterSystemAdminComponent>
      </Box>
    );
  }
  
  export default CompanyCreationContainer;