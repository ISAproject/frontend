import axios from "axios";

export const CreateReservedDate=(reservedDate)=>{
    return axios.post("http://localhost:8090/api/v1/reservedDate", reservedDate);
}

export const CreateReservedDateWithMail=(reservedDate,email)=>{
    return axios.post("http://localhost:8090/api/v1/reservedDate/reserve/"+email, reservedDate);
}