import http from "../utils/http-client";

const login = (data) => {
    return http.post('/auth/login', data, {
        transformResponse: [(result) => {
            const parsed = JSON.parse(result);
            localStorage.setItem('authUser', JSON.stringify(parsed));
            return parsed;
        }]
    });
}

const register = (data) => {
    return http.post('/auth/register', data);
}

const profile = () => {
    return http.get('/v1/user/username/' + localStorage.getItem('authUser').username);
}

const logout = () => {
    localStorage.removeItem('authUser');
}

const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
}  

const methods = { 
    login,
    register,
    profile,
    logout,
    getAuthUser
}

export default methods;