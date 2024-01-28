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
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/reservedDate/trackingOrder/" + id, options);
}
export const GetReservedDatesByUserId = (userId,flag) => {
    if(flag)
        return axios.get("http://localhost:8090/api/v1/reservedDate/reservedDates/"+userId+"/true");
        return axios.get("http://localhost:8090/api/v1/reservedDate/reservedDates/"+userId+"/false");
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



export const GetByComapany=(companyId)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/reservedDate/alldates/"+companyId,options);
}
export const GetByComapanyByWeek=(companyId)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };
    
    return axios.get("http://localhost:8090/api/v1/reservedDate/weekly/"+companyId,options);
}
export const GetByComapanyByMonth=(companyId,month,year)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/reservedDate/monthly/"+companyId+"/"+month+"/"+year,options);
}
export const GetByComapanyByYear=(companyId,year)=>{
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/reservedDate/yearly/"+companyId+"/"+year,options);
}

export const DeleteReservedDate=(reservedId)=>{
    return axios.delete("http://localhost:8090/api/v1/reservedDate/deleteReservation/"+reservedId);
}

export const DeleteById = (id) => {
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.delete("http://localhost:8090/api/v1/reservedDate/" + id, options);
}

export const UpdatePickedUpStatus = (id, status) => {
    const headers = {
        'Authorization': 'Bearer '+(localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    
    const options = {
        headers: headers,
    };

    return axios.put("http://localhost:8090/api/v1/reservedDate/updatePickedUpStatus/" + id + "/" + status, null, options);
}