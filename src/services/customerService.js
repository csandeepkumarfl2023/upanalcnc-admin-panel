import { constants } from '../constants';
import Axios from '../helper/axios.helper';
import axios from 'axios'
let customerData = [
    { 
      id: 0, customerName: 'Cloudhub', customerCode: 'UPNLCUS7672', contactPerson: 'ABC', mobileNo: '908000000',
      email: 'jrogers@cloudhub.com', address: '#26,Peenya Industrial area', gstNumber: 'jrogers@cloudhub.com',alternateNo: '123456',
      city: 'hyderabad', zip: '641026', state: 'Hyderabad', country: 'India'
    },
    { 
        id: 1, customerName: 'Sandeep', customerCode: 'UPNLCUS7673', contactPerson: 'ABC', mobileNo: '708000000',
        email: 'sandeep@gmail.com', address: '#26,Peenya Industrial area', gstNumber: 'GSTN123456ABCF', alternateNo: '123456',
        city: 'hyderabad', zip: '641026', state: 'Hyderabad', country: 'India'
    },
    { 
        id: 2, customerName: 'Aravindan', customerCode: 'UPNLCUS7673', contactPerson: 'ABC', mobileNo: '808000000',
        email: 'aravindan@gmail.com', address: '#26,Peenya Industrial area', gstNumber: 'GSTN12358TBGF', alternateNo: '123456',
        city: 'hyderabad', zip: '641026', state: 'Hyderabad', country: 'India'
    }
]

export default class CustomerService{

 async createCustomer(data) {
    let response = await Axios.post(`${constants.apiEndPoint}client`, data)
    return response
};

 async getAllCustomers() {
    let response = await Axios.get(`${constants.apiEndPoint}client`)
    return response
}

async getCustomer(id) {
    let response = await Axios.get(`${constants.apiEndPoint}client/${id}`)
    return response
}

 async updateCustomer(data) {
    let response = await Axios.put(`${constants.apiEndPoint}client`, data)
    return response
}

 async deleteCustomer(id) {
    customerData = customerData.filter(item => item.id !== id);
    return customerData
}
}

