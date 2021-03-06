import { constants } from '../constants';
import axios from 'axios'
import Axios from '../helper/axios.helper';
import apiServices from './apiService'

export default class AdminService{

 async postLogin(data) {
    let response = await axios.post(`${constants.apiEndPoint}login`, data)
     return response
}
 async getCharts  ()  {
    let response = await Axios.get(`${apiServices}/v1/api/serviceRequest`)
    return response
}
 async getServicerequestDetails (serviceRequestId) {
    let response = await Axios.get(`${apiServices}/v1/api/serviceRequest/${serviceRequestId}`)
    return response
}
 async putAssignServiceRequest (serviceRequestId, data) {
    let response = await Axios.put(`${apiServices}/v1/api/serviceRequest/${serviceRequestId}`,data)
    return response
}
 async putServiceRequestStatus (serviceRequestId, data) {
    let response = await Axios.put(`${apiServices}/v1/api/serviceRequest/${serviceRequestId}`,data)
    return response
}
}


