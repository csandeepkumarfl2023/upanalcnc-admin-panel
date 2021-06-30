import React, { useState } from 'react'
import {
    CCard,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CCardFooter,
    CAlert,
    CCardSubtitle,
    CCardBody,
    CTextarea,
    CSwitch,
    CInput
} from '@coreui/react'
import { Formik } from "formik"
import EmployeeService from '../../services/employeeService';
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import * as Yup from "yup"
import '../styles.css'
import moment from 'moment'

const employeeservice = new EmployeeService()

export default function CreateEmployee(props) {

    const history = useHistory();
    
    const [data, setData] = useState({
        active: true, phone_number: "", email_id: "",department:"",employee_type:"",
        address: "",  employee_name: "", designation: "", employee_id: "",security_pin: "", date_of_joining: "",date_of_leaving : ""
    })

    const [active, setActive] = useState(true)

    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState(false)

    const submitHandler = async (value) => {
        try {
            console.log(value);
           let res = await employeeservice.createEmployee(value)
           await employeeservice.updateEmployeeActive(value.employee_id, active)
           if(res)
           {
            history.push({
                pathname: './employeemanagement',
                state: 'Employee added successfully!'
            })
          }
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
        console.log('alert>>>>>>', props.location.state);
    }, [])

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0,10);

    return (
        <div>
        <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
       {alertText}
      </CAlert>
            <Formik
              validate={values => {
                let errors = {};
                if (!values.employee_id) {
                  errors.employee_id = "Employee id is required";
                }
                if (!values.employee_name) {
                    errors.employee_name = "Employee name is required";
                  }
                  if (!values.address) {
                    errors.address = "Address is required";
                  }
                  if (!values.designation) {
                    errors.designation = "Designation is required";
                  }
                  if (!values.email_id) {
                    errors.email_id = "Email is required";
                  }
                  if (!values.phone_number) {
                    errors.phone_number = "Phone Number is required";
                  }
                  if (!values.security_pin) {
                    errors.security_pin = "Security Pin is required";
                  }
                  if (!values.department) {
                    errors.department = "Department is required";
                  }
                 
                  if (!values.date_of_leaving) {
                    errors.date_of_leaving = "Date of leaving is required";
                  }
                  if (!values.employee_type) {
                    errors.employee_type = "Employee Type is required";
                  }
                return errors;
              }}
              
                initialValues={data}
                onSubmit={async (values) => {
                  console.log('values from employee',values);
                  values.date_of_joining =  moment(new Date(values.date_of_joining)).format('YYYY-MM-DD HH:mm:ss') 
                  values.date_of_leaving =  moment(new Date(values.date_of_leaving)).format('YYYY-MM-DD HH:mm:ss') 
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (


                    <CCard >
                        <CCardSubtitle className="pl-3 mt-3" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Create Employee</CCardSubtitle>
                        {/* <hr /> */}
                        <CCardBody>
                            <div className="pt-3 pl-3">        
                                <CRow className="pt-3 pb-2" >
                                    <CCol xs="12" sm="12" lg="6">  
                                    <CIcon name="cib-adobe-indesign" className='m-2'/>   <b>Employee Id:</b>
                                                    <CInput style={{ width: '85%' }} type="text" id="employee_id" name="employee_id" placeholder="employee_id" 
                                                    onChange={handleChange}  className={errors.employee_id && touched.employee_id && "error"}/>
                                               
                                                {errors.employee_id && touched.employee_id && 
                                       <div className="input-feedback">{errors.employee_id}</div>}
                                    </CCol>
                                   

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-user" className='m-2'/> <b>Employee Name:</b>
                                                <CFormGroup>
                                                    <CInput type="text"
                                                        style={{ width: '85%' }} id="employee_name" name="employee_name" placeholder="employee_name" 
                                                        onChange={handleChange} className={errors.employee_name && touched.employee_name && "error"}/>
                                                </CFormGroup>
                                                {errors.employee_name && touched.employee_name && 
                                      <div className="input-feedback">{errors.employee_name}</div>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2 pl-10">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-location-pin" className='m-2'/><b>Address:</b>
                                            <CFormGroup>
                                                    <CTextarea style={{ width: '85%' }} type="text" id="address" name="address" placeholder="Address" 
                                                    onChange={handleChange} className={errors.address && touched.address && "error"}/>
                                                </CFormGroup>
                                                {errors.address && touched.address && 
                                      <div className="input-feedback">{errors.address}</div>}
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-pen-alt" className='m-2'/><b>Designation:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="designation" name="designation" placeholder="Designation" 
                                                    onChange={handleChange} className={errors.designation && touched.designation && "error"}/>
                                                </CFormGroup>
                                                {errors.designation && touched.designation && 
                                      <div className="input-feedback">{errors.designation}</div>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2"> 
                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-envelope-closed" className='m-2'/> <b>Email:</b>
                                            <CFormGroup>
                                                <CInput style={{ width: '85%' }} type="text" id="email_id" name="email_id" placeholder="Email"
                                                 onChange={handleChange} className={errors.email_id && touched.email_id && "error"}/>
                                            </CFormGroup>
                                            {errors.email_id && touched.email_id && 
                                      <div className="input-feedback">{errors.email_id}</div>}
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                               <CIcon name="cil-mobile" className='m-2'/> <b>Phone Number:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="phone_number" name="phone_number" placeholder="phone_number" 
                                                onChange={handleChange} className={errors.phone_number && touched.phone_number && "error"}/>
                                        </CFormGroup>
                                        {errors.phone_number && touched.phone_number && 
                                      <div className="input-feedback">{errors.phone_number}</div>}
                            </CCol>
                                </CRow>
                                <CRow className="pt-3 pb-2">

                        
                            <CCol xs="12" sm="12" lg="6">
                            <CIcon name="cil-pin" className='m-2'/><b>Security Pin:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="security_pin" name="security_pin" placeholder="security_pin" 
                                                onChange={handleChange} className={errors.security_pin && touched.security_pin && "error"}/>
                                        </CFormGroup>
                                        {errors.security_pin && touched.security_pin && 
                                      <div className="input-feedback">{errors.security_pin}</div>}
                            </CCol>
                            <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-briefcase" className='m-2'/> <b>Department:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="department" name="department" placeholder="department" 
                                                onChange={handleChange} className={errors.department && touched.department && "error"}/>
                                        </CFormGroup>
                                        {errors.department && touched.department && 
                                      <div className="input-feedback">{errors.department}</div>}
                            </CCol>
                        </CRow>

                        <CRow className="pt-3 pb-2">
                        <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-calendar" className='m-2'/> <b>Date Of Joining:</b>
                           <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="date" id="date_of_joining"
                                       size="sm"
                                       name="date_of_joining" placeholder="date_of_joining" 
                                       onChange={handleChange} defaultValue={date} />
                                 </CFormGroup>
                                
                            </CCol>
                            <CCol xs="12" sm="12" lg="6">
                            <CIcon name="cil-calendar" className='m-2'/><b>Date Of Leaving:</b>
                                        <CFormGroup>
                                        <CInput style={{ width: '85%' }} type="date" id="date_of_leaving"
                                       size="sm"
                                       name="date_of_leaving" placeholder="date_of_leaving" 
                                       onChange={handleChange} />
                                        </CFormGroup>
                                        {/* {errors.date_of_leaving && touched.date_of_leaving && 
                                      <div className="input-feedback">{errors.date_of_leaving}</div>} */}
                            </CCol>
                        </CRow>
                        <CRow className="pt-3 pb-2">
                        
                        <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-voice-over-record" className='m-2'/><b>Employee Type:</b>
                                    <CFormGroup>
                                        <CInput type="text"
                                            style={{ width: '85%' }} id="employee_type" name="employee_type" placeholder="employee_type" 
                                            onChange={handleChange} className={errors.employee_type && touched.employee_type && "error"}/>
                                    </CFormGroup>
                                    {errors.employee_type && touched.employee_type && 
                                      <div className="input-feedback">{errors.employee_type}</div>}
                        </CCol>
                        <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-calendar-check" className='m-2'/><b>Active:</b>
                                                <CFormGroup>
                                                <CCol sm="9">
                                                <CSwitch
                                                className="mr-1"
                                                color="primary"
                                                checked={active ? true : false}
                                                onChange={(e) => activeHandler(e.target.checked)}
                                                />                            
                                      </CCol>
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
                                            <CButton block color="info" className="mr-1" onClick={handleSubmit}
                                            >Submit</CButton>
                                        </CCol>
                                    </CRow>

                                </CCardFooter>
                            </CRow>
                        </CCardBody>
                    </CCard>

                )}
            </Formik>

        </div>
    )
}
