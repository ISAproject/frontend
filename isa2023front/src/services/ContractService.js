import axios from "axios";
export const AddContract=(contract)=>{
    return axios.post("http://localhost:8090/api/v1/contract", contract);
}

export const GetContracts=()=>{
    return axios.get("http://localhost:8090/api/v1/contract");
}

export const GetContractByUserId=(userId)=>{
    return axios.get("http://localhost:8090/api/v1/contract/getByUserId/"+userId);
}

export const GetContractByCompanyId=(companyId)=>{
    return axios.get("http://localhost:8090/api/v1/contract/getByCompanyId/"+companyId);
}


export const DeleteContractById=(id)=>{
    return axios.delete("http://localhost:8090/api/v1/contract/"+id);
}

export const SendMessage = (message) => {
    return axios.post("http://localhost:8090/api/v1/contract/message", message);
}

export const GetResponse = () => {
    return axios.get("http://localhost:8090/api/v1/contract/response");
}