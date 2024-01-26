import axios from "axios";
const headers = {
    'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
};
const options = {
    headers: headers,
};
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
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/reservedDate/trackingOrder/" + id, options);
}

export const GetReservedDatesByCompanyId = (companyId) =>{ 
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/reservedDate/reservedDatesByCompanyId/" + companyId, options)
}

export const GetReservedDatesByUserId = (userId) => {
    return axios.get("http://localhost:8090/api/v1/reservedDate/reservedDates/"+userId);
}
export const GetByComapany=(companyId)=>{

    return axios.get("http://localhost:8090/api/v1/reservedDate/alldates/"+companyId,options);
}
export const GetByComapanyByWeek=(companyId)=>{

    return axios.get("http://localhost:8090/api/v1/reservedDate/weekly/"+companyId,options);
}
export const GetByComapanyByMonth=(companyId,month,year)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/monthly/"+companyId+"/"+month+"/"+year,options);
}
export const GetByComapanyByYear=(companyId,year)=>{
    return axios.get("http://localhost:8090/api/v1/reservedDate/yearly/"+companyId+"/"+year,options);
}