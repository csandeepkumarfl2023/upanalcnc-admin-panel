import { constants } from '../constants';

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
    machineData.push(data)
    let response = machineData
    return response
};

 async getAllMachines() {
    let response = machineData
    return response
}

async getMachine(id) {
    let response = machineData.find(elem => elem.id == id)
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

