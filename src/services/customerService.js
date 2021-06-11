import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postCustomer = async (data) => {
    let response = await axios.post(`${apiServices}/Customer`, data)
    return response
}

const getCustomer = async () => {
    let response = await axios.get(`${apiServices}/Customer`)
    return response
}

const putCustomer = async (data) => {
    let response = await axios.put(`${apiServices}/Customer`, data)
    return response
}

const deleteCustomer = async (data) => {
    let response = await axios.delete(`${apiServices}/Customer`)
    return response
}
export { postCustomer, getCustomer,putCustomer,deleteCustomer }
