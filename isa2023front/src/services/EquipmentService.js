import axios from "axios";

export const GetEquipmentByCompanyId=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/equipment/forCompany/"+companyId);
}