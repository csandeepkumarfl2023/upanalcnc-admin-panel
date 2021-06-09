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
    const [machineId,setMachineId] = useState("")
    const [make,setMake] = useState("")
    const [model,setModel] = useState("")
    const [machineSerialNo,setMachineSerialNo] = useState("")
    const [machineAge,setMachineAge] = useState("")
    const [controller,setController] = useState("")
    const [generateQRCode,setGenerateQRCode] = useState("")

    const [controllerModel,setControllerModel] = useState("")
    const [alert,setAlert] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editAlert,setEditAlert] = useState(false)

    const [deleteAlert,setDeleteAlert] = useState(false)
    const [updateId, setUpdateId] = useState()
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
        setAlert(true)
    }
    const editBtnHandler = () => {   
      let updatedData = {}
        updatedData.id = updateId
        updatedData.machineId =machineId
        updatedData.customerCode = customerCode
        updatedData.machineType = machineType
        updatedData.make=make
        updatedData.model=model
        updatedData.generateQRCode=generateQRCode
        updatedData.machineSerialNo=machineSerialNo
        updatedData.machineAge=machineAge
        updatedData.controller=controller
        updatedData.controllerModel=controllerModel
        console.log('updatedData', updatedData)
        let filteredArr = data.filter(function( obj ) {
          return obj.id !== updateId;
        });
        console.log(filteredArr)
        setData([...filteredArr, updatedData])
  
        setEditModal(false)
        setEditAlert(true)
       
   }
    const conditionalRowStyles = [
      {
        when: row => row.calories < 300,
        style: {
          backgroundColor: 'green',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      }
    ];
    const deleteHandler = () => {
      let element = [...data]
      let updatedData = {}
      updatedData.id = updateId
      console.log(updatedData.id);
      element = element.filter(item => item.id !==updatedData.id);
      setData(element)
      setEditModal(false)
  
      setDeleteAlert(true)
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
              <CButton  color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'machineId':
                  (item)=>(
                    <td>
                   <a  onClick={()=>{
                     setUpdateId(item.id)
                     setCustomerCode(item.customerCode)
                     setMachineType(item.machineType)
                     setMake(item.make)
                     setModel(item.model)
                     setGenerateQRCode(item.generateQRCode)
                     setMachineId(item.machineId)
                     setMachineAge(item.machineAge)
                     setMachineSerialNo(item.machineSerialNo)
                     setController(item.controller)
                     setControllerModel(item.controllerModel)
                      setEditModal(!editModal)}
                   }
                      >{item.machineId}</a>
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
            <CModal show={alert} variant="success" onClose={() => setAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setAlert(false)}>Successfully Added!</CModalHeader>
          </CModal>
          <CModal show={editAlert} variant="success" onClose={() => setEditAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setEditAlert(false)}>Updated Successfully</CModalHeader>
          </CModal>

          <CModal show={deleteAlert} variant="success" onClose={() => setDeleteAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setDeleteAlert(false)}>Deleted Successfully</CModalHeader>
          </CModal>
            </CCardBody>
         
        </CCol>
        <CModal 
              show={editModal} 
              onClose={() => setEditModal(!editModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Machines</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="customerCode">Customer Code</CLabel>
                <CInput type="text" id="customerCode" name="customerCode" placeholder="Customer Code" value={customerCode?customerCode:''} onChange={(e) => setCustomerCode(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="machineType">Machine Type</CLabel>
                <CInput type="text" id="machineType" name="machineType" placeholder="Machine Type" value={machineType?machineType:''} onChange={(e) => setMachineType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
           
            <CRow>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="make">Make</CLabel>
                <CInput type="text" id="make" name="make" placeholder="Make" value={make?make:''} onChange={(e) => setMake(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="model">Model</CLabel>
                <CInput type="text" id="model" name="model" placeholder="Model" value={model?model:''} onChange={(e) => setModel(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="machineSerialNo">Machine Serial No</CLabel>
                <CInput type="text" id="machineSerialNo" name="machineSerialNo" placeholder="Machine Serial No" value={machineSerialNo?machineSerialNo:''} onChange={(e) => setMachineSerialNo(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
          
            <CRow>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="machineAge">Machine Age</CLabel>
                <CInput type="text" id="machineAge" name="machineAge" placeholder="Machine Age" value={machineAge?machineAge:''} onChange={(e) => setMachineAge(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="controller">Machine Controller</CLabel>
                <CInput type="text" id="controller" name="controller" placeholder="controller" value={controller?controller:''} onChange={(e) => setController(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="controllerModel">Controller Model</CLabel>
                <CInput type="text" id="controllerModel" name="controllerModel" placeholder="Controller Model" value={controllerModel?controllerModel:''} onChange={(e) => setControllerModel(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow> 
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={ deleteHandler}>Delete</CButton>
                <CButton color="info" onClick={editBtnHandler}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
        </CRow>
        </div>
    )
}
