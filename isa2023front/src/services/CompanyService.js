import axios from "axios";

export const GetCompanyById=(id)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/company/"+id, options);
}

export const GetAllCompanies=()=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/company", options);
}

export const UpdateCompany=(id, company)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.put("http://localhost:8090/api/v1/company/"+id, company, options);
}
export const GetSearchedCompanies=(content,rating)=>{
    if(content==='')return axios.get("http://localhost:8090/api/v1/company/searchRating/"+rating);
    return axios.get("http://localhost:8090/api/v1/company/search/"+content+"/"+rating);
}
export const CreateCompany=(company)=>{
    return axios.post("http://localhost:8090/api/v1/company", company);
}