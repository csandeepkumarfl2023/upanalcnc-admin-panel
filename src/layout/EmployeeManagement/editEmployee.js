import React, { useState } from 'react'
import {
   CCard,
   CCardHeader,
   CCardBody,
   CCol,
   CRow,
   CButton,
   CFormGroup,
   CInput,
   CCardSubtitle,
   CCardFooter,
   CAlert,
   CTextarea,
   CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import EmployeeService from '../../services/employeeService'
import moment from 'moment'
import { Formik } from "formik"
import * as yup from 'yup'
import '../styles.css'

const employeeSerice = new EmployeeService()
// active: true
// address: "admin"
// designation: "ADMIN"
// email_id_id: "p0074471@gmail.com"
// employee_id: "1"
// employee_name: "ADMIN"
// phone_number: "893138113"

export default function EditEmployee(props) {
   const history = useHistory();
   const [item, setItem] = useState(props.location.state)
   const [edit, setEdit] = React.useState(false)
   const [employee_name, setEmployeeName] = useState("")
   const [department, setDepartment] = useState("")
   const [employee_id, setEmployeeId] = useState("")
   const [phone_number, setPhoneNumber] = useState("")
   const [email_id, setEmailId] = useState("")
   const [address, setAddress] = useState("")
   const [designation, setDesignation] = useState("")
   const [active, setActive] = useState(false)
   const [date_of_joining, setDateOfJoining] = useState("")
   const [date_of_leaving, setDateOfLeaving] = useState("")
   const [employee_type, setEmployeeType] = useState("")
   const [rawPassword, setRawPassword] = useState("")

   const [alert, setAlert] = useState(false)
   const [alertText, setAlertText] = useState(false)

   const [data, setData] = useState({
      active: "", phone_number: "", email_id: "", department: "", employee_type: "",
      address: "", employee_name: "", designation: "", employee_id: "", security_pin: "", date_of_joining: "", date_of_leaving: ""
   })

   const cancelHandler = () => {
      setEdit(false)
   }

   const validation = yup.object().shape({
      department: yup
         .string()
         .required('Department required'),
         employee_name: yup
         .string()
         .required('Employee Name required'),
         phone_number: yup
         .string()
         .required('Phone Number required'),
         address: yup
         .string()
         .required('Address required'),
         email_id: yup
         .string()
         .required('Email required'),
         designation: yup
         .string()
         .required('Designation required'),
         employee_type: yup
         .string()
         .required('Employee Type required'),
         date_of_joining: yup
         .string()
         .required('Date Of Joining required'),
         date_of_leaving: yup
         .string()
         .required('Date Of Leaving required'),
   })

   const getEmployeeDetails = async () => {
      const res = await employeeSerice.getEmployee(item.employee_id)
      console.log('ressssssss',res);
      setEmployeeName(res.data.employee_name)
      setDepartment(res.data.department)
      setDateOfJoining(res.data.date_of_joining)
      setDateOfLeaving(res.data.date_of_leaving)
      setEmployeeType(res.data.employee_type)
      setEmployeeId(res.data.employee_id)
      setPhoneNumber(res.data.phone_number)
      setEmailId(res.data.email_id)
      setAddress(res.data.address)
      setDesignation(res.data.designation)
      setActive(res.data.active)
      let currentData = {}
      currentData = {...data}
      currentData.employee_name = res.data.employee_name
      currentData.department = res.data.department
      currentData.date_of_joining = res.data.date_of_joining
      currentData.date_of_leaving = res.data.date_of_leaving
      currentData.employee_type = res.data.employee_type
      currentData.designation = res.data.designation
      currentData.phone_number = res.data.phone_number
      currentData.email_id = res.data.email_id
      currentData.address = res.data.address
      setData(currentData)
   }

   const submitHandler = async (values) => {
      console.log('values', values);
      let currentData = { ...item }
      currentData.employee_name = values.employee_name
      currentData.department = department
      currentData.employee_id = employee_id
      currentData.phone_number = phone_number
      currentData.email_id = email_id
      currentData.address = address
      currentData.designation = designation
      currentData.active = active
      currentData.date_of_joining = moment(new Date(date_of_joining)).format('YYYY-MM-DD HH:mm:ss')
      currentData.date_of_leaving = moment(new Date(date_of_leaving)).format('YYYY-MM-DD HH:mm:ss')
      currentData.employee_type = employee_type
      console.log(currentData);
      try {
         let res = await employeeSerice.updateEmployee(currentData)
         await employeeSerice.updateEmployeeActive(employee_id, active)
         history.push({
            pathname: '/employeemanagement',
            state: 'Employee updated successfully!'
         })
      } catch (err) {
         setAlertText(err.message || 'Error occured Please try again!')
         setAlert(true)
      }
   }

   const activeHandler = (status) => {
      setActive(status)
      // console.log('active', active);
   }
   React.useEffect(() => {
      console.log('props', props.location.state);
      setItem(props.location.state)
      if (props.location.state) {
         getEmployeeDetails()

      }
   }, [])

   return (
      <>
         <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
            {alertText}
         </CAlert>
         <Formik
            enableReinitialize={true}
            validationSchema={validation}
            initialValues={data}
            onSubmit={async (values) => {
               console.log('values', values);
               submitHandler(values)
            }}>
            {({ handleSubmit, handleChange, values, errors, touched }) => (

               <CCard>
                  <CRow className="pl-3 mt-3" >
                     <CCol xs="6" md="11">
                        <CCardSubtitle style={{ fontSize: '1rem' }}><b>Employee:</b> {item ? item.employee_name : null}</CCardSubtitle>
                     </CCol>
                     <CCol xs="6" md="1">
                        <CIcon name="cil-pen" size="lg" style={{ cursor: 'pointer' }} onClick={() => { setEdit(!edit) }}>
                        </CIcon>
                     </CCol>
                  </CRow>
                  <hr />
                  <CCardBody>

                     <div className="pt-1 pl-3 ">
                        <CRow className="mb-2 pb-2">
                        <CCol xs="12" sm="12" lg="6">
                                 <CIcon name="cib-adobe-indesign" className='m-1' /> <b>Employee Id:    </b>
                                 { edit ?
                                 <CFormGroup > 
                                    <CInput style={{ width: '85%' }} type="text" id="employee_id"
                                    name="employee_id" placeholder="employee_id" value={employee_id} onChange={(e) => { setEmployeeId(e.target.value) }} readOnly/>
                                 </CFormGroup>
                                 : employee_id } 
                           </CCol>
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-user" className='m-1' />  <b>Employee Name:   </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="text" id="employee_name"
                                       name="employee_name" placeholder="employee_name" value={values.employee_name}
                                       onChange={handleChange} className={errors.employee_name && touched.employee_name && "error"} />
                                 </CFormGroup>
                                 { errors.employee_name && touched.employee_name &&
                                    <div className="input-feedback">{errors.employee_name}</div>}
                                    </>
                                 : employee_name}
                             
                           </CCol>
                                 </CRow>

                                 <CRow className="mb-2 pb-2">
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-pen-alt" className='m-1' /> <b>Designation:    </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="text" id="designation"
                                       name="designation" placeholder="designation" value={values.designation}
                                       onChange={handleChange}  className={errors.designation && touched.designation && "error"} />
                                 </CFormGroup>
                                  {errors.designation && touched.designation &&
                                    <div className="input-feedback">{errors.designation}</div>}
                                    </>
                                 : designation}
                             
                           </CCol>
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-briefcase" className='m-1' /> <b>Department:   </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="department" id="department"
                                       name="department" placeholder="department" value={values.department}
                                       onChange={handleChange} className={errors.department && touched.department && "error"} />
                                 </CFormGroup>
                                 {errors.department && touched.department &&
                                    <div className="input-feedback">{errors.department}</div>}
                                    </>
                                 : department}
                              
                           </CCol>
                           </CRow>
                        

                        <CRow className=" pb-2">
                        <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-voice-over-record" className='m-1' /> <b>Employee Type:     </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="text" id="employee_type"
                                       name="employee_type" placeholder="employee_type" value={values.employee_type}
                                       onChange={handleChange} className={errors.employee_type && touched.employee_type && "error"}/>
                                 </CFormGroup>
                                     {errors.employee_type && touched.employee_type &&
                                       <div className="input-feedback">{errors.employee_type}</div>}
                                       </>
                                 : employee_type}
                          
                           </CCol>
                           <CCol xs="12" sm="12" lg="6" >
                              <CIcon name="cil-mobile" className='ml-1 mt-0' />  <b>Phone Number:   </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="text" id="phone_number"
                                       name="phone_number" placeholder="phone_number" value={values.phone_number}
                                       onChange={handleChange} className={errors.phone_number && touched.phone_number && "error"}/>
                                 </CFormGroup>
                                  {errors.phone_number && touched.phone_number &&
                                    <div className="input-feedback">{errors.phone_number}</div>}
                                    </>
                                 : phone_number}
                             
                           </CCol>
                        </CRow>

                        <CRow className="pt-2 pb-2">
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-location-pin" className='m-1' /><b>Employee Address:   </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CTextarea style={{ width: '85%' }} type="text" id="address"
                                       name="address" placeholder="address" value={values.address}
                                       onChange={handleChange} className={errors.address && touched.address && "error"} />
                                 </CFormGroup>
                                    {errors.address && touched.address &&
                                       <div className="input-feedback">{errors.address}</div>}
                                       </>
                                 : address}
                             
                           </CCol>
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-envelope-closed" className='m-1' /> <b>Email Id:    </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="text" id="email_id"
                                       name="email_id" placeholder="email_id" value={values.email_id}
                                       onChange={handleChange} className={errors.email_id && touched.email_id && "error"} />
                                 </CFormGroup>
                                  {errors.email_id && touched.email_id &&
                                    <div className="input-feedback">{errors.email_id}</div>}
                                    </>
                                 : email_id}
                            
                           </CCol>
                        </CRow>

                        <CRow className="pt-3 pb-1">
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-calendar" className='m-1' /> <b>Date Of Joining:    </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="date" id="date_of_joining"
                                       name="date_of_joining" placeholder="date_of_joining" value={moment(values.date_of_joining).format('YYYY-MM-DD') }
                                       onChange={handleChange} className={errors.date_of_joining && touched.date_of_joining && "error"} />
                                 </CFormGroup>
                                   {errors.date_of_joining && touched.date_of_joining &&
                                    <div className="input-feedback">{errors.date_of_joining}</div>}
                                    </>
                                 : moment(new Date(date_of_joining)).format('MM/DD/yyyy')}
                             
                           </CCol>
                           <CCol xs="12" sm="12" lg="6">
                           <CIcon name="cil-calendar-check" className='m-1' /><b>Active:</b>
                                 <CFormGroup>
                                    <CCol sm="9">
                                       <CSwitch
                                         checked={active ? true : false}
                                          className="mr-1"
                                          color="primary"
                                          onChange={(e) => activeHandler(e.target.checked)}
                                       /> 
                                    </CCol>
                                 </CFormGroup>
                                 </CCol>
                        </CRow>

                        <CRow className=" pb-1">
                           <CCol xs="12" sm="12" lg="6">
                              <CIcon name="cil-calendar" className='m-1' /> <b>Date Of Leaving:    </b>
                              {edit ?
                              <>
                                 <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="date" id="date_of_leaving"
                                       name="date_of_leaving" placeholder="date_of_leaving" value={moment(values.date_of_leaving).format('YYYY-MM-DD') }
                                       onChange={handleChange} className={errors.date_of_leaving && touched.date_of_leaving && "error"} />
                                 </CFormGroup>
                                   {errors.date_of_leaving && touched.date_of_leaving &&
                                    <div className="input-feedback">{errors.date_of_leaving}</div>}
                                    </>
                                 : moment(new Date(date_of_leaving)).format('MM/DD/yyyy')}
                             
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
                                    <CButton block color="info" className="mr-1" onClick={handleSubmit}
                                    >Submit</CButton>
                                 </CCol>
                              </CRow>

                           </CCardFooter>
                           :
                           <CCardFooter style={{ width: '13%' }}>
                              <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/employeemanagement')}
                              >Close</CButton>
                           </CCardFooter>
                        }
                     </CRow>

                  </CCardBody>
               </CCard>
            )}
         </Formik>
      </>

   )
}

