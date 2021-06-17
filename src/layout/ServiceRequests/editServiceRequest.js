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
import ServiceRequestService from '../../services/serviceRequestService'
import CustomerService from '../../services/customerService'
import MachineService from '../../services/machineService'
import moment from 'moment'

const serviceRequestService = new ServiceRequestService()
const customerSerice = new CustomerService()
const machineService = new MachineService()

const getBadge = status => {
   switch (status) {
     case 'Completed':
     case 'completed':
       return '#50D2C2'
     case 'Overdue':
     case 'overdue':
       return '#FF3366'
     case 'Pending':
     case 'pending':
       return '#FCAB53'
     case 'Assigned':
     case 'assigned':
       return '#D667CD'
     case 'Accepted':
     case 'accepted':
       return '#8C88FF'
     case 'new':
     case 'New':
       return '#00B9FF'
     case 'open':
     case 'Open':
       return '#00B9FF'
     default: return 'secondary'
   }
 }

export default function EditServiceRequest(props) {

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
      history.push('/overview');
   }
   const cancelHandler = () => {
      setEdit(false)
   }

   const getCustomerDetails = async () => {
      let res = await customerSerice.getCustomer(item.customerName)
      setCustomerDetails(res.data)
      console.log('cus', res)
   }

   const getMachineDetails = async () => {
      let res = await machineService.getMachine(item.machine)
      setMachineDetails(res.data)
      console.log('mac', res)
   }

   const getServicerequestDetails = async() => {
      let res = await serviceRequestService.getServiceRequest(item.id)
      setServiceReqDetails(res)
      console.log('serreq', res)
   }

   const submitHandler = async() => {
      let currentData = {...item}
      currentData.executive = executive
      currentData.date = date
      currentData.time = time
      let res = await serviceRequestService.updateServiceRequest(currentData, currentData.id)
      console.log('updated',  res)
      history.push('/servicerequest')
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
                  <CCardSubtitle style={{marginTop:'1%',fontWeight:'bold',fontSize:'1.1rem'}}>Service Request {item ? item.servicerequestId : null}</CCardSubtitle>
               </CCol>
               <CCol xs="6" md="1">
                  <CIcon name="cil-pen" size="1xl" onClick={() => setEdit(true)} />
               </CCol>
            </CRow>
         </CCardHeader>
         <CCardBody >
         <CRow style={{ marginLeft: '0%'}}>
               <CCol xs="10" md="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Customer Name: </div>
               <CCol xs="10" md="6">
                {customerDetails ? customerDetails.company : null} 
                </CCol>
                </CRow>
               </CCol>
               <CCol xs="10" md="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Customer Code: </div>
               <CCol xs="10" md="6">
                {customerDetails ? customerDetails.customerCode : null}  </CCol>
                 </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}>  View Report: </div>
               <CCol xs="10" md="4">
                  N/A
                  </CCol>
                  </CRow>
               </CCol>
            </CRow>


            <CRow style={{ marginTop: '2%', marginLeft: '0%' }}>
               <CCol xs="10" lg="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Issue Type: </div>
               <CCol xs="10" md="4">
                  {serviceReqDetails ? serviceReqDetails.issueType : null}
                  </CCol> </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Priority: </div>
               <CCol xs="10" md="4">
                 {serviceReqDetails ? serviceReqDetails.priority : null} 
                 </CCol> </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Status: </div>
               <CCol xs="10" md="4">
                  {serviceReqDetails ? 
                   <button
                   style={{
                     backgroundColor: getBadge(item.status),
                     padding: '5px 8px',
                     borderRadius: '3px',
                     color: 'white',
                     fontSize: '13px',
                     width: '70px',
                     textTransform: 'capitalize',
                     textAlign: 'center',
                     outline: 'none',
                     border: 'none',
                   }}>{serviceReqDetails.status}</button> : null} 
                  </CCol>  </CRow>
               </CCol>
            </CRow>

            <CRow style={{ marginTop: '2%', marginLeft: '0%' }}>
               <CCol xs="10" sm="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Executive: </div>
               <CCol xs="10" md="6">
                  {edit ?
                     <CFormGroup >
                        <CSelect custom size="md" name="name" id="name" className="w-80" value={executive} onChange={(e) => setExecutive(e.target.value)}>
                           <option value="undefined">Open this select menu</option>
                           <option value="Vamsi">Vamsi</option>
                           <option value="Sandeep">Sandeep</option>
                           <option value="Pooja">Pooja</option>
                           <option value="Vikram">Vikram</option>
                           <option value="Arun">Arun</option>
                        </CSelect>
                     </CFormGroup>
                     : serviceReqDetails ? serviceReqDetails.executive : null} 
                     </CCol> </CRow>
               </CCol>
               <CCol xs="10" sm="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Schedule Date: </div>
               <CCol xs="10" md="6">
                  {edit ?
                     <CFormGroup >
                        <CInput type="date" id="sheduleDate" className="w-80"
                        name="sheduleDate" placeholder="sheduleDate" value={date} onChange={(e) => { setDate(e.target.value) }} />
                     </CFormGroup>
                     : serviceReqDetails ? serviceReqDetails.date : null} 
                     </CCol> </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
               <div style={{ fontWeight:'bold'}}> Schedule Time: </div>
               <CCol xs="10" md="6">
                    {edit ?
                     <CFormGroup >
                        <CInput type="time" id="sheduleTime" className="w-80" name="sheduleTime" placeholder="sheduleTime" value={time} onChange={(e) => { setTime(e.target.value) }} />
                     </CFormGroup>
                     : serviceReqDetails ? serviceReqDetails.time : null} 
                     </CCol> </CRow>
               </CCol>
            </CRow>

            <CRow style={{ marginTop: '2%',fontWeight:'bold', }}>
               <CCol xs="10" lg="6">
                  Issue Details: {serviceReqDetails ? serviceReqDetails.issueDetails : null}
               </CCol>
               <CCol xs="10" lg="6">
                  Machine Pictures:
               </CCol>
            </CRow>
         </CCardBody>

            <CCardHeader>
               <CCardSubtitle style={{fontWeight:'bold',fontSize:'1rem'}}> Machine Details</CCardSubtitle>
            </CCardHeader>
         <CRow style={{ marginLeft: '2%', marginTop: '2%', }}>
            <CCol xs="10" lg="4">
               <CRow>
               <div style={{ fontWeight:'bold'}}>Machine ID: </div>
               <CCol xs="10" md="6">
               {machineDetails ? machineDetails.machine_id : null}
               </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
            <CRow>  
            <div style={{ fontWeight:'bold'}}>Machine Serial Number: </div>
            <CCol xs="10" md="6">
             {machineDetails ? machineDetails.machineSerialNo : null} 
             </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>Machine Type: </div>
            <CCol xs="10" md="4">
              {machineDetails ? machineDetails.machineType : null}
              </CCol> </CRow>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>Make: </div>
            <CCol xs="10" md="6">
                {machineDetails ? machineDetails.make : null} 
                </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>Model: </div>
            <CCol xs="10" md="6">
                {machineDetails ? machineDetails.model : null} 
                </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}> Machine Age: </div>
            <CCol xs="10" md="4">
                {machineDetails ? machineDetails.machineAge : null} 
                </CCol> </CRow>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%',}}>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>  Machine Controller: </div>
            <CCol xs="10" md="4">
                {machineDetails ? machineDetails.controller : null} 
                </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
              <CRow>
            <div style={{ fontWeight:'bold'}}> Controller Model: </div>
            <CCol xs="10" md="4">
                {machineDetails ? machineDetails.controllerModel : null} 
                </CCol></CRow> 
            </CCol>
         </CRow>

            <CCardHeader>
               <CCardSubtitle style={{marginTop:'2%',fontWeight:'bold',fontSize:'1rem'}}>Customer Contact Details</CCardSubtitle>
            </CCardHeader>
         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>  Contact Person Name: </div>
            <CCol xs="10" md="3">
               {customerDetails ? customerDetails.contactPerson : null}
               </CCol>
                </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>  Contact Number: </div>
            <CCol xs="10" md="6">
               {customerDetails ? customerDetails.mobileNo : null}
               </CCol>
                </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
            <div style={{ fontWeight:'bold'}}>  Alternate Number: </div>
            <CCol xs="10" md="6">
               {customerDetails ? customerDetails.alternateNo : null} 
               
               </CCol></CRow>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="6">
               <CRow>
            <div style={{ fontWeight:'bold'}}>   Customer Address: </div>
            <CCol xs="10" md="4">
                {customerDetails ? customerDetails.address : null}
                </CCol>
                 </CRow>
            </CCol>
            <CCol xs="10" lg="6">
               <CRow>
            <div style={{ fontWeight:'bold'}}>  Email: </div>
            <CCol xs="10" md="6">
               Email: {customerDetails ? customerDetails.email : null}
               </CCol>
                </CRow>
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
