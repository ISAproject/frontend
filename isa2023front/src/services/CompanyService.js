import axios from "axios";

export const GetCompanyById=(id)=>{
    return axios.get("http://localhost:8090/api/v1/company/"+id);
}

export const GetAllCompanies=()=>{
    return axios.get("http://localhost:8090/api/v1/company");
}

export const GetSearchedCompanies=(content,rating)=>{
    if(content==='')return axios.get("http://localhost:8090/api/v1/company/searchRating/"+rating);
    return axios.get("http://localhost:8090/api/v1/company/search/"+content+"/"+rating);
}