import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
function UserViewContainer() {  
    let user={
        username:"",
        first_name:"",
        last_name:"",
        state:"",
        city:"",
        tel_number:"",
        occupation:"",
        company_info:"",
        role:"",
        verified:""
    }
    const [userData,setUserData]=useState(user);
    const userId = useParams().id;

    useEffect(()=>{
      GetUserById(userId).then((res)=>setUserData(res.data));
    },[userId]);

    const handleUserInfo=()=>{
      console.log("works")
      GetUserById(userId).then((res)=>setUserData(res.data));
    }

    return (
      <Box width={300}>
        <UserInfoComponent user={userData}/>
        <UserUpdateComponent userInfoFunction={handleUserInfo} userId={userId} />
      </Box>
    );
  }
  
  export default UserViewContainer;