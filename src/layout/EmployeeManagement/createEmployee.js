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
    CTextarea
} from '@coreui/react'
import { Formik } from "formik"
import EmployeeService from '../../services/employeeService';
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'

const employeeservice = new EmployeeService()

export default function CreateEmployee(props) {
    const history = useHistory();
    
    const [data, setData] = useState({
        active: "", phone_number: "", email_id: "",
        address: "",  employee_name: "", designation: "", employee_id: "",security_pin: "", 
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

    return (
        <div>
        <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
       {alertText}
      </CAlert>
            <Formik
                initialValues={data}
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
                                    <CIcon name="cib-adobe-indesign" className='m-1'/> <b>Employee Id:</b>
                                            <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="employee_id" name="employee_id" placeholder="employee_id" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-user" className='m-1'/> <b>Employee Name:</b>
                                                <CFormGroup>
                                                    <CInput type="text"
                                                        style={{ width: '85%' }} id="employee_name" name="employee_name" placeholder="employee_name" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-location-pin" className='m-1'/><b>Address:</b>
                                            <CFormGroup>
                                                    <CTextarea style={{ width: '85%' }} type="text" id="address" name="address" placeholder="Address" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Designation:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="designation" name="designation" placeholder="Designation" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                </CRow>

                                
                


                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Active:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="active" name="active" placeholder="Active" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-envelope-closed" className='m-1'/> <b>Email:</b>
                                            <CFormGroup>
                                                <CInput style={{ width: '85%' }} type="text" id="email_id" name="email_id" placeholder="Email" onChange={handleChange} />
                                            </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow className="pt-3 pb-2">

                        <CCol xs="12" sm="12" lg="6">
                        <CIcon name="cil-mobile" className='m-1'/> <b>Phone Number:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="phone_number" name="phone_number" placeholder="phone_number" onChange={handleChange} />
                                        </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="12" lg="6">
                            <CIcon name="cil-pin" className='m-1'/><b>Security Pin:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="security_pin" name="security_pin" placeholder="security_pin" onChange={handleChange} />
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
