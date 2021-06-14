import { constants } from '../constants';

let customerData = [
    { 
      id: 0, customerName: 'Cloudhub', customerCode: 'UPNLCUS7672', contactPerson: 'ABC', mobileNo: '908000000',
      email: 'jrogers@cloudhub.com', address: '#26,Peenya Industrial area', gstNumber: 'jrogers@cloudhub.com'
    }
]

export default class CustomerService{

 async createCustomer(data) {
    customerData.push(data)
    let response = customerData
    return response
};

 async getAllCustomers() {
    let response = customerData
    return response
}

 async updateCustomer(data, id) {
    let filteredArr = customerData.filter(function (obj) {
        return obj.id !== id;
      });
    customerData = [
        ...filteredArr, data
    ]
    return customerData
}

 async deleteCustomer(id) {
    customerData = customerData.filter(item => item.id !== id);
    return customerData
}
}

