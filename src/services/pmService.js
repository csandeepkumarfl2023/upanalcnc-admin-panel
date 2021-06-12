import axios from 'axios';
import { constants } from '../constants';

let pmData = [
    {id: 0,  name: 'Pm', type: 'Pm Type',description:'Pm Desc'}
]

export default class PmService{

 async postPm(data) {
    // let response = await axios.post(`${apiServices}/Pm`, data)
    pmData.push(data)
    let response = pmData
    return response
};

 async getAllPms() {
    // let response = await axios.get(`${apiServices}/Pm`)
    let response = pmData
    return response
}

 async putPm(data, id) {
    // let response = await axios.put(`${apiServices}/Pm`, data)
    let filteredArr = pmData.filter(function (obj) {
        return obj.id !== id;
      });
    pmData = [
        ...filteredArr, data
    ]
    return pmData
}

 async deletePm(id) {
    // let response = await axios.delete(`${apiServices}/Pm`)
    pmData = pmData.filter(item => item.id !== id);
    return pmData
}
}

