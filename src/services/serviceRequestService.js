import { constants } from '../constants';
import Axios from '../helper/axios.helper';

let serviceReqData = [
    {id: 0, servicerequestId: 'UPNLBKN202101', status:'Pending',priority:'High', issueType:'Electrical',description:'value proposition', contactNumber: '8765964234', 
    executive:'Assign',reports:'no', company: 'Aravindan', email: 'aravindan@gmail.com',createdDate: 'June 14th 2021, 1:23:09 pm', machine: 0, customerName: 0},
    {id: 2, servicerequestId: 'UPNLBKN202115', status:'new',priority:'High', issueType:'Mechanical',description:'value proposition', contactNumber: '8765964234', 
    executive:'Assign',reports:'no', company: 'Aravindan', email: 'aravindan@gmail.com',createdDate: 'June 14th 2021, 1:23:09 pm', machine: 0, customerName: 0},
    {id: 3, servicerequestId: 'UPNLBKN202116', status:'Overdue',priority:'High', issueType:'Electrical',description:'value proposition', contactNumber: '8765964234', 
    execuive:'Assign',reports:'no', company: 'Aravindan', email: 'aravindan@gmail.com',createdDate: 'June 14th 2021, 1:23:09 pm', machine: 0, customerName: 0}
]

export default class ServiveRequestService{

 async createServiceReq(data) {
    let response = await Axios.post(`${constants.apiEndPoint}serviceRequest`, data)
    return response
};

 async getAllServiceRequests() {
    let response = await Axios.get(`${constants.apiEndPoint}serviceRequest`)
    return response
}

async getServiceRequest(id) {
    let response = await Axios.get(`${constants.apiEndPoint}serviceRequest/${id}`)
    return response
}

 async updateServiceRequest(data, id) {
    let response = await Axios.put(`${constants.apiEndPoint}serviceRequest`, data)
    return response
}

 async deleteServiceRequest(id) {
    serviceReqData = serviceReqData.filter(item => item.id !== id);
    return serviceReqData
}
}

