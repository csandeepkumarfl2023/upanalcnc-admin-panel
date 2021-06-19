import Axios from "axios";
// import CommonService from '../services/commonService'

// const commonService = new CommonService()

Axios.interceptors.request.use(async (config) => {
    // let token = await commonService.getToken('userToken')
    // if(token){
        config.headers['X-Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiUk9MRVMiOlsiQURNSU4iXSwiaXNzIjoiaHR0cDovL3VwYW5hbC5jb20iLCJpYXQiOjE2MjQwOTA0NjcsImV4cCI6MTYyNDY5MDQ2N30.fXjQ4foiI2Q6XWKo0JCgOkwyIt0VLXDswutojSM2sh2agAdDTOrUjr2oG2hMfDR-GasFCo36UqPW80bUSMoSoA`;
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Axios