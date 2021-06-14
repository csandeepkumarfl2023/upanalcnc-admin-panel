import { constants } from '../constants';

let machineData = [
    { 
        id: 0, machineId: 'UPLMCH001', customerCode: 'UPNLCUSTT01', machineType: 'ABC',make:'908000000',
        model:'2020', machineSerialNo: 'UPNL163573839',machineAge:'8',controller:'FANUC',controllerModel:'201ABC',generateQRCode:'yes'
    }
]

export default class MachineService{

 async createMachine(data) {
    machineData.push(data)
    let response = machineData
    return response
};

 async getAllMachines() {
    let response = machineData
    return response
}

 async updateMachine(data, id) {
    let filteredArr = machineData.filter(function (obj) {
        return obj.id !== id;
      });
    machineData = [
        ...filteredArr, data
    ]
    return machineData
}

 async deleteMachine(id) {
    machineData = machineData.filter(item => item.id !== id);
    return machineData
}
}

