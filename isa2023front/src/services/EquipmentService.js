import axios from "axios";

export const GetEquipments = () => {
    return axios.get("http://localhost:8090/api/v1/equipment");
}

export const findEquipmentByGrade = (rating) => {
    return axios.get("http://localhost:8090/api/v1/equipment/filtergrade/" + rating);
}

export const findEquipmentByType = (type) => {
    return axios.get("http://localhost:8090/api/v1/equipment/filtertype/" + type);
}

export const findEquipmentByName = (name, rating) => {
    if (name === '') return axios.get("http://localhost:8090/api/v1/equipment/filtergrade/" + rating);
    if (rating <= 0) return axios.get("http://localhost:8090/api/v1/equipment/searchbyname/" + name);
    return axios.get("http://localhost:8090/api/v1/equipment/" + name + "/" + rating);
}
export const findEquipmentByComapany = (companyId) => {
    return axios.get("http://localhost:8090/api/v1/equipment/searchbycompany/" + companyId);
}
export const findEquipmentById = (id) => {
    const headers = {
        'Authorization': 'Bearer ' + (localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/equipment/" + id, options);
}
export const GetEquipmentByCompanyId = (companyId) => {
    const headers = {
        'Authorization': 'Bearer ' + (localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.get("http://localhost:8090/api/v1/equipment/forCompany/" + companyId, options);
}

export const CreateEquipment = (equipment) => {
    const headers = {
        'Authorization': 'Bearer ' + (localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.post("http://localhost:8090/api/v1/equipment", equipment, options);
}

export const UpdateEquipment = (id, equipment) => {
    const headers = {
        'Authorization': 'Bearer ' + (localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.put("http://localhost:8090/api/v1/equipment/" + id, equipment, options);
}

export const DeleteEquipment = (id) => {
    const headers = {
        'Authorization': 'Bearer ' + (localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')).accessToken : null)
    };
    const options = {
        headers: headers,
    };

    return axios.delete("http://localhost:8090/api/v1/equipment/" + id, options);
}

export const LowerQuantityOfEquipment = (id) => {
    return axios.put("http://localhost:8090/api/v1/equipment/lowerQuantity/" + id);

}