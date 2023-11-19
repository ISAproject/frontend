import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";

function UserViewContainer() {  
    let user={
        username:"",
        first_name:"",
        last_name:"",
        state:"",
        city:"",
        tel_number:"",
        occupation:"",
        company_info:""
    }
    const [userData,setUserData]=useState(user);
    

    useEffect(()=>{
      GetUserById(1).then((res)=>setUserData(res.data));
    },[]);

    const handleUserInfo=()=>{
      GetUserById(1).then((res)=>setUserData(res.data));
    }

    return (
      <Box width={300}>
        <UserInfoComponent user={userData}/>
        <UserUpdateComponent userInfoFunction={handleUserInfo}/>
      </Box>
    );
  }
  
  export default UserViewContainer;