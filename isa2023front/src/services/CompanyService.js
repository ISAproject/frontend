import axios from "axios";

export const GetCompanyById=(id)=>{
    return axios.get("http://localhost:8090/api/v1/company/"+id);
}

export const GetAllCompanies=()=>{
    return axios.get("http://localhost:8090/api/v1/company");
}

export const UpdateCompany=(id, company)=>{
    return axios.put("http://localhost:8090/api/v1/company/"+id, company);
}