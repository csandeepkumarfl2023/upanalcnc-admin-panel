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
   CAlert,
   CModal,
   CModalBody,
   CModalFooter,
   CModalHeader,
   CModalTitle,
   CTextarea
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import ServiceRequestService from '../../services/serviceRequestService'
import CustomerService from '../../services/customerService'
import MachineService from '../../services/machineService'
import EmployeeService from '../../services/employeeService';
import moment from 'moment'
import { Formik } from "formik"
import '../styles.css'

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
   const [issueDetails, setIssueDetails] = useState()
   const [date, setDate] = useState("")
   const [time, setTime] = useState("")
   const [employeesArr, setEmployeesArr] = useState()

   const [customerDetails, setCustomerDetails] = useState()
   const [machineDetails, setMachineDetails] = useState()
   const [serviceReqDetails, setServiceReqDetails] = useState()

   const [alert, setAlert] = useState(false)
   const [confirmation,setConfirmation] = useState(false)

   const getServicerequestDetails = async () => {
      let res = await serviceRequestService.getServiceRequest(item.service_request_id)
      setCustomerDetails(res.data.machine.client)
      setMachineDetails(res.data.machine)
      setServiceReqDetails(res.data)

      console.log('servicrereqdetails', res.data)
   }

   const submitHandler = async () => {
      setConfirmation(false)
      let currentData = {}
      currentData.employee_id = executive
      currentData.request_status = 'ASSIGNED'
      currentData.request_detail = issueDetails
      currentData.workstep_detail = {
         site_visit_date: moment(new Date(date + ' ' + time)).format('YYYY-MM-DD HH:mm:ss')
      }
      console.log(currentData)
      try{
      let res = await serviceRequestService.updateServiceRequest(currentData, item.service_request_id)
      history.push({
         pathname: '/servicerequest',
         state: 'Service Request updated'
       })
      } catch (err) {
         console.log(err.message || 'Error occured Please try again!')
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
      <>
         <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
            Error occured Please try again!
         </CAlert>
         <Formik
                initialValues={item}
                onSubmit={async (values) => {
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
         <CCard  className="mt-2">

            <CRow className="pl-3 mt-3" >
               <CCol xs="6" md="11">
                  <CCardSubtitle style={{fontSize: '1.1rem' }}>Service Request {item ? item.service_request_id : null}</CCardSubtitle>
               </CCol>
               <CCol xs="6" md="1">
                  <CIcon name="cil-pen" size="lg" style={{ cursor: 'pointer' }} onClick={() => {
                     setEdit(!edit)
                     setExecutive(serviceReqDetails?.service_request_tasks[0]?.employee?.employee_id)
                     setIssueDetails(serviceReqDetails ? serviceReqDetails.request_detail : null)
                     setDate(serviceReqDetails && serviceReqDetails.service_request_tasks[0] ? moment(serviceReqDetails.service_request_tasks[0].site_visit_date).format('YYYY-MM-DD') : '')
                     setTime(serviceReqDetails && serviceReqDetails.service_request_tasks[0] ? moment(serviceReqDetails.service_request_tasks[0].site_visit_date).format('HH:mm') : '')
                  }} />
               </CCol>
            </CRow>

            <CCardBody >
               <div className="pl-3">
                  <CRow >
                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> Customer Name: </div>
                           <span className="ml-2" >
                              {customerDetails ? customerDetails.company : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> Customer Code: </div>
                           <span className="ml-2" >
                              {customerDetails ? customerDetails.client_id : null}  </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>  View Report: </div>
                           <span className="ml-2">
                              N/A
                           </span>
                        </CRow>
                     </CCol>
                  </CRow>
                  <hr></hr>
                  <CRow >
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> <CIcon name="cil-chevron-circle-right-alt" /> Issue Type: </div>
                           <span className="ml-2">
                              {serviceReqDetails ? serviceReqDetails.issue_type : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}><CIcon name="cil-asterisk-circle" /> Priority: </div>
                           <span className="ml-2">
                              {serviceReqDetails ? serviceReqDetails.request_priority : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>  <CIcon name="cil-flag-alt" /> Status: </div>
                           <span className="ml-2">
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
                           </span>  </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> <CIcon name="cil-user" />  Executive: </div>
                           <span className="ml-2">
                              {edit ?
                                 <CFormGroup >
                                    <CSelect custom size="sm" name="name" id="name" value={executive} 
                                    onChange={(e) => setExecutive(e.target.value)} className={!executive && "error"}>
                                       <option value="undefined">Select executive</option>
                                       {employeesArr && employeesArr.length ? employeesArr.map((elem) => {
                                          return <option key={elem.employee_id} value={elem.employee_id}>{elem.employee_name}</option>
                                       }
                                       ) : null}
                                    </CSelect>
                                    {!executive && 
                              <div className="input-feedback mt-1">Executive is required</div>}
                                 </CFormGroup>
                                 : serviceReqDetails?.service_request_tasks[0]?.employee?.employee_name || null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}><CIcon name="cil-calendar" />  Schedule Date: </div>
                           <span className="ml-2">
                              {edit ?
                                 <CFormGroup >
                                    <CInput type="date" id="sheduleDate"
                                       size="sm"
                                       name="sheduleDate" placeholder="sheduleDate" value={date} 
                                       onChange={(e) => { setDate(e.target.value) }} className={!date && "error"}/>
                                        {!date && 
                              <div className="input-feedback">Date is required</div>}
                                 </CFormGroup>
                                 : serviceReqDetails && serviceReqDetails.service_request_tasks[0] && serviceReqDetails.service_request_tasks[0].site_visit_date  ? moment(serviceReqDetails.service_request_tasks[0].site_visit_date).format('YYYY-MM-DD') : null}
                           </span> </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> <CIcon name="cil-clock" /> Schedule Time: </div>
                           <span className="ml-2">
                              {edit ?
                                 <CFormGroup >
                                    <CInput type="time" id="sheduleTime" size="sm" name="sheduleTime" placeholder="sheduleTime" value={time} 
                                    onChange={(e) => { setTime(e.target.value) }} className={!time && "error"}/>
                                    {!time && 
                              <div className="input-feedback">Time is required</div>}
                                 </CFormGroup>
                                 : serviceReqDetails && serviceReqDetails.service_request_tasks[0] && serviceReqDetails.service_request_tasks[0].site_visit_date? moment(serviceReqDetails.service_request_tasks[0].site_visit_date).format('HH:mm') : null}
                           </span>
                        </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-4 pb-2" >
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>
                           <CIcon name="cil-color-border" /> Issue Details:
                           </div>
                           <span className="ml-2">
                           {edit ?
                                 <CFormGroup >
                                    <CTextarea type="text"  name="issueDetails" placeholder="issueDetails" value={issueDetails} 
                                    onChange={(e) => { setIssueDetails(e.target.value) }} className={!issueDetails && "error"}/>
                                    {!issueDetails && 
                              <div className="input-feedback mt-2">Issue Details is required</div>} 
                                 </CFormGroup>
                                 
                                 :
                              serviceReqDetails ? serviceReqDetails.request_detail : null}
                           </span>
                        </CRow>
                     </CCol>

                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>
                           <CIcon name="cil-tags" /> Servive Request Type:
                           </div>
                           <span className="ml-2">
                              {serviceReqDetails ? serviceReqDetails.service_request_type : null}
                           </span>
                        </CRow>
                     </CCol>

                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>
                           <CIcon name="cil-camera" />  Machine Pictures:
                           </div>
                           <span className="ml-2"></span>
                        </CRow>
                     </CCol>
                  </CRow>
               </div>


               <CRow>
                  <CCardSubtitle className="pl-3 pt-5" style={{ fontSize: '1rem' }}>Machine Details</CCardSubtitle>
               </CRow>
               <hr />

               <div className="pt-1 pl-3">
                  <CRow className="mb-3">
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>Machine ID: </div>
                           <span className="ml-2">
                              {machineDetails ? machineDetails.machine_id : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>Machine Serial Number: </div>
                           <span className="ml-2">
                              {machineDetails ? machineDetails.machine_serial_number : null}
                           </span> </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>Machine Type: </div>
                           <span className="ml-2">
                              {machineDetails ? machineDetails.other_machine_type ? machineDetails.other_machine_type : machineDetails.machine_type : null}
                           </span> </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-2 pb-2">
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>Make: </div>
                           <span className="ml-2">
                              {machineDetails ? machineDetails.machine_make : null}
                           </span> </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>Model: </div>
                           <span className="ml-2">
                              {machineDetails ? machineDetails.machine_model : null}
                           </span> </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> Machine Age: </div>
                           <span className="ml-2">
                              {machineDetails ? machineDetails.machine_age_as_on_installation : null}
                           </span>
                        </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}>  Machine Controller: </div>
                           <CCol xs="10" md="4">
                              {machineDetails ? machineDetails.other_machine_controller ? machineDetails.other_machine_controller : machineDetails.machine_controller : null}
                           </CCol> </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> Controller Model: </div>
                           <CCol xs="10" md="4">
                              {machineDetails ? machineDetails.machine_controller_model : null}
                           </CCol></CRow>
                     </CCol>
                  </CRow>
               </div>


               <CRow>
                  <CCardSubtitle className="pl-3 pt-5" style={{ fontSize: '1rem' }}>Customer Contact Details</CCardSubtitle>
               </CRow>
               <hr />

               <div className="pt-1 pl-3 pb-3">
                  <CRow className="pb-3">
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}><CIcon name="cil-contact" />   Contact Person Name: </div>
                           <span className="ml-2">
                              {customerDetails ? customerDetails.contact_person : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}><CIcon name="cil-mobile" /> Contact Number: </div>
                           <span className="ml-2">
                              {customerDetails ? customerDetails.phone_number : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> <CIcon name="cil-mobile" /> Alternate Number: </div>
                           <span className="ml-2">
                              {customerDetails ? customerDetails.alternate_phone_number : null}
                           </span>
                        </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}><CIcon name="cil-location-pin" />  Customer Address: </div>
                           <span className="ml-2">
                              {customerDetails ? customerDetails.address : null}
                           </span>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4" >
                        <CRow>
                           <div style={{ fontWeight: 'bold' }}> <CIcon name="cil-envelope-closed" /> Email: </div>
                           <span className="ml-2">
                              {customerDetails ? customerDetails.email_id : null}
                           </span>
                        </CRow>
                     </CCol>
                  </CRow>

               </div>

               <CRow className="mt-2" style={{ justifyContent: 'center' }}>
                  {edit ?
                     <CCardFooter style={{ width: '25%' }}>

                        <CRow>
                           <CCol xs="6">
                              <CButton variant="outline" block color="info" className="mr-1" onClick={() => setEdit(false)}
                              >Cancel</CButton>
                           </CCol>
                           <CCol xs="6">
                              <CButton block color="info" className="mr-1" onClick={()=> setConfirmation(!confirmation)}
                              >Submit</CButton>
                           </CCol>
                        </CRow>

                     </CCardFooter>
                     :
                     <CCardFooter style={{ width: '13%' }}>
                        <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/serviceRequest')}
                        >Close</CButton>
                     </CCardFooter>
                  }
               </CRow>

       

         <CModal centered="true" 
              show={confirmation} 
              onClose={() => setConfirmation(!confirmation)}
              size="md"
            >
              <CModalHeader closeButton>
                <CModalTitle>Confirmation?</CModalTitle>
              </CModalHeader>
              <CModalBody>
               Are you sure you want to make changes to the service request {item ? item.service_request_id : null}?
              </CModalBody>
              <CModalFooter>
                <CButton color="info" onClick={() => setConfirmation(!confirmation)}>No</CButton>{' '}
                <CButton color="info" onClick={handleSubmit}>Yes</CButton>
              </CModalFooter>
            </CModal>
            </CCardBody>
         </CCard>
           )}
          </Formik>
      </>
   )
}
