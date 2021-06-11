import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postSalesVisits = async (data) => {
    let response = await axios.post(`${apiServices}/SalesVisits`, data)
    return response
}

const getSalesVisits = async () => {
    let response = await axios.get(`${apiServices}/SalesVisits`)
    return response
}

const putSalesVisits = async (data) => {
    let response = await axios.put(`${apiServices}/SalesVisits`, data)
    return response
}

const deleteSalesVisits = async (data) => {
    let response = await axios.delete(`${apiServices}/SalesVisits`)
    return response
}
export { postSalesVisits, getSalesVisits,putSalesVisits,deleteSalesVisits }
