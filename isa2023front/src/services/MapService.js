import axios from "axios";
export const SendCoordinates=(coordinates)=>{
    return axios.post("http://localhost:8090/api/v1/map/", coordinates);
}