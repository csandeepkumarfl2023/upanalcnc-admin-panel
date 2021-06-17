import Axios from "axios";

Axios.interceptors.request.use(async (config) => {
    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiUk9MRVMiOlsiQURNSU4iXSwiaXNzIjoiaHR0cDovL3VwYW5hbC5jb20iLCJpYXQiOjE2MjM5MDUyNzcsImV4cCI6MTYyNDUwNTI3N30.Ri71sNO8e16hG_26G54xw_eR2MLVd8vDcRpgEP8UQQ-0rYc6eKKsH9gkZTs-6PvU7PDIPVboOxTeDZcAqgLpRA'
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Axios