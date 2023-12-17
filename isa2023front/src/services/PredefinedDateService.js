import axios from "axios";

export const GetAllPredefinedDates=()=>{
    return axios.get("http://localhost:8090/api/v1/predefinedDate");
}

export const CreatePredefinedDate=(predefinedDate, companyId)=>{
    return axios.post("http://localhost:8090/api/v1/predefinedDate/" + companyId, predefinedDate);
}

export const DeletePredefinedDate=(id, companyId)=>{
    return axios.delete("http://localhost:8090/api/v1/predefinedDate/" + id + "/" + companyId);
}
