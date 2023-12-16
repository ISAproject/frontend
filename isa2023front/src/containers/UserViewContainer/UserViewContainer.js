import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
import { Box } from "@mui/material";
import { GetUserByUsername } from "../../services/UserService";

function UserViewContainer() {  
  const authUser=localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
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
    const [userId,setUserId] = useState(0);

    useEffect(()=>{
      GetUserByUsername(authUser.username).then((res)=>{
        setUserData(res.data);
        setUserId(res.data.id);
      });
    },[authUser.username]);

    const handleUserInfo=()=>{
      console.log("works")
      GetUserById(userId).then((res)=>setUserData(res.data));
    }

    return (
      <Box width={300}>
        {authUser
          ?
        <>
        <UserInfoComponent user={userData}/>
        <UserUpdateComponent userInfoFunction={handleUserInfo} userId={userId} />
        </>
          :
          <div>
            <h2>Page not found :/</h2>
          </div>
        }
      </Box>
    );
  }
  
  export default UserViewContainer;