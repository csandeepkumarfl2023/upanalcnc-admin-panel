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
import CustomerService from '../../../services/customerService';
import { useHistory } from "react-router-dom";

const customerservice = new CustomerService()

export default function CreateCustomer(props) {
    const history = useHistory();

    const [data, setData] = useState({
        customerName: "", contact_person: "", phone_number: "", email_id: "",
        address: "", gst_number: "", alternate_phone_number: "", city: "", pincode: "", state: "", country: ""
    })

    const [alert, setAlert] = useState(false)

    const submitHandler = async (value) => {
        try {
            value.company = value.customerName
            value.password = 'welcome'
            let res = await customerservice.createCustomer(value)
            history.push({
                pathname: './customermanagement',
                state: 'Customer added'
            })
        } catch (err) {
            setAlert(err.message || 'Error occured Please try again!')
        }
    }

    React.useEffect(() => {
        console.log('alert>>>>>>', props.location.state);
    }, [])

    return (
        <div>
        <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
       {alert}
      </CAlert>
            <Formik
                initialValues={data}
                onSubmit={async (values) => {
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (


                    <CCard>
                        <CCardSubtitle className="pl-3 mt-3" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Create Customer</CCardSubtitle>
                        {/* <hr /> */}
                        <CCardBody>
                            <div className="pt-3 pl-3">
                                <CRow className="mb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Customer Name:</b>
                                    <CFormGroup>
                                        <CInput type="text"
                                            style={{ width: '85%' }}
                                            id="customerName" name="customerName" placeholder="Customer Name" onChange={handleChange} />
                                    </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                        <b>Contact Person:</b>
                                        <CFormGroup>
                                            <CInput type="text"
                                                style={{ width: '85%' }} id="contact_person" name="contact_person" placeholder="Contact Person" onChange={handleChange} />
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Mobile No:</b>
                                                <CFormGroup>
                                                    <CInput type="text"
                                                        style={{ width: '85%' }} id="phone_number" name="phone_number" placeholder="Mobile No" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Alternate No:</b>
                                                <CFormGroup>
                                                    <CInput type="text"
                                                        style={{ width: '85%' }} id="alternate_phone_number" name="alternate_phone_number" placeholder="Alternate No" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Address:</b>
                                            <CFormGroup>
                                                    <CTextarea style={{ width: '85%' }} type="text" id="address" name="address" placeholder="Address" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>City:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="city" name="city" placeholder="City" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                </CRow>

                                
                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Zip:</b>
                                            <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="pincode" name="pincode" placeholder="Zip" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>State:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="state" name="state" placeholder="State" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                </CRow>


                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Country:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="country" name="country" placeholder="Country" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Email:</b>
                                            <CFormGroup>
                                                <CInput style={{ width: '85%' }} type="text" id="email_id" name="email_id" placeholder="Email" onChange={handleChange} />
                                            </CFormGroup>
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <b>Gst Number:</b>
                                                <CFormGroup>
                                                    <CInput style={{ width: '85%' }} type="text" id="gst_number" name="gst_number" placeholder="Gst Number" onChange={handleChange} />
                                                </CFormGroup>
                                    </CCol>
                                </CRow>
                            </div>
                            <CRow className="mt-2" style={{ justifyContent: 'center' }}>
                                <CCardFooter style={{ width: '25%' }}>

                                    <CRow>
                                        <CCol xs="6">
                                            <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/customermanagement')}
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
