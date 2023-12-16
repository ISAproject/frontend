import axios from "axios";

export const CreateReservedDate=(reservedDate)=>{
    return axios.post("http://localhost:8090/api/v1/reservedDate", reservedDate);
}
export const GetByComapany=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/alldates/"+companyId);
}