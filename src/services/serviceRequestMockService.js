import { constants } from '../constants';

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
    serviceReqData.push(data)
    let response = serviceReqData
    return response
};

 async getAllServiceRequests() {
    let response = serviceReqData
    return response
}

async getServiceRequest(id) {
    let response = serviceReqData.find(item => item.id == id)
    return response
}

 async updateServiceRequest(data, id) {
    let filteredArr = serviceReqData.filter(function (obj) {
        return obj.id !== id;
      });
    serviceReqData = [
        ...filteredArr, data
    ]
    return serviceReqData
}

 async deleteServiceRequest(id) {
    serviceReqData = serviceReqData.filter(item => item.id !== id);
    return serviceReqData
}
}

