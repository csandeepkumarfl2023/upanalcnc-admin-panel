import { constants } from '../constants';

let employeeManagementsData = [
    {id: 0,  name: 'EmployeeManagements', type: 'EmployeeManagements Type',description:'EmployeeManagements Desc'}
]

export default class EmployeeManagementsService{

 async postEmployeeManagements(data) {
    // let response = await axios.post(`${apiServices}/EmployeeManagements`, data)
    employeeManagementsData.push(data)
    let response = employeeManagementsData
    return response
};

 async getAllEmployeeManagements() {
    // let response = await axios.get(`${apiServices}/EmployeeManagements`)
    let response = employeeManagementsData
    return response
}

 async putEmployeeManagements(data, id) {
    // let response = await axios.put(`${apiServices}/EmployeeManagements`, data)
    let filteredArr = employeeManagementsData.filter(function (obj) {
        return obj.id !== id;
      });
    employeeManagementsData = [
        ...filteredArr, data
    ]
    return employeeManagementsData
}

 async deleteEmployeeManagements(id) {
    // let response = await axios.delete(`${apiServices}/EmployeeManagements`)
    employeeManagementsData = employeeManagementsData.filter(item => item.id !== id);
    return employeeManagementsData
}
}

