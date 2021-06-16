import { constants } from '../constants';

export default class AdminService{

 async postLogin(data) {
    let response = await axios.post(`${apiServices}/v1/api/login`, data)
     return response
}
 async getCharts  ()  {
    let response = await axios.get(`${apiServices}/v1/api/serviceRequest`)
    return response
}
 async getServicerequestDetails (serviceRequestId) {
    let response = await axios.get(`${apiServices}/v1/api/serviceRequest/${serviceRequestId}`)
    return response
}
 async putAssignServiceRequest (serviceRequestId, data) {
    let response = await axios.put(`${apiServices}/v1/api/serviceRequest/${serviceRequestId}`,data)
    return response
}
 async putServiceRequestStatus (serviceRequestId, data) {
    let response = await axios.put(`${apiServices}/v1/api/serviceRequest/${serviceRequestId}`,data)
    return response
}
}


