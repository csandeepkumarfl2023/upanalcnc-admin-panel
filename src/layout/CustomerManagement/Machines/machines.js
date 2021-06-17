import React, { useState } from 'react'

import {
    CSelect,
    CCardBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CAlert,
    CDataTable,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
    CLink,
    CCard
} from '@coreui/react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import MachineService  from '../../../services/machineService';
import { useHistory } from "react-router-dom";

const machineService = new MachineService()

const fields = ['machineId','customerCode', 'machineType','make','model', 'machineSerialNo','machineAge','controller','controllerModel','generateQRCode']
const override = css`
display: block;
margin: 0 auto;
`;

export default function Machines() {
  const history = useHistory();

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

    const [info, setInfo] = useState(false)
    const [customerCode,setCustomerCode] = useState("")
    const [machineType,setMachineType] = useState("")
    const [machineId,setMachineId] = useState("")
    const [make,setMake] = useState("")
    const [model,setModel] = useState("")
    const [machineSerialNo,setMachineSerialNo] = useState("")
    const [machineAge,setMachineAge] = useState("")
    const [controller,setController] = useState("")
    const [others,setOthers] = useState(false)
    const [typeOthers,setTypeOthers] = useState(false)
    const [generateQRCode,setGenerateQRCode] = useState("")

    const [controllerModel,setControllerModel] = useState("")
    const [alert,setAlert] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editAlert,setEditAlert] = useState(false)
    const  [loading,setLoading] = useState(false)

    const [deleteAlert,setDeleteAlert] = useState(false)
    const [updateId, setUpdateId] = useState()
    const [data,setData] = useState([])

    const getData = async () => {
      let res = await machineService.getAllMachines()
      setData(res)
    }

    const addnewBtnHandler = () => {
      setUpdateId('')
      setMachineType('')
      setCustomerCode('')
      setMake('')
      setModel('')
      setMachineSerialNo('')
      setMachineAge('')
      setController('')
      setControllerModel('')
      addMachineHandler()
        }

    const addMachineHandler = () => {
      history.push('./createMachine')
    }
    const submitHandler = async () => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.customerCode = 'UPNLCUSTT03'
        currentData.machineType = machineType
        currentData.make=make
        currentData.model=model
        currentData.machineSerialNo=machineSerialNo
        currentData.machineAge=machineAge
        currentData.controller=controller
        currentData.controllerModel=controllerModel
        let allData = [...data]
        allData.push(currentData)
        let res = await machineService.createMachine(currentData)
        getData()       
        setInfo(!info)  
        setLoading(true)
        setTimeout(function(){ 
            setLoading(false)
            setAlert(true)
         }, 3000);
    }
    const editBtnHandler = async () => {   
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
        let res = await machineService.updateMachine(updatedData, updateId)
        getData()  
        setEditModal(false)
        setLoading(true)
        setTimeout(function(){  
           setLoading(false)
           setEditAlert(true)
         }, 3000);
       
   }

    const deleteHandler = async () => {
      let res = await machineService.deleteMachine(updateId)
      getData()
      setEditModal(false)
      setLoading(true)
      setTimeout(function(){  
         setLoading(false)
         setDeleteAlert(true)
       }, 3000);
  }

  const controllerHandler = (e) => {
    e.target.value == 'Others' ? setOthers(true) :  setOthers(false)
     setController(e.target.value)
  }

  const typeHandler = (e) => {
    e.target.value == 'Others' ? setTypeOthers(true) :  setTypeOthers(false)
     setMachineType(e.target.value)
  }

  React.useEffect(() => {
    getData()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

    return (
        <div>
     {/* <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
    </div>            */}
            <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
           Successfully Added!
          </CAlert>
          <CAlert color="success"show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
           Updated Successfully!
          </CAlert>

          <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
            Deleted Successfully!
          </CAlert>
             <CRow>
        <CCol xs="12" lg="12">
        {/* {!loading ?   */}
            <CCardBody>
            <CRow className="mb-2">
                    <CCol xs="11" style={{display: 'flex', alignItems: 'center'}}>
                      <h5>
                Machines
                </h5>
              </CCol>
              <CCol xs="1" style={{display: 'flex', alignItems: 'center'}}>             
                  <CButton color="info" onClick={addnewBtnHandler} block>New</CButton>
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
                  <CLink> <a  onClick={()=>{
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
                      >{item.machineId}</a></CLink>
                    </td>
                  )
              }}

            />

            </CCardBody>
         {/* : null } */}
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