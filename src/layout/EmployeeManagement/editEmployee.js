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
   CTextarea
} from '@coreui/react'
import { useHistory } from "react-router-dom";
import EmployeeService from '../../services/employeeService'

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
   const [department,setDepartment] = useState("")
   const [employee_id, setEmployeeId] = useState("")
   const [phone_number, setPhoneNumber] = useState("")
   const [email_id, setEmailId] = useState("")
   const [address, setAddress] = useState("")
   const [designation, setDesignation] = useState("")
   const [active, setActive] = useState("")
   const [date_of_joining,setDate_of_joining] = useState("")
   const [date_of_leaving,setDate_of_leaving] = useState("")
   const [employee_type,setEmployee_type] = useState("")
   const [rawPassword, setRawPassword] = useState("")

   const [alert, setAlert] = useState(false)
   const [alertText, setAlertText] = useState(false)

   const cancelHandler = () => {
      setEdit(false)
   }

   const getEmployeeDetails = async () => {
      const res = await employeeSerice.getEmployee(item.employee_id)
      console.log(res);
      setEmployeeName(res.data.employee_name)
      setDepartment(res.data.department)
      setDate_of_joining(res.data.date_of_joining)
      setDate_of_leaving(res.data.date_of_leaving)
      setEmployee_type(res.data.employee_type)
      setEmployeeId(res.data.employee_id)
      setPhoneNumber(res.data.phone_number)
      setEmailId(res.data.email_id)
      setAddress(res.data.address)
      setDesignation(res.data.designation)
      setActive(res.data.active)
   }

   const submitHandler = async () => {
      let currentData = { ...item }
      currentData.employee_name = employee_name
      currentData.department = department
      currentData.employee_id = employee_id
      currentData.phone_number = phone_number
      currentData.email_id = email_id
      currentData.address = address
      currentData.designation = designation
      currentData.active = active
      currentData.date_of_joining = date_of_joining
      currentData.date_of_leaving = date_of_leaving
      currentData.employee_type = employee_type
      console.log(currentData);
      try {
         let res = await employeeSerice.updateEmployee(currentData)
         history.push({
            pathname: '/employeemanagement',
            state: 'Employee updated successfully!'
         })
      } catch (err) {
         setAlertText(err.message || 'Error occured Please try again!')
         setAlert(true)
      }
   }

   React.useEffect(() => {
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
         <CCard>
            <CCardSubtitle className="pl-3 mt-3" style={{ fontSize: '1rem' }}><b>Employee:</b> {item ? item.employee_name : null}</CCardSubtitle>
            <hr />
            <CCardBody>
               <div className="pt-1 pl-3">
                  <CRow className="mb-2">
                     <CCol xs="12" sm="12" lg="6">
                           <b>Employee Name:</b>
                           <CFormGroup >
                              <CInput style={{ width: '85%' }} type="text" id="employee_name"
                                 name="employee_name" placeholder="employee_name" value={employee_name} onChange={(e) => { setEmployeeName(e.target.value) }} />
                           </CFormGroup>
                     </CCol>
                     <CCol xs="12" sm="12" lg="6">
                           <b>Department:</b>
                           <CFormGroup >
                              <CInput style={{ width: '85%' }} type="text" id="department"
                                 name="department" placeholder="department" value={department} onChange={(e) => { setDepartment(e.target.value) }} />
                           </CFormGroup>
                     </CCol>

                  </CRow>

                  <CRow className="pt-3 pb-2">
                     
                  <CCol xs="12" sm="12" lg="6">
                              <b>Employee Id: </b> 
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="employee_id"
                                    name="employee_id" placeholder="employee_id" value={employee_id} onChange={(e) => { setEmployeeId(e.target.value) }} readOnly/>
                              </CFormGroup>
                     </CCol>
                     <CCol xs="12" sm="12" lg="6">
                           <b>Phone Number: </b>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="phone_number"
                                    name="phone_number" placeholder="phone_number" value={phone_number} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">

                     <CCol xs="12" sm="12" lg="6">
                           <b>Active: </b>
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="active"
                                    name="active" placeholder="active" value={active} onChange={(e) => { setActive(e.target.value) }} />
                           </CFormGroup>
                     </CCol>
          
                     <CCol xs="12" sm="12" lg="6">
                     <b>Employee Address: </b>
                           <CFormGroup >
                                 <CTextarea style={{ width: '85%' }} type="text" id="address"
                                    name="address" placeholder="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                     <b>EmailId:</b>
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="email_id"
                                    name="email_id" placeholder="email_id" value={email_id} onChange={(e) => { setEmailId(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  <CCol xs="12" sm="12" lg="6">
                  <b>Designation: </b>
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="designation"
                                    name="designation" placeholder="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                     <b>Date Of Joining:</b>
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="date_of_joining"
                                    name="date_of_joining" placeholder="date_of_joining" value={date_of_joining} onChange={(e) => { setDate_of_joining(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  <CCol xs="12" sm="12" lg="6">
                  <b>Date Of Leaving: </b>
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="date_of_leaving"
                                    name="date_of_leaving" placeholder="date_of_leaving" value={date_of_leaving} onChange={(e) => { setDate_of_leaving(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  </CRow>
                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                     <b>Employee Type:</b>
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="employee_type"
                                    name="employee_type" placeholder="employee_type" value={employee_type} onChange={(e) => { setEmployee_type(e.target.value) }} />
                              </CFormGroup>
                     </CCol>
                  
                  </CRow>
               </div>
               <CRow className="mt-2" style={{ justifyContent: 'center' }}>
                     <CCardFooter style={{ width: '25%' }}>

                        <CRow>
                           <CCol xs="6">
                              <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/employeemanagement')}
                              >Cancel</CButton>
                           </CCol>
                           <CCol xs="6">
                              <CButton block color="info" className="mr-1" onClick={submitHandler}
                              >Submit</CButton>
                           </CCol>
                        </CRow>

                     </CCardFooter>
                  </CRow>
            </CCardBody>
         </CCard>
      </>

   )
}

