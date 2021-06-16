import React, { useState } from 'react'
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

import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import ServiceRequestService from '../../../services/serviceRequestService'
import CustomerService from '../../../services/customerService'
import MachineService from '../../../services/machineService'
import moment from 'moment'

const serviceRequestService = new ServiceRequestService()
const customerSerice = new CustomerService()
const machineService = new MachineService()

export default function EditCustomer(props) {

   console.log('item', props.location.state);
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
   const [data, setData] = useState([])
   const [customerDetails, setCustomerDetails] = useState()
   const [machineDetails, setMachineDetails] = useState()
   const [serviceReqDetails, setServiceReqDetails] = useState()
   const [updateId, setUpdateId] = useState()

   const closeHandler = () => {
      history.push('/customermanagement');
   }
   const cancelHandler = () => {
      setEdit(false)
   }

   const getCustomerDetails = async () => {
      const res = await customerSerice.getCustomer(item.id)
      setCustomerDetails(res)
      console.log('getCustomerDetails', res)
      setCustomerCode(res.customerCode)
      setCustomerName(res.customerName)
      setContactPerson(res.contactPerson)
      setMobileNo(res.mobileNo)
      setEmail(res.email)
      setAddress(res.address)
      setGstNumber(res.gstNumber)
      setAlternateNo(res.alternateNo)
      setCity(res.city)
      setZip(res.zip)
      setState(res.state)
      setCountry(res.country)
   }

   const submitHandler = async() => {
      let currentData = {...item}
      currentData.customerName = customerName
      currentData.contactPerson = contactPerson
      currentData.customerCode = customerCode 
      currentData.mobileNo = mobileNo
      currentData.email = email
      currentData.address = address
      currentData.gstNumber = gstNumber
      currentData.alternateNo = alternateNo
      currentData.city = city
      currentData.zip = zip
      currentData.state = state
      currentData.country = country

      console.log(currentData);
      let res = await customerSerice.updateCustomer(currentData, currentData.id)
      history.push('./customermanagement')
   }

   React.useEffect(() => {
      setItem(props.location.state)
      if (props.location.state) {
         getCustomerDetails()

      }
   }, [])
 
   return (
      <CCard>
         <CCardHeader>
            <CRow>
               <CCol xs="6" md="11">
                  <CCardSubtitle style={{marginTop:'1%'}}>Customer {item ? item.customerName : null}</CCardSubtitle>
               </CCol>
               <CCol xs="6" md="1">
                  {/* <CIcon name="cil-pen" size="1xl" onClick={() => setEdit(true)} /> */}
               </CCol>
            </CRow>
         </CCardHeader>
         <CCardBody>
            <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
               <CCol xs="12" md="4">
               Customer Name: 
                     <CFormGroup >
                        <CInput type="text" id="customerName" className="w-50"
                   name="customerName" placeholder="customerName" value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} />
                     </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="4">
               Customer Code: 
                     <CFormGroup >
                        <CInput type="text" id="customerCode" className="w-50"
                   name="customerCode" placeholder="customerCode" value={customerCode} onChange={(e) => { setCustomerCode(e.target.value) }} />
                     </CFormGroup>
                      </CCol>
               <CCol xs="12" lg="4">
               Contact Person Name: 
                     <CFormGroup >
                        <CInput type="text" id="contactPerson" className="w-50"
                   name="contactPerson" placeholder="contactPerson" value={contactPerson} onChange={(e) => { setContactPerson(e.target.value) }} />
                     </CFormGroup>
                     
            </CCol>
            </CRow>

               <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>

         
            <CCol xs="12" lg="4">
               Contact Number: 
                     <CFormGroup >
                        <CInput type="text" id="mobileNo" className="w-50"
                   name="mobileNo" placeholder="mobileNo" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} />
                     </CFormGroup>
                
            </CCol>
            <CCol xs="12" lg="4">
               Alternate Number: 
                     <CFormGroup >
                        <CInput type="text" id="alternateNo" className="w-50"
                   name="alternateNo" placeholder="alternateNo" value={alternateNo} onChange={(e) => { setAlternateNo(e.target.value) }} />
                     </CFormGroup>
            </CCol>
            <CCol xs="12" lg="4">
               Customer Address: 
                     <CFormGroup >
                        <CInput type="text" id="address" className="w-50"
                   name="address" placeholder="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                     </CFormGroup>
            </CCol>
         </CRow>

         <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
       
            <CCol xs="12" lg="4">
               Email:
                     <CFormGroup >
                        <CInput type="text" id="email" className="w-50"
                   name="email" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                     </CFormGroup>
            </CCol>
            <CCol xs="12" lg="4">
            GstNumber: 
                     <CFormGroup >
                        <CInput type="text" id="gstNumber" className="w-50"
                   name="gstNumber" placeholder="gstNumber" value={gstNumber} onChange={(e) => { setGstNumber(e.target.value) }} />
                     </CFormGroup>
            </CCol>
            <CCol xs="12" lg="4">
            City:
                     <CFormGroup >
                        <CInput type="text" id="city" className="w-50"
                   name="city" placeholder="city" value={city} onChange={(e) => { setCity(e.target.value) }} />
                     </CFormGroup>
            </CCol>
         </CRow>

               <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
            
            <CCol xs="12" lg="4">
                Zip: 
                     <CFormGroup >
                        <CInput type="text" id="zip" className="w-50"
                   name="zip" placeholder="zip" value={zip} onChange={(e) => { setZip(e.target.value) }} />
                     </CFormGroup>
            </CCol>
            <CCol xs="12" lg="4">
            State:
                     <CFormGroup >
                        <CInput type="text" id="state" className="w-50"
                   name="state" placeholder="state" value={state} onChange={(e) => { setState(e.target.value) }} />
                     </CFormGroup>
            </CCol>
            <CCol xs="12" lg="4">
            Country: 
                     <CFormGroup >
                        <CInput type="text" id="country" className="w-50"
                   name="country" placeholder="country" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                     </CFormGroup>
            </CCol>
         </CRow>

  

  
         </CCardBody>

         <CRow>
            <CCardFooter style={{ width: '15%', marginLeft: '70%' }}>
               
                  <CRow>
                     <CButton block color="info" className="mr-1" onClick={submitHandler}
                     >Submit</CButton>
                     <CButton block color="info" className="mr-1" onClick={cancelHandler}
                     >Cancel</CButton>
                  </CRow>
                  
            </CCardFooter>
         </CRow>
      </CCard>

   )
}

         