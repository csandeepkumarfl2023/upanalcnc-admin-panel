import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postServiceRequests = async (data) => {
    let response = await axios.post(`${apiServices}/serviceRequests`, data)
    return response
}

const getServiceRequests = async () => {
    let response = await axios.get(`${apiServices}/serviceRequests`)
    return response
}

const putServiceRequests = async (data) => {
    let response = await axios.put(`${apiServices}/serviceRequests`, data)
    return response
}

const deleteServiceRequests = async (data) => {
    let response = await axios.delete(`${apiServices}/serviceRequests`)
    return response
}
export { postServiceRequests, getServiceRequests,putServiceRequests,deleteServiceRequests }
