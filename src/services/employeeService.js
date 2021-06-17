import { constants } from '../constants';

export default class EmployeeService{

 async postLogin(data) {
    let response = await axios.post(`${apiServices}/v1/api/login`, data)
     return response
}
 async getEmployeeTasks  ()  {
    let response = await axios.get(`${apiServices}/v1/api/serviceRequestTask/tasksGroupedByStatus`)
    return response
}
async postWorksteps(data) {
    let response = await axios.post(`${apiServices}/v1/api/serviceRequestTask/workstep`, data)
     return response
}
}