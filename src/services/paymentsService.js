import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postPayments = async (data) => {
    let response = await axios.post(`${apiServices}/Payments`, data)
    return response
}

const getPayments = async () => {
    let response = await axios.get(`${apiServices}/Payments`)
    return response
}

const putPayments = async (data) => {
    let response = await axios.put(`${apiServices}/Payments`, data)
    return response
}

const deletePayments = async (data) => {
    let response = await axios.delete(`${apiServices}/Payments`)
    return response
}
export { postPayments, getPayments,putPayments,deletePayments }
