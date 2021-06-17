import React, { useState } from 'react'
import {
    CCard,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CInput,
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
    return (
        <div>
            <Formik
                initialValues={data}
                onSubmit={async (values) => {
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (

                    <div >
                        <CCard style={{ padding: '40px', borderColor: 'lightgray' }}>
                            <CRow>
                                <CCol xs="10" sm="3">
                                    Customer Name:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="customerName" className="w-55" name="customerName" placeholder="Customer Name" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="10" sm="3">
                                    Contact Person:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="contact_person" className="w-55" name="contact_person" placeholder="Contact Person" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    Mobile No:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="phone_number" className="w-55" name="phone_number" placeholder="Mobile No" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="10" sm="3">
                                    Email:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="email_id" className="w-55" name="email_id" placeholder="Email" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    Address:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="address" className="w-55" name="address" placeholder="Address" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    Gst Number:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="gst_number" className="w-55" name="gst_number" placeholder="Gst Number" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    Alternate No:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="alternate_phone_number" className="w-55" name="alternate_phone_number" placeholder="Alternate No" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>


                            <CRow>
                                <CCol xs="10" sm="3">
                                    City:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="city" className="w-55" name="city" placeholder="City" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    Zip:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="pincode" className="w-55" name="pincode" placeholder="Zip" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    State:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="state" className="w-55" name="state" placeholder="State" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="3">
                                    Country:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="country" className="w-55" name="country" placeholder="Country" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CCol xs="10" sm="4">
                                <CButton block color="info" className="w-25" style={{ marginRight: '0%', marginLeft: '250%' }} onClick={handleSubmit}>Submit</CButton>
                            </CCol>
                        </CCard>
                    </div>
                )}
            </Formik>

        </div>
    )
}
