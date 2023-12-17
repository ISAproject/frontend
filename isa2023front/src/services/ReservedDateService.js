import axios from "axios";

export const CreateReservedDate=(reservedDate)=>{
    return axios.post("http://localhost:8090/api/v1/reservedDate", reservedDate);
}
export const GetByComapany=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/alldates/"+companyId);
}
export const GetByComapanyByWeek=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/weekly/"+companyId);
}
export const GetByComapanyByMonth=(companyId,month,year)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/monthly/"+companyId+"/"+month+"/"+year);
}
export const GetByComapanyByYear=(companyId,year)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/yearly/"+companyId+"/"+year);
}