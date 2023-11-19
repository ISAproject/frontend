import axios from "axios";

export const GetEquipments=()=>{
    return axios.get("http://localhost:8090/api/v1/equipment");
}

export const findEquipmentByGrade=(rating)=>{
    return axios.get("http://localhost:8090/api/v1/equipment/filtergrade/"+rating);
}

export const findEquipmentByType=(type)=>{
    return axios.get("http://localhost:8090/api/v1/equipment/filtertype/"+type);
}

export const findEquipmentByName=(name,rating)=>{
    if(name==='')return axios.get("http://localhost:8090/api/v1/equipment/filtergrade/"+rating);
    return axios.get("http://localhost:8090/api/v1/equipment/searchbyname/"+name);
}
export const findEquipmentByComapany=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/equipment/searchbycompany/"+companyId);
}
export const findEquipmentById=(id)=>{
    return axios.get("http://localhost:8090/api/v1/equipment/"+id);
}
export const GetEquipmentByCompanyId=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/equipment/forCompany/"+companyId);
}