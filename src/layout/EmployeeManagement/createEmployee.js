import React, { useState } from 'react'
import {
    CCard,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CInput,
    CCardFooter,
    CAlert,
    CCardSubtitle,
    CCardBody,
    CTextarea,
    CSwitch
} from '@coreui/react'
import { Formik } from "formik"
import EmployeeService from '../../services/employeeService';
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import * as Yup from "yup"

const employeeservice = new EmployeeService()

export default function CreateEmployee(props) {

    const validationSchema = Yup.object({
        employee_id: Yup.string().required("Employee id is required"),
        employee_name:  Yup.string().required("Employee name is required"),
        phone_number: Yup.string().required("Phone Number is required"),
        address: Yup.string().required("Address is required"), 
        designation: Yup.string().required("Designation is required"), 
        security_pin: Yup.string().required("Security Pin is required"), 
        date_of_joining: Yup.string().required("Date Of Joining is required"), 
        date_of_leaving: Yup.string().required("Date Of Leaving is required"), 
        employee_type: Yup.string().required("Employee Type is required"), 
        email_id:  Yup.string().required("Email is required"), 
        department: Yup.string().required("Department is required"),
      })

    const history = useHistory();
    
    const [data, setData] = useState({
        active: true, phone_number: "", email_id: "",department:"",employee_type:"",
        address: "",  employee_name: "", designation: "", employee_id: "",security_pin: "", date_of_joining: "",date_of_leaving : ""
    })

    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState(false)

    const submitHandler = async (value) => {
        try {
            console.log(value);

           let res = await employeeservice.createEmployee(value)
            history.push({
                pathname: './employeemanagement',
                state: 'Employee added successfully!'
            })
        } catch (err) {
            setAlertText(err.message || 'Error occured Please try again!')
            setAlert(true)
        }
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
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (


                    <CCard>
                        <CCardSubtitle className="pl-3 mt-3" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Create Employee</CCardSubtitle>
                        {/* <hr /> */}
                        <CCardBody>
                            <div className="pt-3 pl-3">        
                                <CRow className="pt-3 pb-2">
                                
                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cib-adobe-indesign" className='m-2'/> <b>Employee Id:</b>
                                            <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="employee_id" name="employee_id" placeholder="employee_id" onChange={handleChange} />
                                                </CFormGroup>
                                                {errors.employee_id && touched.employee_id && 
                                      <p style={{fontSize: 13, color: 'red'}} >{errors.employee_id}</p>}
                                    </CCol>
                                   

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-user" className='m-2'/> <b>Employee Name:</b>
                                                <CFormGroup>
                                                    <CInput type="text"
                                                        style={{ width: '85%' }} id="employee_name" name="employee_name" placeholder="employee_name" onChange={handleChange} />
                                                </CFormGroup>
                                                {errors.employee_name && touched.employee_name && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.employee_name}</p>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-location-pin" className='m-2'/><b>Address:</b>
                                            <CFormGroup>
                                                    <CTextarea style={{ width: '85%' }} type="text" id="address" name="address" placeholder="Address" onChange={handleChange} />
                                                </CFormGroup>
                                                {errors.address && touched.address && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.address}</p>}
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-pen-alt" className='m-2'/><b>Designation:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="designation" name="designation" placeholder="Designation" onChange={handleChange} />
                                                </CFormGroup>
                                                {errors.designation && touched.designation && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.designation}</p>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2"> 
                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-envelope-closed" className='m-2'/> <b>Email:</b>
                                            <CFormGroup>
                                                <CInput style={{ width: '85%' }} type="text" id="email_id" name="email_id" placeholder="Email" onChange={handleChange} />
                                            </CFormGroup>
                                            {errors.email_id && touched.email_id && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.email_id}</p>}
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                               <CIcon name="cil-mobile" className='m-2'/> <b>Phone Number:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="phone_number" name="phone_number" placeholder="phone_number" onChange={handleChange} />
                                        </CFormGroup>
                                        {errors.phone_number && touched.phone_number && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.phone_number}</p>}
                            </CCol>
                                </CRow>
                                <CRow className="pt-3 pb-2">

                        
                            <CCol xs="12" sm="12" lg="6">
                            <CIcon name="cil-pin" className='m-2'/><b>Security Pin:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="security_pin" name="security_pin" placeholder="security_pin" onChange={handleChange} />
                                        </CFormGroup>
                                        {errors.security_pin && touched.security_pin && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.security_pin}</p>}
                            </CCol>
                            <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-briefcase" className='m-2'/> <b>Department:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="department" name="department" placeholder="department" onChange={handleChange} />
                                        </CFormGroup>
                                        {errors.department && touched.department && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.department}</p>}
                            </CCol>
                        </CRow>

                        <CRow className="pt-3 pb-2">
                        <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-calendar" className='m-2'/> <b>Date Of Joining:</b>
                           <CFormGroup >
                                    <CInput style={{ width: '85%' }} type="date" id="date_of_joining"
                                       size="sm"
                                       name="date_of_joining" placeholder="date_of_joining" onChange={handleChange} defaultValue={date}/>
                                 </CFormGroup>
                                 {errors.date_of_joining && touched.date_of_joining && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.date_of_joining}</p>}
                            </CCol>
                            <CCol xs="12" sm="12" lg="6">
                            <CIcon name="cil-calendar" className='m-2'/><b>Date Of Leaving:</b>
                                        <CFormGroup>
                                        <CInput style={{ width: '85%' }} type="date" id="date_of_leaving"
                                       size="sm"
                                       name="date_of_leaving" placeholder="date_of_leaving" onChange={handleChange} />
                                        </CFormGroup>
                                        {errors.date_of_leaving && touched.date_of_leaving && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.date_of_leaving}</p>}
                            </CCol>
                        </CRow>
                        <CRow className="pt-3 pb-2">
                        
                        <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-voice-over-record" className='m-2'/><b>Employee Type:</b>
                                    <CFormGroup>
                                        <CInput type="text"
                                            style={{ width: '85%' }} id="employee_type" name="employee_type" placeholder="employee_type" onChange={handleChange} />
                                    </CFormGroup>
                                    {errors.employee_type && touched.employee_type && 
                                      <p style={{fontSize: 13, color: 'red'}}>{errors.employee_type}</p>}
                        </CCol>
                        <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-calendar-check" className='m-2'/><b>Active:</b>
                                                <CFormGroup>
                                                <CCol sm="9">
                                                <CSwitch
                                                className="mr-1"
                                                color="primary"
                                                defaultChecked
                                                onChange={(data.active)}
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
