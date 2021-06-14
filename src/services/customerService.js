import { constants } from '../constants';

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

