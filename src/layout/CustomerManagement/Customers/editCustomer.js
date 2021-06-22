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
   CAlert
} from '@coreui/react'
import { useHistory } from "react-router-dom";
import CustomerService from '../../../services/customerService'

const customerSerice = new CustomerService()

export default function EditCustomer(props) {
   const history = useHistory();
   const [item, setItem] = useState(props.location.state)
   const [edit, setEdit] = React.useState(false)
   const [customerName, setCustomerName] = useState("")
   const [contactPerson, setContactPerson] = useState("")
   const [customerCode, setCustomerCode] = useState("")
   const [mobileNo, setMobileNo] = useState("")
   const [email, setEmail] = useState("")
   const [address, setAddress] = useState("")
   const [gstNumber, setGstNumber] = useState("")
   const [alternateNo, setAlternateNo] = useState("")
   const [city, setCity] = useState("")
   const [zip, setZip] = useState("")
   const [state, setState] = useState("")
   const [country, setCountry] = useState("")

   const [alert, setAlert] = useState(false)

   const cancelHandler = () => {
      setEdit(false)
   }

   const getCustomerDetails = async () => {
      const res = await customerSerice.getCustomer(item.client_id)
      setCustomerCode(item.client_id)
      setCustomerName(res.data.company)
      setContactPerson(res.data.contact_person)
      setMobileNo(res.data.phone_number)
      setEmail(res.data.email_id)
      setAddress(res.data.address)
      setGstNumber(res.data.gst_number)
      setAlternateNo(res.data.alternate_phone_number)
      setCity(res.data.city)
      setZip(res.data.pincode)
      setState(res.data.state)
      setCountry(res.data.country)
   }

   const submitHandler = async () => {
      let currentData = { ...item }
      currentData.company = customerName
      currentData.customerName = customerName
      currentData.contact_person = contactPerson
      //currentData.customerCode = customerCode
      currentData.phone_number = mobileNo
      currentData.email_id = email
      currentData.address = address
      currentData.gst_number = gstNumber
      currentData.alternate_phone_number = alternateNo
      currentData.city = city
      currentData.pincode = zip
      currentData.state = state
      currentData.country = country
      console.log(currentData);
      try {
         let res = await customerSerice.updateCustomer(currentData)
         history.push({
            pathname: '/customermanagement',
            state: 'Customer updated'
         })
      } catch (err) {
         setAlert(err.message || 'Error occured Please try again!')
      }
   }

   React.useEffect(() => {
      setItem(props.location.state)
      if (props.location.state) {
         getCustomerDetails()

      }
   }, [])

   return (
      <>
        <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
      {alert}
    </CAlert>
         <CCard>
            <CCardSubtitle className="pl-3 mt-3" style={{ fontSize: '1rem' }}><b>Customer:</b> {item ? item.company : null}</CCardSubtitle>
            <hr />
            <CCardBody>
               <div className="pt-1 pl-3">
                  <CRow className="mb-2">
                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                           <b>Customer Name:</b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="customerName"
                                    name="customerName" placeholder="customerName" value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>

                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                           <b>Customer Code: </b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="customerCode"
                                    name="customerCode" placeholder="customerCode" value={customerCode} readOnly />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>

                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                           <b>Contact Person: </b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="contactPerson"
                                    name="contactPerson" placeholder="contactPerson" value={contactPerson} onChange={(e) => { setContactPerson(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                        <CRow>
                           <b>Contact Number: </b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="mobileNo"
                                    name="mobileNo" placeholder="mobileNo" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>

                     <CCol xs="12" sm="12" lg="6">
                        <CRow>
                           <b>Alternate Number: </b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="alternateNo"
                                    name="alternateNo" placeholder="alternateNo" value={alternateNo} onChange={(e) => { setAlternateNo(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>
          
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                        <CRow>
                           <b>Customer Address: </b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="address"
                                    name="address" placeholder="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>
                 
                     <CCol xs="12" sm="12" lg="6">
                        <CRow>
                           <b>City:</b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="city"
                                    name="city" placeholder="city" value={city} onChange={(e) => { setCity(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>
                
                  </CRow>

          

               <CRow className="pt-3 pb-2">
                  <CCol xs="12" sm="12" lg="4">
                     <CRow>
                        <b>Zip:</b>
                        <CCol>
                        <CFormGroup >
                           <CInput style={{ width: '85%' }} type="text" id="zip"
                              name="zip" placeholder="zip" value={zip} onChange={(e) => { setZip(e.target.value) }} />
                        </CFormGroup>
                        </CCol>
                        </CRow>
                     </CCol>
           
                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                        <b>State:</b>
                        <CCol>
                        <CFormGroup >
                           <CInput style={{ width: '85%' }} type="text" id="state"
                              name="state" placeholder="state" value={state} onChange={(e) => { setState(e.target.value) }} />
                        </CFormGroup>
                        </CCol>
                        </CRow>
                     </CCol>
                     <CCol xs="12" sm="12" lg="4">
                        <CRow>
                        <b>Country: </b>
                        <CCol>
                        <CFormGroup >
                           <CInput style={{ width: '85%' }} type="text" id="country"
                              name="country" placeholder="country" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                        </CFormGroup>
                        </CCol>
                        </CRow>
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                        <CRow>
                           <b>Email:</b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="email"
                                    name="email" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
                     </CCol>
                  <CCol xs="12" sm="12" lg="6">
                        <CRow>
                           <b>GstNumber: </b>
                           <CCol>
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="gstNumber"
                                    name="gstNumber" placeholder="gstNumber" value={gstNumber} onChange={(e) => { setGstNumber(e.target.value) }} />
                              </CFormGroup>
                           </CCol>
                        </CRow>
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

