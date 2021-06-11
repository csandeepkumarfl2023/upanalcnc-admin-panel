import axios from 'axios';
import api from './apiService'

const apiServices = api()

const postMachine = async (data) => {
    let response = await axios.post(`${apiServices}/Machine`, data)
    return response
}

const getMachine = async () => {
    let response = await axios.get(`${apiServices}/Machine`)
    return response
}

const putMachine = async (data) => {
    let response = await axios.put(`${apiServices}/Machine`, data)
    return response
}

const deleteMachine = async (data) => {
    let response = await axios.delete(`${apiServices}/Machine`)
    return response
}
export { postMachine, getMachine,putMachine,deleteMachine }
