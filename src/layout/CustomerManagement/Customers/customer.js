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

export default function Customer(props) {
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
  const [editModal, setEditModal] = useState(false)
  const [editAlert, setEditAlert] = useState(false)

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([])

  const fields = ['customerName', 'customerCode', 'contact_person', 'phone_number', 'email_id', 'address', 'gst_number']

  const getData = async () => {
    let res = await customerService.getAllCustomers()
    setData(res.data)
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
      pathname:`/editCustomer/${item.client_id}`,
      state: item });
  }

  const showAlert = () => {
    props.addAlert()
  }

  const addCustomerHandler = (item) => {
    history.push({
      pathname: './createCustomer',
      state: 
      { 
        alert:props.addAlert()
      }
    })
  }

  React.useEffect(() => {
    props.addAlert()
    getData()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

  return (
    <div>

     
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
                      >{item.company}</a></CLink>
                    </td>
                  ),
                  'customerCode':
                  (item) => (
                    <td>{item.client_id}
                    </td>
                  ),
              }}

            />
          
          </CCardBody>
          {/* : null } */}
        </CCol>
       
      </CRow>
    </div>

  )
}
