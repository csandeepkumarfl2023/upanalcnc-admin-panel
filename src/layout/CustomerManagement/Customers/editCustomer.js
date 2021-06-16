import React, { useState } from 'react'
import {
   CCard,
   CCardHeader,
   CCardBody,
   CCol,
   CSelect,
   CRow,
   CButton,
   CFormGroup,
   CInput,
   CCardSubtitle,
   CCardFooter,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import ServiceRequestService from '../../../services/serviceRequestService'
import CustomerService from '../../../services/customerService'
import MachineService from '../../../services/machineService'
import moment from 'moment'

const serviceRequestService = new ServiceRequestService()
const customerSerice = new CustomerService()
const machineService = new MachineService()

export default function EditCustomer(props) {

   console.log('item', props.location.state);
   const history = useHistory();
   const [item, setItem] = useState(props.location.state)
   const [edit, setEdit] = React.useState(false)
   const [executive, setExecutive] = useState("")
   const [date, setDate] = useState("")
   const [time, setTime] = useState("")
   const [data, setData] = useState([])

   const [customerDetails, setCustomerDetails] = useState()
   const [machineDetails, setMachineDetails] = useState()
   const [serviceReqDetails, setServiceReqDetails] = useState()

   const closeHandler = () => {
      history.push('/customermanagement');
   }
   const cancelHandler = () => {
      setEdit(false)
   }

   const getCustomerDetails = async () => {
      let res = await customerSerice.getCustomer(item.customerName)
      setCustomerDetails(res)
      console.log('getCustomerDetails', res)
   }

   const getMachineDetails = async () => {
      let res = await machineService.getMachine(item.machine)
      setMachineDetails(res)
      console.log('getMachineDetails', res)
   }

   const getServicerequestDetails = async() => {
      let res = await serviceRequestService.getServiceRequest(item.id)
      setServiceReqDetails(res)
      console.log('getServicerequestDetails', res)
   }

   const submitHandler = async() => {
      let currentData = {...item}
      currentData.executive = executive
      currentData.date = date
      currentData.time = time
      let res = await serviceRequestService.updateServiceRequest(currentData, currentData.id)
      history.push('./servicerequest')
   }

   React.useEffect(() => {
      setItem(props.location.state)
      if (props.location.state) {
         getCustomerDetails()
         getMachineDetails()
         getServicerequestDetails()
      }
   }, [])

   return (
      <CCard>
         <CCardHeader>
            <CRow>
               <CCol xs="6" md="11">
                  <CCardSubtitle style={{marginTop:'1%'}}>Customer {item ? item.customerName : null}</CCardSubtitle>
               </CCol>
               <CCol xs="6" md="1">
                  <CIcon name="cil-pen" size="1xl" onClick={() => setEdit(true)} />
               </CCol>
            </CRow>
         </CCardHeader>
         <CCardBody>
            <CRow>
               <CCol xs="12" md="4">
                  Customer Name: {customerDetails ? customerDetails.customerName : null}
               </CCol>
               <CCol xs="12" md="4">
                  Customer Code: {customerDetails ? customerDetails.customerCode : null}
               </CCol>
               <CCol xs="12" lg="4">
                  View Report: N/A
               </CCol>
            </CRow>


            <CRow style={{ marginTop: '2%' }}>
               <CCol xs="10" lg="4">
                  Issue Type: {serviceReqDetails ? serviceReqDetails.issueType : null}
               </CCol>
               <CCol xs="10" lg="4">
                  Priority: {serviceReqDetails ? serviceReqDetails.priority : null}
               </CCol>
               <CCol xs="10" lg="4">
                  Status: {serviceReqDetails ? serviceReqDetails.status : null}
               </CCol>
            </CRow>

            <CRow style={{ marginTop: '2%'}}>
               <CCol xs="10" sm="4">
                  Executive: 
                  {edit ?
                     <CFormGroup >
                        <CSelect custom size="md" name="name" id="name" className="w-50" value={executive} onChange={(e) => setExecutive(e.target.value)}>
                           <option value="undefined">Open this select menu</option>
                           <option value="Vamsi">Vamsi</option>
                           <option value="Sandeep">Sandeep</option>
                           <option value="Pooja">Pooja</option>
                           <option value="Vikram">Vikram</option>
                           <option value="Arun">Arun</option>
                        </CSelect>
                     </CFormGroup>
                     : serviceReqDetails ? serviceReqDetails.executive : null}
               </CCol>
               <CCol xs="10" sm="4">
                  Schedule Date: {edit ?
                     <CFormGroup >
                        <CInput type="date" id="sheduleDate" className="w-50"
    name="sheduleDate" placeholder="sheduleDate" value={date} onChange={(e) => { setDate(e.target.value) }} />
                     </CFormGroup>
                     : serviceReqDetails ? serviceReqDetails.date : null}
               </CCol>
               <CCol xs="10" lg="4">
                  Schedule Time:  {edit ?
                     <CFormGroup >
                        <CInput type="time" id="sheduleTime" className="w-50" name="sheduleTime" placeholder="sheduleTime" value={time} onChange={(e) => { setTime(e.target.value) }} />
                     </CFormGroup>
                     : serviceReqDetails ? serviceReqDetails.time : null}
               </CCol>
            </CRow>

            <CRow style={{ marginTop: '2%' }}>
               <CCol xs="10" lg="6">
                  Issue Details: {serviceReqDetails ? serviceReqDetails.issueDetails : null}
               </CCol>
               <CCol xs="10" lg="6">
                  Machine Pictures:
               </CCol>
            </CRow>
         </CCardBody>

            <CCardHeader>
               <CCardSubtitle> Machine Details</CCardSubtitle>
            </CCardHeader>
         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               Machine ID: {machineDetails ? machineDetails.machineId : null}
            </CCol>
            <CCol xs="10" lg="4">
               Machine Serial Number: {machineDetails ? machineDetails.machineSerialNo : null}
            </CCol>
            <CCol xs="10" lg="4">
               Machine Type: {machineDetails ? machineDetails.machineType : null}
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               Make: {machineDetails ? machineDetails.make : null}
            </CCol>
            <CCol xs="10" lg="4">
               Model: {machineDetails ? machineDetails.model : null}
            </CCol>
            <CCol xs="10" lg="4">
               Machine Age: {machineDetails ? machineDetails.machineAge : null}
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               Machine Controller: {machineDetails ? machineDetails.machineType : null}
            </CCol>
            <CCol xs="10" lg="4">
               Controller Model: {machineDetails ? machineDetails.controllerModel : null}
            </CCol>
         </CRow>

            <CCardHeader>
               <CCardSubtitle style={{marginTop:'2%'}}>Customer Contact Details</CCardSubtitle>
            </CCardHeader>
         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               Contact Person Name: {customerDetails ? customerDetails.contactPerson : null}
            </CCol>
            <CCol xs="10" lg="4">
               Contact Number: {customerDetails ? customerDetails.mobileNo : null}
            </CCol>
            <CCol xs="10" lg="4">
               Alternate Number: {customerDetails ? customerDetails.alternateNo : null}
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="6">
               Customer Address: {customerDetails ? customerDetails.address : null}
            </CCol>
            <CCol xs="10" lg="6">
               Email: {customerDetails ? customerDetails.email : null}
            </CCol>
         </CRow>
         <CRow>
            <CCardFooter style={{ width: '15%', marginLeft: '70%' }}>
               {edit ?
                  <CRow>
                     <CButton block color="info" className="mr-1" onClick={submitHandler}
                     >Submit</CButton>
                     <CButton block color="info" className="mr-1" onClick={cancelHandler}
                     >Cancel</CButton>
                  </CRow>
                  : <CButton block color="info" className="mr-1" onClick={closeHandler}>Close</CButton>}
            </CCardFooter>
         </CRow>
      </CCard>

   )
}

         