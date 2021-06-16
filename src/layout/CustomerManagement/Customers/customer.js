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
import CustomerService from '../../../services/customerService'
import { useHistory } from "react-router-dom";

const customerService = new CustomerService()

export default function Customer() {
  const history = useHistory();

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
    addCustomerHandler() 
   }

  const editCustomerHandler = (item) => {
    history.push({
      pathname:`/editCustomer/${item.customerName}`,
      state: item });
  }

  const addCustomerHandler = (item) => {
    history.push('./createCustomer')
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
          <CRow className="mb-2">
                    <CCol xs="11" style={{display: 'flex', alignItems: 'center'}}>
                      <h5>
                Customers
                </h5>
              </CCol>
              <CCol xs="1" style={{display: 'flex', alignItems: 'center'}}>
                <CButton color="info" onClick={addnewBtnHandler} block>New</CButton>
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
                       editCustomerHandler(item)
                      }
                      }
                      >{item.customerName}</a></CLink>
                    </td>
                  )
              }}

            />
          
          </CCardBody>
          {/* : null } */}
        </CCol>
       
      </CRow>
    </div>

  )
}
