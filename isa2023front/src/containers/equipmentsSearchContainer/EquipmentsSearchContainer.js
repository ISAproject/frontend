import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import EquipmentSearchComponent from "../../components/equipmentSearchComponent/equipmentSearchComponent";
function EquipmentsSearchContainer() {
    let equipment={
        name:"",
        grade:"",
        description:"",
        quantity:"",
        type:"",
        company_id:""
    }
    const [equipmentData,setEquipmentData]=useState(equipment);
    const equipmentId = useParams().id;



    return (
      <Box width={300}>
          <EquipmentSearchComponent></EquipmentSearchComponent>
      </Box>
    );
  }
  
  export default EquipmentsSearchContainer;