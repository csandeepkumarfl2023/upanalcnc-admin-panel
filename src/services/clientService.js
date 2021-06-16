import { constants } from '../constants';

export default class ClientService{

 async postLogin(data) {
    let response = await axios.post(`${apiServices}/v1/api/login`, data)
     return response
}
 async getClientServiceRequests  (clientId)  {
    let response = await axios.get(`${apiServices}/v1/api/client/request/${clientId}`)
    return response
}

}