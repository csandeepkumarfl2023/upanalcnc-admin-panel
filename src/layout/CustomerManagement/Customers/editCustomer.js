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
         console.log(err.message)
         setAlert(true)
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
      Error occured Please try again!
    </CAlert>
      <CCard>
         <CCardHeader>
            <CRow>
               <CCol xs="6" md="11">
                  <CCardSubtitle style={{ marginTop: '1%' }}>Customer: {item ? item.company : null}</CCardSubtitle>
               </CCol>
               <CCol xs="6" md="1">
                  {/* <CIcon name="cil-pen" size="1xl" onClick={() => setEdit(true)} /> */}
               </CCol>
            </CRow>
         </CCardHeader>
         <CCardBody>
            <CRow style={{ marginLeft: '2%', marginTop: '1%' }}>
               <CCol xs="12" md="4">
                  <b>Customer Name:</b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="customerName" className="w-50"
                        name="customerName" placeholder="customerName" value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" md="4">
                  <b>Customer Code: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="customerCode" className="w-50"
                        name="customerCode" placeholder="customerCode" value={customerCode} readOnly />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" lg="4">
                  <b>Contact Person Name: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="contactPerson" className="w-50"
                        name="contactPerson" placeholder="contactPerson" value={contactPerson} onChange={(e) => { setContactPerson(e.target.value) }} />
                  </CFormGroup>

               </CCol>
            </CRow>

            <CRow style={{ marginLeft: '2%', marginTop: '1%' }}>


               <CCol xs="12" lg="4">
                  <b>Contact Number: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="mobileNo" className="w-50"
                        name="mobileNo" placeholder="mobileNo" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} />
                  </CFormGroup>

               </CCol>
               <CCol xs="12" lg="4">
                  <b>Alternate Number: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="alternateNo" className="w-50"
                        name="alternateNo" placeholder="alternateNo" value={alternateNo} onChange={(e) => { setAlternateNo(e.target.value) }} />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" lg="4">
                  <b>Customer Address: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="address" className="w-50"
                        name="address" placeholder="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                  </CFormGroup>
               </CCol>
            </CRow>

            <CRow style={{ marginLeft: '2%', marginTop: '1%' }}>

               <CCol xs="12" lg="4">
                  <b>Email:</b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="email" className="w-50"
                        name="email" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" lg="4">
                  <b>GstNumber: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="gstNumber" className="w-50"
                        name="gstNumber" placeholder="gstNumber" value={gstNumber} onChange={(e) => { setGstNumber(e.target.value) }} />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" lg="4">
                  <b>City:</b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="city" className="w-50"
                        name="city" placeholder="city" value={city} onChange={(e) => { setCity(e.target.value) }} />
                  </CFormGroup>
               </CCol>
            </CRow>

            <CRow style={{ marginLeft: '2%', marginTop: '1%' }}>

               <CCol xs="12" lg="4">
                  <b>Zip:</b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="zip" className="w-50"
                        name="zip" placeholder="zip" value={zip} onChange={(e) => { setZip(e.target.value) }} />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" lg="4">
                  <b>State:</b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="state" className="w-50"
                        name="state" placeholder="state" value={state} onChange={(e) => { setState(e.target.value) }} />
                  </CFormGroup>
               </CCol>
               <CCol xs="12" lg="4">
                  <b>Country: </b>
                  <CFormGroup >
                     <CInput style={{ marginTop: '10px' }} type="text" id="country" className="w-50"
                        name="country" placeholder="country" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                  </CFormGroup>
               </CCol>
            </CRow>





            <CRow style={{ justifyContent: 'flex-end' }}>
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

