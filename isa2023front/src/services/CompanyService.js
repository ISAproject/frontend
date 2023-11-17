import axios from "axios";

export const GetCompanyById=(id)=>{
    return axios.get("http://localhost:8090/api/v1/company/"+id);
}