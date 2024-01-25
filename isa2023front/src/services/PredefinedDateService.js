import axios from "axios";

export const GetAllPredefinedDates=()=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/predefinedDate", options);
}

export const CreatePredefinedDate=(predefinedDate, companyId)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.post("http://localhost:8090/api/v1/predefinedDate/" + companyId, predefinedDate, options);
}

export const DeletePredefinedDate=(id, companyId)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.delete("http://localhost:8090/api/v1/predefinedDate/" + id + "/" + companyId, options);
}

export const GetAllPredefinedDatesNoAuthorization=()=>{
    return axios.get("http://localhost:8090/api/v1/predefinedDate");
}
