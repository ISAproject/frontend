import axios from "axios";

export const GetUserById=(userId)=>{
    return axios.get("http://localhost:8090/api/v1/user/"+userId);
}

export const Update=(userId,user)=>{
    return axios.put("http://localhost:8090/api/v1/user/"+userId,user);
}

export const GetUserByEmail=(email)=>{
    return axios.get("http://localhost:8090/api/v1/user/email/"+email);
}

export const AddUser=(user)=>{
    return axios.post("http://localhost:8090/api/v1/user/add", user);
}

export const verifyUser=(userId,user)=>{
    return axios.post("http://localhost:8090/api/v1/user/verify/"+userId, user);
}