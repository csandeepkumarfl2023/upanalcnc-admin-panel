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
    CCol,
    CDataTable,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'

const fields = ['customerName','customerCode', 'contactPerson','mobileNo','email', 'address','gstNumber']

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
        setAlert(true)
    }

    return (
        <div>
             <CRow>
        <CCol xs="12" lg="12">
         
            {/* <CCardHeader>
             All
              <DocsLink name="CModal"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
              <CCol xs="11">
              Customers
              </CCol>
              <CCol xs="1">
              <CButton block variant="ghost" color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
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
            <CModal show={alert} variant="success" onClose={() => setAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setAlert(false)}>Successfully Added!</CModalHeader>
          </CModal>
            </CCardBody>
         
        </CCol>
        </CRow>
        </div>
    )
}
