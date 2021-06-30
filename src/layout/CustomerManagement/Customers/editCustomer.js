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
   CAlert,
   CTextarea
} from '@coreui/react'
import { useHistory } from "react-router-dom";
import CustomerService from '../../../services/customerService'
import CIcon from '@coreui/icons-react'
import { Formik } from "formik"
import '../../styles.css'

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
    <Formik
                initialValues={item}
                onSubmit={async (values) => {
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values, errors, touched, resetForm }) => (

         <CCard>
             <CRow className="pl-3 mt-3" >
               <CCol xs="6" md="11">
               <CCardSubtitle style={{ fontSize: '1rem' }}><b>Customer:</b> {item ? item.company : null}</CCardSubtitle>
               </CCol>
            <CCol xs="6" md="1">
                  <CIcon name="cil-pen" size="lg" style={{ cursor: 'pointer' }} onClick={() => {setEdit(true)}}>
                  </CIcon>
                  </CCol>
                  </CRow>
            <hr />
            <CCardBody>
               <div className="pt-1 pl-3">
                  <CRow className="mb-2">
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-user" className='m-1'/><b>Customer Name:</b>
                     {edit ?
                           <CFormGroup >
                           <CInput type="text"
                                            style={{ width: '85%' }}
                                            id="customerName" name="customerName" placeholder="Customer Name" value = {customerName} onChange={(e) => setCustomerName(e.target.value)} 
                                             className={!customerName && "error"}/>
                                    </CFormGroup>
                                    : customerName}
                                    {/* {!customerName && 
                                       <div className="input-feedback">Customer Name required</div>} */}
                                    </CCol>

                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-asterisk-circle" /> <b>Customer Code: </b>
                     {edit ?
                           <CFormGroup >
                              <CInput style={{ width: '85%' }} type="text" id="customerCode"
                                 name="customerCode" placeholder="customerCode" value={customerCode} readOnly />
                           </CFormGroup> 
                           : customerCode }                  
                     </CCol>

                  </CRow>

                  <CRow className="pt-3 pb-2">
                     
                  <CCol xs="12" sm="12" lg="6">
                  <CIcon name="cil-contact" className='m-1'/>  <b>Contact Person: </b> 
                  { edit ?
                              <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="contactPerson"
                                    name="contactPerson" placeholder="contactPerson" value={contactPerson} 
                                    onChange={(e) => { setContactPerson(e.target.value) }} className={!contactPerson && "error"}/>
                              </CFormGroup>
                          : null }
                              {/* {!contactPerson && 
                                       <div className="input-feedback" >Contact Person is required</div>}   */}
                     </CCol>
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-screen-smartphone" /> <b>Contact Number: </b>
                     {edit ?
                              <CFormGroup >
                             <CInput style={{ width: '85%' }} type="text" id="mobileNo"
                                    name="mobileNo" placeholder="mobileNo" value={mobileNo} 
                                    onChange={(e) => { setMobileNo(e.target.value) }} className={!mobileNo && "error"}/>
                              </CFormGroup>
                              : mobileNo}
                              {/* {!mobileNo && 
                             <div className="input-feedback">Mobile No is required</div>}   */}
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">

                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-screen-smartphone" />  <b>Alternate Number: </b>
                     { edit ?
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="alternateNo"
                                    name="alternateNo" placeholder="alternateNo" value={alternateNo} 
                                    onChange={(e) => { setAlternateNo(e.target.value) }} className={!alternateNo && "error"}/>
                           </CFormGroup>
                           : alternateNo }
                           {/* {!alternateNo && 
                                       <div className="input-feedback" >Alternate No is required</div>}   */}
                     </CCol>
          
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-location-pin" className='m-1'/> <b>Customer Address: </b>
                     { edit ?
                           <CFormGroup >
                                 <CTextarea style={{ width: '85%' }} type="text" id="address"
                                    name="address" placeholder="address" value={address} 
                                    onChange={(e) => { setAddress(e.target.value) }} className={!address && "error"}/>
                              </CFormGroup>
                              : address }
                              {/* {!address && 
                                       <div className="input-feedback" style={{color:'red'}}>Address is required</div>}  */}
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                 
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-audio" className='m-1'/><b>City:</b>
                     { edit ?
                           <CFormGroup >
                              <CInput style={{ width: '85%' }} type="text" id="city"
                                 name="city" placeholder="city" value={city} 
                                 onChange={(e) => {setCity(e.target.value) }} className={!city && "error"}/>
                           </CFormGroup>
                           : city }
                           {/* {!city && 
                                       <div className="input-feedback" style={{color:'red'}}>City is required</div>}  */}
                     </CCol>
                
                  <CCol xs="12" sm="12" lg="6">
                  <CIcon name="cil-pin" className='m-1'/> <b>Zip:</b>
                  {edit ?
                        <CFormGroup >
                           <CInput style={{ width: '85%' }} type="text" id="zip"
                              name="zip" placeholder="zip" value={zip} 
                              onChange={(e) => {setZip(e.target.value) }} className={!zip && "error"}/>
                        </CFormGroup>
                        : zip }
                        {/* {!zip && 
                         <div className="input-feedback" style={{color:'red'}}>Zip is required</div>}  */}
                     </CCol>
                  </CRow>

          

               <CRow className="pt-3 pb-2">
           
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-bank" className='m-1'/><b>State:</b>
                     { edit ?
                        <CFormGroup >
                           <CInput style={{ width: '85%' }} type="text" id="state"
                              name="state" placeholder="state" value={state} 
                              onChange={(e) => { setState(e.target.value) }} className={!state && "error"}/>
                        </CFormGroup>
                        : state }
                        {/* {!state && 
                         <div className="input-feedback" >State is required</div>}  */}
                     </CCol>
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-flag-alt" className='m-1'/> <b>Country: </b>
                     { edit ?
                        <CFormGroup >
                           <CInput style={{ width: '85%' }} type="text" id="country"
                              name="country" placeholder="country" value={country}
                               onChange={(e) => {setCountry(e.target.value) }} className={!country && "error"}/>
                        </CFormGroup>
                        : country }
                        {/* {!country && 
                        <div className="input-feedback">Country is required</div>}  */}
                     </CCol>
                  </CRow>

                  <CRow className="pt-3 pb-2">
                     <CCol xs="12" sm="12" lg="6">
                     <CIcon name="cil-envelope-closed" className='m-1'/><b>Email:</b>
                     { edit ?
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="email"
                                    name="email" placeholder="email" value={email} 
                                    onChange={(e) => { setEmail(e.target.value) }} className={!email && "error"}/>
                              </CFormGroup>
                              : email }
                              {/* {!email && 
                               <div className="input-feedback" >Email is required</div>}  */}
                     </CCol>
                  <CCol xs="12" sm="12" lg="6">
                  <CIcon name="cil-notes" className='m-1'/><b>GstNumber: </b>
                  { edit ?
                           <CFormGroup >
                                 <CInput style={{ width: '85%' }} type="text" id="gstNumber"
                                    name="gstNumber" placeholder="gstNumber" value={gstNumber} 
                                    onChange={(e) => { setGstNumber(e.target.value) }} className={!gstNumber && "error"}/>
                           </CFormGroup>  
                              : gstNumber } 
                            
                     </CCol>
                  </CRow>
               </div>
               <CRow className="mt-2" style={{ justifyContent: 'center' }}>
               {edit ?
                     <CCardFooter style={{ width: '25%' }}>

                        <CRow>
                           <CCol xs="6">
                              <CButton variant="outline" block color="info" className="mr-1" onClick={() => setEdit(false)}
                              >Cancel</CButton>
                           </CCol>
                           <CCol xs="6">
                              <CButton block color="info" className="mr-1" onClick={handleSubmit}
                              >Submit</CButton>
                           </CCol>
                        </CRow>

                     </CCardFooter>
                     :
                     <CCardFooter style={{ width: '13%' }}>
                        <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/customermanagement')}
                        >Close</CButton>
                     </CCardFooter>
                  }
                        </CRow>
            </CCardBody>
         </CCard>
         
         )}
         </Formik>
      </>

   )
}

