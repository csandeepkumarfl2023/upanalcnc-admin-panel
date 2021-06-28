import React, { useState } from 'react'
import {
    CCard,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    input,
    CCardFooter,
    CAlert,
    CCardSubtitle,
    CCardBody,
    CTextarea
} from '@coreui/react'
import { Formik } from "formik"
import CustomerService from '../../../services/customerService';
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import '../../styles.css'

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
             validate={values => {
                let errors = {};
                if (!values.customerName) {
                  errors.customerName = "Customer Name is required";
                }
                if (!values.contact_person) {
                    errors.contact_person = "Contact Person is required";
                  }
                  if (!values.phone_number) {
                    errors.phone_number = "Phone Number is required";
                  }
                  if (!values.alternate_phone_number) {
                    errors.alternate_phone_number = "Alternate Phone Number is required";
                  }
                  if (!values.address) {
                    errors.address = "Address is required";
                  }
                  if (!values.city) {
                    errors.city = "City is required";
                  }
                  if (!values.pincode) {
                    errors.pincode = "Pincode is required";
                  }
                  if (!values.state) {
                    errors.state = "State is required";
                  }
                  if (!values.country) {
                    errors.country = "Country is required";
                  }
                  if (!values.email_id) {
                    errors.email_id = "Email is required";
                  }
                  if (!values.gst_number) {
                    errors.gst_number = "Gst Number is required";
                  }
                return errors;
              }}
              
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
                                    <CIcon name="cil-user" className='m-2'/><b>Customer Name:</b>
                                    <CFormGroup>
                                        <input type="text"
                                            style={{ width: '85%' }}
                                            id="customerName" name="customerName" placeholder="Customer Name" onChange={handleChange} 
                                             className={errors.customerName && touched.customerName && "error"}/>
                                    </CFormGroup>
                                    {errors.customerName && touched.customerName && 
                                       <div className="input-feedback">{errors.customerName}</div>}
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-contact" className='m-2'/><b>Contact Person:</b>
                                        <CFormGroup>
                                            <input type="text"
                                                style={{ width: '85%' }} id="contact_person" name="contact_person" placeholder="Contact Person" onChange={handleChange}  className={errors.contact_person && touched.contact_person && "error"}/>
                                        </CFormGroup>
                                        {errors.contact_person && touched.contact_person && 
                                       <div className="input-feedback">{errors.contact_person}</div>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-mobile" className='m-2'/> <b>Mobile No:</b>
                                                <CFormGroup>
                                                    <input type="text"
                                                        style={{ width: '85%' }} id="phone_number" name="phone_number" placeholder="Mobile No" onChange={handleChange} className={errors.phone_number && touched.phone_number && "error"}/>
                                                </CFormGroup>
                                                {errors.phone_number && touched.phone_number && 
                                       <div className="input-feedback">{errors.phone_number}</div>}
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-mobile" className='m-2'/> <b>Alternate No:</b>
                                                <CFormGroup>
                                                    <input type="text"
                                                        style={{ width: '85%' }} id="alternate_phone_number" name="alternate_phone_number" placeholder="Alternate No" onChange={handleChange}
                                                         className={errors.phone_number && touched.phone_number && "error"}/>
                                                </CFormGroup>
                                                {errors.alternate_phone_number && touched.alternate_phone_number && 
                                       <div className="input-feedback">{errors.alternate_phone_number}</div>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-location-pin" className='m-2'/><b>Address:</b>
                                            <CFormGroup>
                                                    <CTextarea style={{ width: '85%' }} type="text" id="address" name="address" placeholder="Address" onChange={handleChange} 
                                                     className={errors.address && touched.address && "error"}/>
                                                </CFormGroup>
                                                {errors.address && touched.address && 
                                       <div className="input-feedback">{errors.address}</div>}
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-audio" className='m-2'/> <b>City:</b>
                                                <CFormGroup>
                                                    <input style={{ width: '85%' }} type="text" id="city" name="city" placeholder="City" onChange={handleChange} />
                                                </CFormGroup>
                                                {errors.city && touched.city && 
                                       <div className="input-feedback">{errors.city}</div>}
                                    </CCol>
                                </CRow>

                                
                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-pin" className='m-2'/> <b>Zip:</b>
                                            <CFormGroup>
                                                    <input style={{ width: '85%' }} type="text" id="pincode" name="pincode" placeholder="Zip" onChange={handleChange}
                                                    className={errors.pincode && touched.pincode && "error"} />
                                                </CFormGroup>
                                                {errors.pincode && touched.pincode && 
                                       <div className="input-feedback">{errors.pincode}</div>}
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-bank" className='m-2'/> <b>State:</b>
                                                <CFormGroup>
                                                    <input style={{ width: '85%' }} type="text" id="state" name="state" placeholder="State" onChange={handleChange} 
                                                    className={errors.state && touched.state && "error"}/>
                                                </CFormGroup>
                                                {errors.state && touched.state && 
                                       <div className="input-feedback">{errors.state}</div>}
                                    </CCol>
                                </CRow>


                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-flag-alt" className='m-2'/> <b>Country:</b>
                                                <CFormGroup>
                                                    <input style={{ width: '85%' }} type="text" id="country" name="country" placeholder="Country" onChange={handleChange} 
                                                     className={errors.country && touched.country && "error"}/>
                                                </CFormGroup>
                                                {errors.country && touched.country && 
                                       <div className="input-feedback">{errors.country}</div>}
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-envelope-closed" className="mb-2 m-2"/><b>Email:</b>
                                            <CFormGroup>
                                                <input style={{ width: '85%' }} type="text" id="email_id" name="email_id" placeholder="Email" onChange={handleChange} 
                                                 className={errors.email_id && touched.email_id && "error"}/>
                                            </CFormGroup>
                                            {errors.email_id && touched.email_id && 
                                       <div className="input-feedback">{errors.email_id}</div>}
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">

                                    <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-notes" className='m-2'/> <b>Gst Number:</b>
                                                <CFormGroup>
                                                    <input style={{ width: '85%' }} type="text" id="gst_number" name="gst_number" placeholder="Gst Number" onChange={handleChange} 
                                                    className={errors.gst_number && touched.gst_number && "error"}/>
                                                </CFormGroup>
                                                {errors.gst_number && touched.gst_number && 
                                       <div className="input-feedback">{errors.gst_number}</div>}
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
