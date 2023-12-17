import axios from "axios";

export const GetUserById=(userId)=>{
    return axios.get("http://localhost:8090/api/v1/user/"+userId);
}

export const UpdateUser=(userId,user)=>{
    return axios.put("http://localhost:8090/api/v1/user/"+userId,user);
}
export const UpdateUserPassword=(userId,user)=>{
    return axios.put("http://localhost:8090/api/v1/user/updatepassword/"+userId,user);
}
export const GetUserByEmail=(email)=>{
    return axios.get("http://localhost:8090/api/v1/user/email/"+email);
}

export const AddUser=(user)=>{
    return axios.post("http://localhost:8090/api/v1/user/add", user);
}

export const GetCompanyAdministratorsByCompanyId=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/user/companyAdministratorsByCompanyId/" + companyId);
}
export const GetLastUser=()=>{
    return axios.get("http://localhost:8090/api/v1/user/getlastuser");
}

export const GetUserByUsername=(username)=>{
    return axios.get("http://localhost:8090/api/v1/user/username/"+username);
}

export const UpdateCompanyAdmin = (id, user) =>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.put("http://localhost:8090/api/v1/user/updateCompanyAdmin/" + id, user, options);
}
export const IsPasswordChange=(username)=>{
    return axios.put("http://localhost:8090/api/v1/user/ispasschanged/"+username);
}