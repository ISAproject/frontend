import axios from "axios";
export const GetPredefinedDates=(dates)=>{
    return axios.post("http://localhost:8090/api/v1/predefinedDate",dates);
}