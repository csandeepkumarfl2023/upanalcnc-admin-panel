import React, { useState } from 'react'
import {
    CCard,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CInput,
    CCardFooter
} from '@coreui/react'
import { Formik } from "formik"
import CustomerService from '../../../services/customerService';
import { useHistory } from "react-router-dom";

const customerservice = new CustomerService()

export default function CreateCustomer() {
    const history = useHistory();

    const [data, setData] = useState({
        customerName: "", customerCode: "", contact_person: "", phone_number: "", email_id: "",
        address: "", gst_number: "", alternate_phone_number: "", city: "", pincode: "", state: "", country: ""
    })

    // const submitHandler = async (value) =>  {
    //     let res = await customerservice.createCustomer(value)
    //     console.log(res);
    //     history.push('./customermanagement')
    // }

    const submitHandler = async (value) => {
        try {
            value.company = 'test'
            value.password = 'welcome'
            let res = await customerservice.createCustomer(value)
            history.push('./customermanagement')
        } catch (err) {
            console.log('err', err)
        }
    }

    const cancelHandler = () => {

    }

    return (
        <div>
            <Formik
                initialValues={data}
                onSubmit={async (values) => {
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (

                    <div >
                        <CCard style={{ padding: '40px', borderColor: 'lightgray' }}>
                            <CRow style={{marginTop: '2%'}}> 
                                <CCol xs="10" sm="3">
                                    <b>Customer Name:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="customerName" className="w-55" name="customerName" placeholder="Customer Name" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="10" sm="3">
                                    <b>Contact Person:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="contact_person" className="w-55" name="contact_person" placeholder="Contact Person" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>Mobile No:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="phone_number" className="w-55" name="phone_number" placeholder="Mobile No" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow style={{marginTop: '2%'}}> 
                                <CCol xs="10" sm="3">
                                    <b>Email:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="email_id" className="w-55" name="email_id" placeholder="Email" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>Address:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="address" className="w-55" name="address" placeholder="Address" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>Gst Number:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="gst_number" className="w-55" name="gst_number" placeholder="Gst Number" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>Alternate No:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="alternate_phone_number" className="w-55" name="alternate_phone_number" placeholder="Alternate No" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>


                            <CRow style={{marginTop: '2%'}}> 
                                <CCol xs="10" sm="3">
                                    <b>City:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="city" className="w-55" name="city" placeholder="City" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>Zip:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="pincode" className="w-55" name="pincode" placeholder="Zip" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>State:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="state" className="w-55" name="state" placeholder="State" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    <b>Country:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="country" className="w-55" name="country" placeholder="Country" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow style={{ justifyContent: 'flex-end', marginTop: '1%' }}>
                                <CCardFooter style={{ width: '25%' }}>

                                    <CRow style={{marginTop: '2%'}}> 
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
                        </CCard>
                    </div>
                )}
            </Formik>

        </div>
    )
}
