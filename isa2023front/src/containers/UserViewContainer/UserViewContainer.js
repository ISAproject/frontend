import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserComponent from "../../components/UserComponent/UserComponent"
import { GetUserById } from "../../services/UserService";
import React,{useEffect,useState} from 'react';
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
      <div>
        <UserInfoComponent user={userData}/>
        <UserComponent userInfoFunction={handleUserInfo}/>
      </div>
    );
  }
  
  export default UserViewContainer;