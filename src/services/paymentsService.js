import { constants } from '../constants';

let paymentsData = [
    {id: 0,  name: 'Payments', type: 'Payments Type',description:'Payments Desc'}
]

export default class PaymentsService{

 async postPayments(data) {
    // let response = await axios.post(`${apiServices}/Payments`, data)
    paymentsData.push(data)
    let response = paymentsData
    return response
};

 async getAllPayments() {
    // let response = await axios.get(`${apiServices}/Payments`)
    let response = paymentsData
    return response
}

 async putPayments(data, id) {
    // let response = await axios.put(`${apiServices}/Payments`, data)
    let filteredArr = paymentsData.filter(function (obj) {
        return obj.id !== id;
      });
    paymentsData = [
        ...filteredArr, data
    ]
    return paymentsData
}

 async deletePayments(id) {
    // let response = await axios.delete(`${apiServices}/Payments`)
    paymentsData = paymentsData.filter(item => item.id !== id);
    return paymentsData
}
}

