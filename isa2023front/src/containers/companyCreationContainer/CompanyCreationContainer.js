import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import EquipmentSearchComponent from "../../components/equipmentSearchComponent/equipmentSearchComponent";
import CompanyCreationComponent from "../../components/CompanyCreationComponent/companyCreationComponent";
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
      <Box width={300}>
          <CompanyCreationComponent></CompanyCreationComponent>
      </Box>
    );
  }
  
  export default CompanyCreationContainer;