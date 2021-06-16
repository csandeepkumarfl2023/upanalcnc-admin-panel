import React,{useState} from 'react'
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
 } from '@coreui/react'
 import { Formik } from "formik"
 import CustomerService from '../../../services/customerService';
 import { useHistory } from "react-router-dom";

 const customerservice = new CustomerService()

export default function CreateCustomer() {
    const history = useHistory();

    const [data, setData] = useState({ customerName: "", customerCode: "", contactPerson: "", mobileNo: "", email: "" ,
    address:"", gstNumber: "", alternateNo: "", city: "", zip: "", state: "",country: ""})

    const submitHandler = async (value) =>  {
        let res = await customerservice.createCustomer(value)
        console.log(res);
        history.push('./customermanagement')
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
                        <CInput type="text" id="customerName" className="w-55" name="customerName" placeholder="Customer Name" onChange={handleChange}/>
                            </CFormGroup>
                            </CCol>
                        
                        <CCol xs="10" sm="3">
                        Contact Person: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="contactPerson" className="w-55" name="contactPerson" placeholder="Contact Person" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                         Mobile No: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="mobileNo" className="w-55" name="mobileNo" placeholder="Mobile No" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        </CRow>   
   
                    <CRow>
                    <CCol xs="10" sm="3">
                         Email: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="email" className="w-55" name="email" placeholder="Email" onChange={handleChange}/>
                            </CFormGroup>
                            </CCol>
                        <CCol xs="10" sm="3">
                        Address: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="address" className="w-55" name="address" placeholder="Address" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        Gst Number: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="gstNumber" className="w-55" name="gstNumber" placeholder="Gst Number" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        Alternate No: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="alternateNo" className="w-55" name="alternateNo" placeholder="Alternate No" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        </CRow>   

                        
                    <CRow>
                    <CCol xs="10" sm="3">
                         City: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="city" className="w-55" name="city" placeholder="City" onChange={handleChange}/>
                            </CFormGroup>
                            </CCol>
                        <CCol xs="10" sm="3">
                        Zip: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="zip" className="w-55" name="zip" placeholder="Zip" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        State: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="state" className="w-55" name="state" placeholder="State" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        Country: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="country" className="w-55" name="country" placeholder="Country" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        </CRow>  
                        <CCol xs="10" sm="4">
                        <CButton block color="info" className="w-25" style={{marginRight:'0%',marginLeft:'250%'}} onClick={handleSubmit}>Submit</CButton> 
                        </CCol>
                    </CCard>
                </div>
            )}
        </Formik>
        
        </div>
    )
}
