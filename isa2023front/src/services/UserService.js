import axios from "axios";

export const GetUserById=(userId)=>{
    return axios.get("http://localhost:8090/api/v1/user/"+userId);
}

export const UpdateUser=(userId,user)=>{
    return axios.put("http://localhost:8090/api/v1/user/"+userId,user);
}