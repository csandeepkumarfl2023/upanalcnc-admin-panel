import Axios from "axios";
import CommonService from '../services/commonService'

const commonService = new CommonService()

Axios.interceptors.request.use(async (config) => {
    let token = await commonService.getToken('userToken')
    if(token){
        config.headers['X-Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Axios