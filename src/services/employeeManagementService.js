import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postEmployeeManagement = async (data) => {
    let response = await axios.post(`${apiServices}/EmployeeManagement`, data)
    return response
}

const getEmployeeManagement = async () => {
    let response = await axios.get(`${apiServices}/EmployeeManagement`)
    return response
}

const putEmployeeManagement = async (data) => {
    let response = await axios.put(`${apiServices}/EmployeeManagement`, data)
    return response
}

const deleteEmployeeManagement = async (data) => {
    let response = await axios.delete(`${apiServices}/EmployeeManagement`)
    return response
}
export { postEmployeeManagement, getEmployeeManagement,putEmployeeManagement,deleteEmployeeManagement }
