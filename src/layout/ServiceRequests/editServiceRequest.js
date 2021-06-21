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
import EmployeeService from '../../services/employeeService';
import moment from 'moment'

const serviceRequestService = new ServiceRequestService()
const customerSerice = new CustomerService()
const machineService = new MachineService()
const employeeService = new EmployeeService()

const getBadge = status => {
   switch (status) {
      case 'Completed':
      case 'COMPLETED':
      case 'completed':
         return '#50D2C2'
      case 'Overdue':
      case 'OVERDUE':
      case 'overdue':
         return '#FF3366'
      case 'Pending':
      case 'pending':
      case 'PENDING':
         return '#FCAB53'
      case 'Assigned':
      case 'assigned':
      case 'ASSIGNED':
         return '#D667CD'
      case 'Accepted':
      case 'accepted':
      case 'ACCEPTED':
         return '#8C88FF'
      case 'new':
      case 'NEW':
      case 'New':
         return '#00B9FF'
      case 'open':
      case 'OPEN':
      case 'Open':
         return '#00B9FF'
      default: return 'gray'
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
   const [employeesArr, setEmployeesArr] = useState()

   const [customerDetails, setCustomerDetails] = useState()
   const [machineDetails, setMachineDetails] = useState()
   const [serviceReqDetails, setServiceReqDetails] = useState()


   const getServicerequestDetails = async () => {
      let res = await serviceRequestService.getServiceRequest(item.service_request_id)
      setCustomerDetails(res.data.machine.client)
      setMachineDetails(res.data.machine)
      setServiceReqDetails(res.data)
      
      console.log('servicrereqdetails', res.data)
   }

   const submitHandler = async () => {
      let currentData = {}
      currentData.employee_id = executive
      currentData.request_status = 'ASSIGNED'
      currentData.workstep_detail = {
         site_visit_date : moment(date).format('YYYY-MM-DD hh:mm:ss')
      }
      console.log(currentData)
      try{
      let res = await serviceRequestService.updateServiceRequest(currentData, item.service_request_id)
      history.push('/servicerequest')
      } catch (err) {
         console.log(err)
      }
   }

   const getEmployees = async () => {
      let res = await employeeService.getEmployees()
      if (res.data) {
         setEmployeesArr(res.data)
      }
   }

   React.useEffect(() => {
      setItem(props.location.state)
      if (props.location.state) {
         // getCustomerDetails()
         // getMachineDetails()
         getServicerequestDetails()
         getEmployees()
      }
   }, [])

   return (
      <CCard>
         <CCardHeader>
            <CRow>
               <CCol xs="6" md="11">
                  <CCardSubtitle style={{ marginTop: '1%', fontWeight: 'bold', fontSize: '1.1rem' }}>Service Request {item ? item.servicerequestId : null}</CCardSubtitle>
               </CCol>
               <CCol xs="6" md="1">
                  <CIcon name="cil-pen" size="1xl" onClick={() => {
                     setEdit(true)
                     setExecutive(serviceReqDetails?.service_request_tasks[0]?.employee?.employee_id )
                  }} />
               </CCol>
            </CRow>
         </CCardHeader>
         <CCardBody >
            <CRow style={{ marginLeft: '2%' }}>
               <CCol xs="10" md="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Customer Name: </div>
                     <CCol xs="10" md="6">
                        {customerDetails ? customerDetails.company : null}
                     </CCol>
                  </CRow>
               </CCol>
               <CCol xs="10" md="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Customer Code: </div>
                     <CCol xs="10" md="6">
                        {customerDetails ? customerDetails.client_id : null}  </CCol>
                  </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}>  View Report: </div>
                     <CCol xs="10" md="4">
                        N/A
                     </CCol>
                  </CRow>
               </CCol>
            </CRow>


            <CRow style={{ marginTop: '2%', marginLeft: '2%' }}>
               <CCol xs="10" lg="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Issue Type: </div>
                     <CCol xs="10" md="4">
                        {serviceReqDetails ? serviceReqDetails.issue_type : null}
                     </CCol> </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Priority: </div>
                     <CCol xs="10" md="4">
                        {serviceReqDetails ? serviceReqDetails.request_priority : null}
                     </CCol> </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Status: </div>
                     <CCol xs="10" md="4">
                        {serviceReqDetails && serviceReqDetails.request_status ?
                           <button
                              style={{
                                 backgroundColor: getBadge(serviceReqDetails.request_status),
                                 padding: '5px 8px',
                                 borderRadius: '3px',
                                 color: 'white',
                                 fontSize: '13px',
                                 width: '100px',
                                 textTransform: 'capitalize',
                                 textAlign: 'center',
                                 outline: 'none',
                                 border: 'none',
                              }}>{serviceReqDetails.request_status}</button> : null}
                     </CCol>  </CRow>
               </CCol>
            </CRow>

            <CRow style={{ marginTop: '2%', marginLeft: '2%' }}>
               <CCol xs="10" sm="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Executive: </div>
                     <CCol xs="10" md="6">
                        {edit ?
                           <CFormGroup >
                              <CSelect custom size="md" name="name" id="name" className="w-80" value={executive} onChange={(e) => setExecutive(e.target.value)}>
                                 <option value="undefined">Open this select menu</option>
                                 {employeesArr && employeesArr.length ? employeesArr.map((elem) => {
                                    return <option key={elem.employee_id} value={elem.employee_id}>{elem.employee_name}</option>
                                 }
                                 ) : null}
                              </CSelect>
                           </CFormGroup>
                           : serviceReqDetails ?.service_request_tasks[0] ?.employee ?.employee_name || null}
                     </CCol> </CRow>
               </CCol>
               <CCol xs="10" sm="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Schedule Date: </div>
                     <CCol xs="10" md="6">
                        {edit ?
                           <CFormGroup >
                              <CInput type="date" id="sheduleDate" className="w-80"
                                 name="sheduleDate" placeholder="sheduleDate" value={date} onChange={(e) => { setDate(e.target.value) }} />
                           </CFormGroup>
                           : serviceReqDetails && serviceReqDetails.service_request_tasks[0] ? serviceReqDetails.service_request_tasks[0].site_visit_date : null}
                     </CCol> </CRow>
               </CCol>
               <CCol xs="10" lg="4">
                  <CRow>
                     <div style={{ fontWeight: 'bold' }}> Schedule Time: </div>
                     <CCol xs="10" md="6">
                        {edit ?
                           <CFormGroup >
                              <CInput type="time" id="sheduleTime" className="w-80" name="sheduleTime" placeholder="sheduleTime" value={time} onChange={(e) => { setTime(e.target.value) }} />
                           </CFormGroup>
                           : serviceReqDetails && serviceReqDetails.service_request_tasks[0] ? serviceReqDetails.service_request_tasks[0].site_visit_date : null}
                     </CCol> </CRow>
               </CCol>
            </CRow>

            <CRow style={{ marginTop: '2%', marginLeft: '2%', fontWeight: 'bold', }}>
               <CCol xs="10" lg="6">
                  Issue Details: {serviceReqDetails ? serviceReqDetails.request_detail : null}
               </CCol>
               <CCol xs="10" lg="6">
                  Machine Pictures:
               </CCol>
            </CRow>
         </CCardBody>

         <CCardHeader>
            <CCardSubtitle style={{ fontWeight: 'bold', fontSize: '1rem' }}> Machine Details</CCardSubtitle>
         </CCardHeader>
         <CRow style={{ marginLeft: '2%', marginTop: '2%', }}>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>Machine ID: </div>
                  <CCol xs="10" md="6">
                     {machineDetails ? machineDetails.machine_id : null}
                  </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>Machine Serial Number: </div>
                  <CCol xs="10" md="6">
                     {machineDetails ? machineDetails.machine_serial_number : null}
                  </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>Machine Type: </div>
                  <CCol xs="10" md="4">
                     {machineDetails ? machineDetails.other_machine_type ? machineDetails.other_machine_type : machineDetails.machine_type : null}
                  </CCol> </CRow>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>Make: </div>
                  <CCol xs="10" md="6">
                     {machineDetails ? machineDetails.machine_make : null}
                  </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>Model: </div>
                  <CCol xs="10" md="6">
                     {machineDetails ? machineDetails.machine_model : null}
                  </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}> Machine Age: </div>
                  <CCol xs="10" md="4">
                     {machineDetails ? machineDetails.machine_age_as_on_installation : null}
                  </CCol> </CRow>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%', }}>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Machine Controller: </div>
                  <CCol xs="10" md="4">
                     {machineDetails ? machineDetails.other_machine_controller ? machineDetails.other_machine_controller : machineDetails.machine_controller : null}
                  </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}> Controller Model: </div>
                  <CCol xs="10" md="4">
                     {machineDetails ? machineDetails.machine_controller_model : null}
                  </CCol></CRow>
            </CCol>
         </CRow>

         <CCardHeader>
            <CCardSubtitle style={{ marginTop: '2%', fontWeight: 'bold', fontSize: '1rem' }}>Customer Contact Details</CCardSubtitle>
         </CCardHeader>
         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Contact Person Name: </div>
                  <CCol xs="10" md="3">
                     {customerDetails ? customerDetails.contact_person : null}
                  </CCol>
               </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Contact Number: </div>
                  <CCol xs="10" md="6">
                     {customerDetails ? customerDetails.phone_number : null}
                  </CCol>
               </CRow>
            </CCol>
            <CCol xs="10" lg="4">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Alternate Number: </div>
                  <CCol xs="10" md="6">
                     {customerDetails ? customerDetails.alternate_phone_number : null}

                  </CCol></CRow>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            <CCol xs="10" lg="6">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>   Customer Address: </div>
                  <CCol xs="10" md="4">
                     {customerDetails ? customerDetails.address : null}
                  </CCol>
               </CRow>
            </CCol>
            <CCol xs="10" lg="6">
               <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Email: </div>
                  <CCol xs="10" md="6">
                     {customerDetails ? customerDetails.email_id : null}
                  </CCol>
               </CRow>
            </CCol>
         </CRow>
         {/* <CRow>
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
         </CRow> */}
         <CRow style={{ justifyContent: 'flex-end', marginRight: '2%' }}>
            {edit ?
               <CCardFooter style={{ width: '25%' }}>

                  <CRow>
                     <CCol xs="6">
                        <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/overview')}
                        >Cancel</CButton>
                     </CCol>
                     <CCol xs="6">
                        <CButton block color="info" className="mr-1" onClick={submitHandler}
                        >Submit</CButton>
                     </CCol>
                  </CRow>

               </CCardFooter>
               :
               <CCardFooter style={{ width: '13%' }}>
                  <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/overview')}
                  >Cancel</CButton>
               </CCardFooter>
            }
         </CRow>
      </CCard>

   )
}
