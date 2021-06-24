import { constants } from '../constants';
import Axios from '../helper/axios.helper';

let machineData = [
    { 
        id: 0, machineId: 'UPLMCH001', customerCode: 'UPNLCUSTT01', machineType: 'Electrical',make:'908000000',
        model:'2020', machineSerialNo: 'UPNL163573839',machineAge:'8',controller:'FANUC',controllerModel:'201ABC',generateQRCode:'yes'
    },
    { 
        id: 1, machineId: 'UPLMCH002', customerCode: 'UPNLCUSTT02', machineType: 'Mechanical',make:'908000000',
        model:'2020', machineSerialNo: 'UPNL16357000',machineAge:'2',controller:'LIGHTUC',controllerModel:'201123',generateQRCode:'no'
    }
]

export default class MachineService{

 async createMachine(data) {
     try{
    let response = await Axios.post(`${constants.apiEndPoint}machine`, data)
    return response
     } catch (err) {
         console.log(err)
     }
};

 async getAllMachines() {
    let response = await Axios.get(`${constants.apiEndPoint}machine`)
    return response
}

async getMachine(id) {
    let response = await Axios.get(`${constants.apiEndPoint}machine/${id}`)
    return response
}

 async updateMachine(data) {
    let response = await Axios.put(`${constants.apiEndPoint}machine`, data)
    return response
}

 async deleteMachine(id) {
    machineData = machineData.filter(item => item.id !== id);
    return machineData
}

async generateQRCode(id){
    let response = await Axios.get(`${constants.apiEndPoint}machine/generate/qr/encodeString/${id}`)
    return response
}

}

