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
  CSelect,
  CLink
} from '@coreui/react'
import CustomerService from '../../services/customerService'

const customerService = new CustomerService()

export default function Customer() {
  const [info, setInfo] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerCode, setCustomerCode] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [alternateNo, setAlternateNo] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [email, setEmail] = useState("")
  const [gstNumber, setGstNumber] = useState("")
  const [alert, setAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editAlert, setEditAlert] = useState(false)

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([])

  const fields = ['customerName', 'customerCode', 'contactPerson', 'mobileNo', 'email', 'address', 'gstNumber']


  const submitHandler = async () => {
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.customerName = customerName
    currentData.contactPerson = contactPerson
    currentData.mobileNo = mobileNo
    currentData.customerCode = 'UPNLCUS' + Math.round(Math.random() * 10000)
    currentData.alternateNo = alternateNo
    currentData.address = address
    currentData.city = city
    currentData.zipCode = zipCode
    currentData.state = state
    currentData.country = country
    currentData.email = email
    currentData.gstNumber = gstNumber
    let res = await customerService.createCustomer(currentData)
    getData()
    setInfo(!info)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setAlert(true)
    }, 3000);
  }
  const editBtnHandler = async () => {
    let updatedData = {}
    updatedData.id = updateId
    updatedData.customerName = customerName
    updatedData.customerCode = customerCode
    updatedData.contactPerson = contactPerson
    updatedData.mobileNo = mobileNo
    updatedData.alternateNo = alternateNo
    updatedData.address = address
    updatedData.city = city
    updatedData.zipCode = zipCode
    updatedData.state = state
    updatedData.country = country
    updatedData.email = email
    updatedData.gstNumber = gstNumber
    console.log('updatedData', updatedData)
    let res = await customerService.updateCustomer(updatedData, updateId)
    getData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setEditAlert(true)
    }, 3000);
  }

  const getData = async () => {
    let res = await customerService.getAllCustomers()
    setData(res)
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
  const deleteHandler = async() => {
    let res = await customerService.deleteCustomer(updateId)
    getData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setDeleteAlert(true)
    }, 3000);
  }

  const addnewBtnHandler = () => {
    setUpdateId('')
    setCustomerName('')
    setCustomerCode('')
    setContactPerson('')
    setMobileNo('')
    setAlternateNo('')
    setAddress('')
    setCity('')
    setZipCode('')
    setState('')
    setCountry('')
    setGstNumber('')
    setEmail('')
    setInfo(true)
  }

  React.useEffect(() => {
    getData()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

  return (
    <div>

      <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        Successfully Added!
      </CAlert>
      <CAlert color="success" show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
        Updated Successfully!
      </CAlert>

      <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
        Deleted Successfully!
      </CAlert>
      <CRow>
        <CCol xs="12" lg="12">
          {/* {!loading ? */}
          <CCardBody>
            <CRow>
              <CCol xs="11">
                Customers
              </CCol>
              <CCol xs="1">
                <CButton color="info" onClick={addnewBtnHandler}style={{height:'83%',width:'100%', textAlign:'center', marginLeft: '5%'}} className="mr-1">New</CButton>
              </CCol>
            </CRow>
            <CDataTable
              items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={5}
              pagination
              scopedSlots={{
                'customerName':
                  (item) => (
                    <td>
                    <CLink>  <a onClick={() => {
                        setUpdateId(item.id)
                        setCustomerName(item.customerName)
                        setCustomerCode(item.customerCode)
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
                        setEditModal(!editModal)
                      }
                      }
                      >{item.customerName}</a></CLink>
                    </td>
                  )
              }}

            />
            <CModal
              show={info}
              onClose={() => setInfo(false)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New Customer</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="Customer Name">Customer Name</CLabel>
                      <CSelect custom size="md" name="customerName" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
                        <option value="0">Open this select menu</option>
                        <option value="Vamsi">Vamsi</option>
                        <option value="Sandeep">Sandeep</option>
                        <option value="Pooja">Pooja</option>
                        <option value="Vikram">Vikram</option>
                        <option value="Arun">Arun</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="contactPerson">Contact Person</CLabel>
                      <CInput type="text" id="contactPerson" name="contactPerson" placeholder="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="mobileNo">Contact Number</CLabel>
                      <CInput type="text" id="mobileNo" name="mobileNo" placeholder="Mobile No" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="alternateNo">Alternate No</CLabel>
                      <CInput type="text" id="alternateNo" name="alternateNo" placeholder="Alternate No" value={alternateNo} onChange={(e) => setAlternateNo(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="4">
                    <CFormGroup >
                      <CLabel htmlFor="address">Address</CLabel>
                      <CInput type="text" id="address" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="4">
                    <CFormGroup >
                      <CLabel htmlFor="city">City</CLabel>
                      <CInput type="text" id="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="4">
                    <CFormGroup >
                      <CLabel htmlFor="zipCode">Zip Code</CLabel>
                      <CInput type="text" id="zipCode" name="zipCode" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="state">State</CLabel>
                      <CInput type="text" id="state" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="country">Country</CLabel>
                      <CInput type="text" id="country" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="gstNumber">GSTN</CLabel>
                      <CInput type="text" id="gstNumber" name="gstNumber" placeholder="GSTN" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(false)}>Cancel</CButton>
                <CButton color="info" onClick={submitHandler}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>

          </CCardBody>
          {/* : null } */}
        </CCol>
        <CModal
          show={editModal}
          onClose={() => setEditModal(false)}
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
                  <CInput type="text" id="customerName" name="customerName" placeholder="Customer Name" value={customerName ? customerName : ''} onChange={(e) => setCustomerName(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="contactPerson">Contact Person</CLabel>
                  <CInput type="text" id="contactPerson" name="contactPerson" placeholder="Contact Person" value={contactPerson ? contactPerson : ''} onChange={(e) => setContactPerson(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="mobileNo">Contact Number</CLabel>
                  <CInput type="text" id="mobileNo" name="mobileNo" placeholder="Mobile No" value={mobileNo ? mobileNo : ''} onChange={(e) => setMobileNo(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="alternateNo">Alternate No</CLabel>
                  <CInput type="text" id="alternateNo" name="alternateNo" placeholder="Alternate No" value={alternateNo ? alternateNo : ''} onChange={(e) => setAlternateNo(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10" md="4">
                <CFormGroup >
                  <CLabel htmlFor="address">Address</CLabel>
                  <CInput type="text" id="address" name="address" placeholder="Address" value={address ? address : ''} onChange={(e) => setAddress(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="4">
                <CFormGroup >
                  <CLabel htmlFor="city">City</CLabel>
                  <CInput type="text" id="city" name="city" placeholder="City" value={city ? city : ''} onChange={(e) => setCity(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="4">
                <CFormGroup >
                  <CLabel htmlFor="zipCode">Zip Code</CLabel>
                  <CInput type="text" id="zipCode" name="zipCode" placeholder="Zip Code" value={zipCode ? zipCode : ''} onChange={(e) => setZipCode(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="state">State</CLabel>
                  <CInput type="text" id="state" name="state" placeholder="State" value={state ? state : ''} onChange={(e) => setState(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="country">Country</CLabel>
                  <CInput type="text" id="country" name="country" placeholder="Country" value={country ? country : ''} onChange={(e) => setCountry(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="email">Email</CLabel>
                  <CInput type="text" id="email" name="email" placeholder="Email" value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="gstNumber">GSTN</CLabel>
                  <CInput type="text" id="gstNumber" name="gstNumber" placeholder="GSTN" value={gstNumber ? gstNumber : ''} onChange={(e) => setGstNumber(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={deleteHandler}>Delete</CButton>
            <CButton color="info" onClick={editBtnHandler}>Edit</CButton>{' '}
          </CModalFooter>
        </CModal>
      </CRow>
    </div>

  )
}
