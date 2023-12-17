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
    if(rating<=0) return axios.get("http://localhost:8090/api/v1/equipment/searchbyname/"+name);
    return axios.get("http://localhost:8090/api/v1/equipment/"+name+"/"+rating);
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

export const CreateEquipment = (equipment) => {
    return axios.post("http://localhost:8090/api/v1/equipment", equipment);
}

export const UpdateEquipment = (id, equipment) => {
    return axios.put("http://localhost:8090/api/v1/equipment/" + id, equipment);
}

export const DeleteEquipment = (id) => {
    return axios.delete("http://localhost:8090/api/v1/equipment/" + id);
}

export const LowerQuantityOfEquipment = (id) => {
    return axios.put("http://localhost:8090/api/v1/equipment/lowerQuantity/" + id);
}