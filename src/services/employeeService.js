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
async getEmployees() {
    let response = await Axios.get(`${constants.apiEndPoint}employee`)
    return response
}
}