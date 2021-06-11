import React, { useState } from 'react'

import {
    CBadge,
    CCard,
    CCardBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CAlert,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const fields = ['customerName','customerCode', 'contactPerson','mobileNo','email', 'address','gstNumber']

const override = css`
display: block;
margin: 0 auto;
`;

const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'on-site': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

export default function Customer() {
    const [info, setInfo] = useState(false)
    const [customerName,setCustomerName] = useState("")
    const [contactPerson,setContactPerson] = useState("")
    const [mobileNo,setMobileNo] = useState("")
    const [alternateNo,setAlternateNo] = useState("")
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [zipCode,setZipCode] = useState("")
    const [state,setState] = useState("")
    const [country,setCountry] = useState("")
    const [email,setEmail] = useState("")
    const [gstNumber,setGstNumber] = useState("")
    const [alert,setAlert] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editAlert,setEditAlert] = useState(false)

    const [deleteAlert,setDeleteAlert] = useState(false)
    const [updateId, setUpdateId] = useState()
    const  [loading,setLoading] = useState(false)

    const [data,setData] = useState([
        {id: 0, customerName: 'Cloudhub', customerCode: 'UPNLCUSTT01', contactPerson: 'ABC',mobileNo:'908000000',
        email:'jrogers@cloudhub.com', address: '#26,Peenya Industrial area',gstNumber:'jrogers@cloudhub.com'},
        {id: 1, customerName: 'Cloudhub+Anypoint Connectors', customerCode: 'UPNLCUSTT02', contactPerson: 'XYZ',mobileNo:'9876000000',
        email:'jrogers@cloudhub.com', address: '#30,Devanhalli',gstNumber:'jrogers@cloudhub.com'},
    ])

    
    const submitHandler = () => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.customerName = customerName
        currentData.contactPerson = contactPerson
        currentData.mobileNo=mobileNo
        currentData.alternateNo=alternateNo
        currentData.address=address
        currentData.city=city
        currentData.zipCode=zipCode
        currentData.state=state
        currentData.country=country
        currentData.email=email
        currentData.gstNumber=gstNumber
        let allData = [...data]
        allData.push(currentData)
        setData(allData)
        console.log('alldata',allData);
        setInfo(!info)
        setLoading(true)
        setTimeout(function(){   
          setLoading(false)
          setAlert(true)
         }, 3000);
    }
    const editBtnHandler = () => {   
      let updatedData = {}
        updatedData.id = updateId
        updatedData.customerName = customerName
        updatedData.contactPerson = contactPerson
        updatedData.mobileNo=mobileNo
        updatedData.alternateNo=alternateNo
        updatedData.address=address
        updatedData.city=city
        updatedData.zipCode=zipCode
        updatedData.state=state
        updatedData.country=country
        updatedData.email=email
        updatedData.gstNumber=gstNumber
        console.log('updatedData', updatedData)
        let filteredArr = data.filter(function( obj ) {
          return obj.id !== updateId;
        });
        console.log(filteredArr)
        setData([...filteredArr, updatedData])
  
        setEditModal(false)
        setLoading(true)
        setTimeout(function(){   
          setLoading(false)
          setEditAlert(true)
         }, 3000);
       
   }
    const conditionalRowStyles = [
      {
        when: row => row.calories < 300,
        style: {
          backgroundColor: 'green',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      }
    ];
    const deleteHandler = () => {
      let element = [...data]
      let updatedData = {}
      updatedData.id = updateId
      console.log(updatedData.id);
      element = element.filter(item => item.id !==updatedData.id);
      setData(element)
      setEditModal(false)
      setLoading(true)
      setTimeout(function(){  
         setLoading(false)
         setDeleteAlert(true)
       }, 3000);
  }
    return (
        <div>
     <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
     </div> 
      
        <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
           Successfully Added!
          </CAlert>
          <CAlert color="success"show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
           Updated Successfully!
          </CAlert>

          <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
            Deleted Successfully!
          </CAlert>
             <CRow>
        <CCol xs="12" lg="12">
        {!loading ?
            <CCardBody>
              <CRow>
              <CCol xs="11">
              Customers
              </CCol>
              <CCol xs="1">
              <CButton  color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'customerName':
                  (item)=>(
                    <td>
                   <a  onClick={()=>{
                     setUpdateId(item.id)
                     setCustomerName(item.customerName)
                     setContactPerson(item.contactPerson)
                     setMobileNo(item.mobileNo)
                     setAlternateNo(item.alternateNo)
                     setAddress(item.address)
                     setCity(item.city)
                     setZipCode(item.zipCode)
                     setState(item.state)
                     setCountry(item.country)
                     setGstNumber(item.gstNumber)
                     setEmail(item.email)
                      setEditModal(!editModal)}
                   }
                      >{item.customerName}</a>
                    </td>
                  )
              }}

            />
             <CModal 
              show={info} 
              onClose={() => setInfo(!info)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New Customer</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="customerName">Customer Name</CLabel>
                <CInput type="text" id="customerName" name="customerName" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="contactPerson">Contact Person</CLabel>
                <CInput type="text" id="contactPerson" name="contactPerson" placeholder="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="mobileNo">Contact Number</CLabel>
                <CInput type="text" id="mobileNo" name="mobileNo" placeholder="Mobile No" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="alternateNo">Alternate No</CLabel>
                <CInput type="text" id="alternateNo" name="alternateNo" placeholder="Alternate No" value={alternateNo} onChange={(e) => setAlternateNo(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="address">Address</CLabel>
                <CInput type="text" id="address" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="city">City</CLabel>
                <CInput type="text" id="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="zipCode">Zip Code</CLabel>
                <CInput type="text" id="zipCode" name="zipCode" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="state">State</CLabel>
                <CInput type="text" id="state" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="country">Country</CLabel>
                <CInput type="text" id="country" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="email">Email</CLabel>
                <CInput type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="gstNumber">GSTN</CLabel>
                <CInput type="text" id="gstNumber" name="gstNumber" placeholder="GSTN" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
                <CButton color="info" onClick={submitHandler}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>

            </CCardBody>
         : null }
        </CCol>
        <CModal 
              show={editModal} 
              onClose={() => setEditModal(!editModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Customers</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="customerName">Customer Name</CLabel>
                <CInput type="text" id="customerName" name="customerName" placeholder="Customer Name" value={customerName?customerName:''} onChange={(e) => setCustomerName(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="contactPerson">Contact Person</CLabel>
                <CInput type="text" id="contactPerson" name="contactPerson" placeholder="Contact Person" value={contactPerson?contactPerson:''} onChange={(e) => setContactPerson(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="mobileNo">Contact Number</CLabel>
                <CInput type="text" id="mobileNo" name="mobileNo" placeholder="Mobile No" value={mobileNo?mobileNo:''} onChange={(e) => setMobileNo(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="alternateNo">Alternate No</CLabel>
                <CInput type="text" id="alternateNo" name="alternateNo" placeholder="Alternate No" value={alternateNo?alternateNo:''} onChange={(e) => setAlternateNo(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="address">Address</CLabel>
                <CInput type="text" id="address" name="address" placeholder="Address" value={address?address:''} onChange={(e) => setAddress(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="city">City</CLabel>
                <CInput type="text" id="city" name="city" placeholder="City" value={city?city:''} onChange={(e) => setCity(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="4">
              <CFormGroup >
                <CLabel htmlFor="zipCode">Zip Code</CLabel>
                <CInput type="text" id="zipCode" name="zipCode" placeholder="Zip Code" value={zipCode?zipCode:''} onChange={(e) => setZipCode(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="state">State</CLabel>
                <CInput type="text" id="state" name="state" placeholder="State" value={state?state:''} onChange={(e) => setState(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="country">Country</CLabel>
                <CInput type="text" id="country" name="country" placeholder="Country" value={country?country:''} onChange={(e) => setCountry(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="email">Email</CLabel>
                <CInput type="text" id="email" name="email" placeholder="Email" value={email?email:''} onChange={(e) => setEmail(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="gstNumber">GSTN</CLabel>
                <CInput type="text" id="gstNumber" name="gstNumber" placeholder="GSTN" value={gstNumber? gstNumber:''} onChange={(e) => setGstNumber(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={ deleteHandler}>Delete</CButton>
                <CButton color="info" onClick={editBtnHandler}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
        </CRow>
        </div>
        
    )
}
