import React, { useState } from 'react'

import {
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CAlert,
  CDataTable,
  CRow,
  CButton,
  CFormGroup,
  CLabel,
  CInput,
  CLink,
  CSwitch,
  CBadge
} from '@coreui/react'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EmployeeManagementsService from '../../services/employeeManagementService';
import EmployeeService from '../../services/employeeService'
import { useHistory } from "react-router-dom";
import moment from 'moment'

const employeeService = new EmployeeService()

const employeeManagementsservice = new EmployeeManagementsService()
export default function EmployeeManagements(props) {

  const history = useHistory();

  const [info, setInfo] = useState(false)
  const [data, setData] = useState([])

  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [name, setName] = useState("")
  const [successAlert, setSuccessAlert] = useState(false)
  const [successAlertText, setSuccessAlertText] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editAlert, setEditAlert] = useState(false)

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [loading, setLoading] = useState(false)

  const fields = [
    { key: 'employee_id', _style: { width: '40%'} },
    { key: 'employee_name', _style: { width: '20%'} },
    { key: 'email_id', _style: { width: '20%'} },
    { key: 'designation', _style: { width: '20%'} },
    { key: 'address', _style: { width: '20%'} },
    { key: 'active', _style: { width: '20%'} },
    { key: 'phone_number', _style: { width: '20%'} },
    { key: 'department', _style: { width: '20%'} },
    { key: 'date_of_joining', _style: { width: '20%'} } ,
    { key: 'date_of_leaving', _style: { width: '20%'} },
    { key: 'employee_type', _style: { width: '20%'} },
  ]

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

  const addMachineHandler = () => {
    history.push('./createEmployee')
  }

  const editEmployeeHandler = (item) => {
    history.push({
      pathname: `/editEmployee/${item.employee_id}`,
      state: item
    });
  }
  const submitHandler = async () => {
    setLoading(true)
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.description = description
    currentData.type = type
    currentData.name = name
    let res = await employeeManagementsservice.postEmployeeManagements(currentData)
    setName('')
    setDescription('')
    setType('')
    getData()
    setInfo(!info)
    setLoading(false)
  }
  const editBtnHandler = async() => {
    setLoading(true)
    let updatedData = {}
    updatedData.id = updateId
    updatedData.description = description
    updatedData.type = type
    updatedData.name = name
    let res = await employeeManagementsservice.putEmployeeManagements(updatedData, updateId)
    getData()
    setLoading(false)
    setEditModal(false)
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
    let res = await employeeManagementsservice.deleteEmployeeManagements(updateId)
    getData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setDeleteAlert(true)
    }, 3000);
  }

  const getData = async () => {
    setLoading(true)
    let res = await employeeService.getEmployees();
    console.log(res.data);
    setData(res.data)
    setLoading(false)

    // let allEmployeesRes = await employeeService.getEmployees();
    // console.log(allEmployeesRes);
  }

  const showAlert = () => {
    if(props.location.state === 'Employee added successfully!' || props.location.state === 'Employee updated successfully!')   { 
    setSuccessAlertText(props.location.state)
    setSuccessAlert(true)
    }
  }

  const addBtnHandler = async() => {
    setType("")
    setName("")
    setDescription("")
    setInfo(!info)
  }

  React.useEffect(() => {
    getData()
    showAlert()
    // setLoading(true)
    // setTimeout(function () {
    //   setLoading(false)
    // }, 2000);
  }, [])

  return (
    <>
      <div className="sweet-loading">
        <ClipLoader loading={loading} css={override} size={50} color='#2f4f4f' />
      </div>

      <CAlert color="success" show={successAlert} closeButton onClick={() => setSuccessAlert(false)} dismissible>
        {successAlertText}
      </CAlert>
    
      <CRow>
        <CCol xs="12" lg="12">
          {!loading ?
            <CCard>
              <CCardBody>
              <CRow className="mb-2">
                    <CCol xs="10" style={{display: 'flex', alignItems: 'center'}}>
                      <h5>
                    Employee Management
                    </h5>
                  </CCol>
                  <CCol xs="2" style ={{width: '80px'}}>
                    <CButton color="info" block onClick={addMachineHandler}>New</CButton>
                    
                  </CCol>
                </CRow>
                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  columnFilter
                  sorter
                  bordered
                  size="sm"
                  conditionalRowStyles={conditionalRowStyles}
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                      'employee_id':
                      (item) => (
                        <td>
                        <CLink> <a onClick={() => {
                          editEmployeeHandler(item)
                        }
                        }
                        >{item.employee_id}</a></CLink>
                      </td>
                      ),
                      'employee_name':
                      (item) => (
                        <td>{item.employee_name}
                        </td>
                      ),
                      'email_id':
                      (item) => (
                        <td>{item.email_id}
                        </td>
                      ),
                      'phone_number':
                      (item) => (
                        <td>{item.phone_number}
                        </td>
                      ),
                      'designation':
                      (item) => (
                        <td>{item.designation}
                        </td>
                      ),
                      'address':
                      (item) => (
                        <td>{item.address}
                        </td>
                      ),
                      'active':
                      (item) => (
                        <td> { item.active ? 
                        <CBadge
                          className="mr-1"
                          color="success"
                        > Active </CBadge>
                         : 
                         <CBadge
                          className="mr-1"
                          color="secondary"
                        > Inactive </CBadge>
                         }
                        </td>
                      ),
                      'department':
                      (item) => (
                        <td>{item.department}
                        </td>
                      ),
                      'date_of_joining':
                      (item) => (
                        <td>{moment(item.date_of_joining).format('MM/DD/YYYY')}
                        </td>
                      ),
                      'date_of_leaving':
                      (item) => (
                        <td>{moment(item.date_of_leaving).format('MM/DD/YYYY')}
                        </td>
                      ),
                  }}

                />
                <CModal
                  show={info}
                  onClose={() => setInfo(!info)}
                  color="info"
                >
                  <CModalHeader closeButton>
                    <CModalTitle>Add New PM</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <CRow>

                      <CCol xs="10" md="6">
                        <CFormGroup >
                          <CLabel htmlFor="name">Name</CLabel>
                          <CInput type="text" id="name" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="10" md="6">
                        <CFormGroup >
                          <CLabel htmlFor="type">Type</CLabel>
                          <CInput type="text" id="type" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="10" md="6">
                        <CFormGroup >
                          <CLabel htmlFor="description">Description</CLabel>
                          <CInput type="text" id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
            </CCard>
            : null}
        </CCol>
        <CModal
          show={editModal}
          onClose={() => setEditModal(!editModal)}
          color="info"
        >
          <CModalHeader closeButton>
            <CModalTitle>Edit PM </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>

              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="name">Name</CLabel>
                  <CInput type="text" id="name" name="name" placeholder="name" value={name ? name : ''} onChange={(e) => setName(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="type">Type</CLabel>
                  <CInput type="text" id="type" name="type" placeholder="Type" value={type ? type : ''} onChange={(e) => setType(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="description">Description</CLabel>
                  <CInput type="text" id="description" name="description" placeholder="Description" value={description ? description : ''} onChange={(e) => setDescription(e.target.value)} />
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
    </>
  )
}