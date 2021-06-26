import Axios from "axios";
// import CommonService from '../services/commonService'

// const commonService = new CommonService()

Axios.interceptors.request.use(async (config) => {
    // let token = await commonService.getToken('userToken')
    // if(token){
        config.headers['X-Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiUk9MRVMiOlsiQURNSU4iXSwiaXNzIjoiaHR0cDovL3VwYW5hbC5jb20iLCJpYXQiOjE2MjQ2OTc1MTAsImV4cCI6MTYyNTI5NzUxMH0.Txbn-caKsMU8zPsVyrcteaFBobvMVaBYCTQGeWuT3lafCFJCqMk2fGyeR-Ze_tS-alowlbLYbrh-wtXCX5-eiQ`;
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Axios