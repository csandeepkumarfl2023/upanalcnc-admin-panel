import React, { useState } from 'react'

import {
    CBadge,
    CCard,
    CCardBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'

const fields = ['machineId','customerCode', 'machineType','make','model', 'machineSerialNo','machineAge','controller','controllerModel','generateQRCode']

const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'on-site': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

export default function Machines() {
    const [info, setInfo] = useState(false)
    const [customerCode,setCustomerCode] = useState("")
    const [machineType,setMachineType] = useState("")
    const [make,setMake] = useState("")
    const [model,setModel] = useState("")
    const [machineSerialNo,setMachineSerialNo] = useState("")
    const [machineAge,setMachineAge] = useState("")
    const [controller,setController] = useState("")
    const [controllerModel,setControllerModel] = useState("")

    const [data,setData] = useState([
        {id: 0, machineId: 'UPLMCH001', customerCode: 'UPNLCUSTT01', machineType: 'ABC',make:'908000000',
        model:'2020', machineSerialNo: 'UPNL163573839',machineAge:'8',controller:'FANUC',controllerModel:'201ABC',generateQRCode:'yes'},
        {id: 1, machineId: 'UPLMCH002', customerCode: 'UPNLCUSTT02', machineType: 'XYZ',make:'907600000',
        model:'2021', machineSerialNo: 'UPNL163573839',machineAge:'10',controller:'FANUC',controllerModel:'2021CDF',generateQRCode:'yes'},
        {id: 2, machineId: 'UPLMCH003', customerCode: 'UPNLCUSTT02', machineType: 'XYZ',make:'907600000',
        model:'2012', machineSerialNo: 'UPNL163573839',machineAge:'15',controller:'FANUC',controllerModel:'2021CDF',generateQRCode:'yes'},
    ])

    
    const submitHandler = () => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.customerCode = customerCode
        currentData.machineType = machineType
        currentData.make=make
        currentData.model=model
        currentData.machineSerialNo=machineSerialNo
        currentData.machineAge=machineAge
        currentData.controller=controller
        currentData.controllerModel=controllerModel
        let allData = [...data]
        allData.push(currentData)
        setData(allData)
        console.log('alldata',allData);
        setInfo(!info)
    }

    return (
        <div>
             <CRow>
        <CCol xs="12" lg="12">
         
            {/* <CCardHeader>
             All
              <DocsLink name="CModal"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
              <CCol xs="11">
             Machines
              </CCol>
              <CCol xs="1">
              <CButton block variant="ghost" color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              itemsPerPage={2}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
             <CModal 
              show={info} 
              onClose={() => setInfo(!info)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New Machine</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="customerCode">Customer Code</CLabel>
                <CInput type="text" id="customerCode" name="customerCode" placeholder="Customer Code" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="machineType">Machine Type</CLabel>
                <CInput type="text" id="machineType" name="machineType" placeholder="Machine Type" value={machineType} onChange={(e) => setMachineType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
           
            <CRow>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="make">Make</CLabel>
                <CInput type="text" id="make" name="make" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="model">Model</CLabel>
                <CInput type="text" id="model" name="model" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="machineSerialNo">Machine Serial No</CLabel>
                <CInput type="text" id="machineSerialNo" name="machineSerialNo" placeholder="Machine Serial No" value={machineSerialNo} onChange={(e) => setMachineSerialNo(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
          
            <CRow>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="machineAge">Machine Age</CLabel>
                <CInput type="text" id="machineAge" name="machineAge" placeholder="Machine Age" value={machineAge} onChange={(e) => setMachineAge(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="controller">Machine Controller</CLabel>
                <CInput type="text" id="controller" name="controller" placeholder="controller" value={controller} onChange={(e) => setController(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="controllerModel">Controller Model</CLabel>
                <CInput type="text" id="controllerModel" name="controllerModel" placeholder="Controller Model" value={controllerModel} onChange={(e) => setControllerModel(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow> 
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
                <CButton color="info" onClick={submitHandler}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>
            </CCardBody>
         
        </CCol>
        </CRow>
        </div>
    )
}
