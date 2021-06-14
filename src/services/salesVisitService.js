import { constants } from '../constants';

let salesVisitData = [
    {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'Completed',createdDate:'2021-04-10',email:'adam@company.com'},
]

export default class SalesVisitService{

 async postSalesVisit(data) {
    // let response = await axios.post(`${apiServices}/SalesVisit`, data)
    salesVisitData.push(data)
    let response = salesVisitData
    return response
};

 async getAllSalesVisits() {
    // let response = await axios.get(`${apiServices}/SalesVisit`)
    let response = salesVisitData
    return response
}

 async putSalesVisit(data, id) {
    // let response = await axios.put(`${apiServices}/SalesVisit`, data)
    let filteredArr = salesVisitData.filter(function (obj) {
        return obj.id !== id;
      });
    salesVisitData = [
        ...filteredArr, data
    ]
    return salesVisitData
}

 async deleteSalesVisit(id) {
    // let response = await axios.delete(`${apiServices}/SalesVisit`)
    salesVisitData = salesVisitData.filter(item => item.id !== id);
    return salesVisitData
}
}

