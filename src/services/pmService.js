import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postPm = async (data) => {
    let response = await axios.post(`${apiServices}/Pm`, data)
    return response
}

const getPm = async () => {
    let response = await axios.get(`${apiServices}/Pm`)
    return response
}

const putPm = async (data) => {
    let response = await axios.put(`${apiServices}/Pm`, data)
    return response
}

const deletePm = async (data) => {
    let response = await axios.delete(`${apiServices}/Pm`)
    return response
}
export { postPm, getPm,putPm,deletePm }
