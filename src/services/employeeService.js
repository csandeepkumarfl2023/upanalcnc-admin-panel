import { constants } from '../constants';
import Axios from '../helper/axios.helper';
export default class EmployeeService{


 async getEmployeeTasks  ()  {
    let response = await Axios.get(`${constants.apiEndPoint}serviceRequestTask/tasksGroupedByStatus`)
    return response
}
async postWorksteps(data) {
    let response = await Axios.post(`${constants.apiEndPoint}serviceRequestTask/workstep`, data)
     return response
}
async createEmployee(data) {
    try{
   let response = await Axios.post(`${constants.apiEndPoint}employee`, data)
   return response
    } catch (err) {
        console.log(err)
    }
};
async getEmployees() {
    let response = await Axios.get(`${constants.apiEndPoint}employee`)
    return response
}
async getEmployee(id) {
    let response = await Axios.get(`${constants.apiEndPoint}employee/${id}`)
    return response
}

 async updateEmployee(data) {
    let response = await Axios.put(`${constants.apiEndPoint}employee`, data)
    return response
}

async updateEmployeeActive(id, status) {
    let response = await Axios.delete(`${constants.apiEndPoint}employee/${id}/${status}`)
    return response
}
}