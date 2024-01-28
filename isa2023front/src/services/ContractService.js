import axios from "axios";
export const AddContract=(contract)=>{
    return axios.post("http://localhost:8090/api/v1/contract", contract);
}

export const GetContracts=()=>{
    return axios.get("http://localhost:8090/api/v1/contract");
}

export const GetContractByUserId=(userId)=>{
    return axios.get("http://localhost:8090/api/v1/contract/"+userId);
}

export const DeleteContractById=(id)=>{
    return axios.delete("http://localhost:8090/api/v1/contract/"+id);
}