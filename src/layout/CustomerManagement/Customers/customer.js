import React, { useState } from 'react'

import {
  CCardBody,
  CAlert,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CLink
} from '@coreui/react'
import CustomerService from '../../../services/customerService'
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  width: 5em;
  height: 5em;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -4.05em;
  left: 60%;
  margin-left: -5em;
`;
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
    setLoading(true)
    let res = await customerService.getAllCustomers()
    setData(res.data)
    setLoading(false)
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


  const addCustomerHandler = (item) => {
    history.push({
      pathname: './createCustomer',


    })
  }

  React.useEffect(() => {
    getData()
    // setLoading(true)
    // setTimeout(function () {
    //   setLoading(false)
    // }, 2000);
  }, [])

  return (
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute', top: '45%', left: '50%'}}>
      <div className="sweet-loading">
      <ClipLoader  loading={loading}  size={60} color='#2f4f4f'/>
     </div> 
      </div>
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
                    <CCol xs="10" style={{display: 'flex', alignItems: 'center'}}>
                      <h5>
                Customers
                </h5>
              </CCol>
              <CCol xs="2" style ={{width: '100px'}} >
                <CButton color="info" onClick={addnewBtnHandler} block>New</CButton>
              </CCol>
            </CRow>
            <CDataTable
              items={data}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={20}
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
