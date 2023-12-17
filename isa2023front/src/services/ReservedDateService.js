import axios from "axios";

export const CreateReservedDate=(reservedDate)=>{
    return axios.post("http://localhost:8090/api/v1/reservedDate", reservedDate);
}

export const CreateReservedDateWithMail=(reservedDate,email)=>{
    return axios.post("http://localhost:8090/api/v1/reservedDate/reserve/"+email, reservedDate);
}

export const FindEquipmentByReservationDateId=(id)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/equipment/"+id);
}
export const GetAllReservedDates = () => {
    return axios.get("http://localhost:8090/api/v1/reservedDate");
}

export const GetTrackingsByEquipmentId = (id) => {
    return axios.get("http://localhost:8090/api/v1/reservedDate/trackingOrder/" + id);
}