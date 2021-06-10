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
  CAlert,
  CDataTable,
  CRow,
  CButton,
  CFormGroup,
  CLabel,
  CInput,
  CNav,
  CNavItem,
  CNavLink

} from '@coreui/react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const getBadge = status => {
  switch (status) {
    case 'Completed': return 'success'
    case 'ON-SITE': return 'secondary'
    case 'InProgress': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['servicerequestId','company','description','issueType','executive', 'status','contactNumber', 'reports']

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function ServiceRequest() {
    const [data, setData] = useState([
        {id: 0, servicerequestId: 'UPNLBKN202101', status:'Completed', issueType:'Electrical',description:'value proposition', company: 'Upanal CNC', contactNumber: '8765964234', 
        executive:'ABC',reports:'no'},
        {id: 1, servicerequestId: 'UPNLBKN202102', status:'InProgress', issueType:'Mechanical',description:'Prospecting', company: 'ABC', contactNumber: '97543281231', 
        executive:'XYZ',reports:'no'},
        {id: 2, servicerequestId: 'UPNLBKN202103', status:'ON-SITE', issueType:'Electrical',description:'Id.decision Makers', company: 'XYZ', contactNumber: '76854012334', 
        executive:'ABC',reports:'no'},
      ])
    const [servicerequestId,setServiceRequestId] = useState("")
    const [status,setStatus] = useState("")
    const [issueType,setIssueType] = useState("")
    const [description,setDescription] = useState("")
    const [company,setCompany] = useState("")
    const [contactNumber,setContactNumber] = useState("")
    const [executive,setExecutive] = useState("")
    const [reports,setReports] = useState("")
    const [alert,setAlert] = useState(false)
    const [editAlert,setEditAlert] = useState(false)

    const [deleteAlert,setDeleteAlert] = useState(false)
    const [updateId, setUpdateId] = useState()

    const [info, setInfo] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const  [loading,setLoading] = useState(false)


    const submitHandler = () => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.servicerequestId = servicerequestId
        currentData.status = status
        currentData.issueType=issueType
        currentData.description=description
        currentData.company=company
        currentData.contactNumber=contactNumber
        currentData.executive=executive
        currentData.reports=reports
        let allData = [...data]
        allData.push(currentData)
        setData(allData)
        console.log('alldata',allData);
        setInfo(!info)
        setAlert(true)
        setLoading(true)
        setTimeout(function(){   setLoading(false)
         }, 3000);
    }
    const editBtnHandler = () => {   
      let updatedData = {}
        updatedData.id = updateId
        updatedData.servicerequestId = servicerequestId
        updatedData.status = status
        updatedData.issueType=issueType
        updatedData.description=description
        updatedData.company=company
        updatedData.contactNumber=contactNumber
        updatedData.executive=executive
        updatedData.reports=reports
        console.log('updatedData', updatedData)
        let filteredArr = data.filter(function( obj ) {
          return obj.id !== updateId;
        });
        console.log(filteredArr)
        setData([...filteredArr, updatedData])

        setEditModal(false)
        setEditAlert(true)
        setLoading(true)
        setTimeout(function(){   setLoading(false)
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
      setDeleteAlert(true)
      setLoading(true)
      setTimeout(function(){   setLoading(false)
       }, 3000);
  }

  return (
    <>
      <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
    </div>
    {/* <div class="text-center">
     <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
      </div>
      </div> */}
        <CAlert color="success" show={alert} onClose={() => setAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setAlert(false)}>Successfully Added!</CModalHeader>
          </CAlert>
          <CAlert color="primary"show={editAlert} variant="success" onClose={() => setEditAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setEditAlert(false)}>Updated Successfully</CModalHeader>
          </CAlert>

          <CAlert color="danger"  show={deleteAlert} onClose={() => setDeleteAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setDeleteAlert(false)}>Deleted Successfully</CModalHeader>
          </CAlert>
   <CRow>
        <CCol xs="12" lg="12">
        {!loading ?  
          <CCard>
            <CCardBody>
              <CRow>
              <CCol xs="11">
              ServiceRequest
              </CCol>
              <CCol xs="1">
              <CButton  color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
      
            <CDataTable
             items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'servicerequestId':
                  (item)=>(
                    <td>
                   <a  onClick={()=>{
                     setUpdateId(item.id)
                     setServiceRequestId(item.servicerequestId)
                     setCompany(item.company)
                     setIssueType(item.issueType)
                     setDescription(item.description)
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setContactNumber(item.contactNumber)
                     setReports(item.reports)

                      setEditModal(!editModal)}
                   }
                      >{item.servicerequestId}</a>
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
                <CModalTitle>Add New</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
       
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="company">Company</CLabel>
                <CInput type="text" id="company" name="company" placeholder="company" value={company} onChange={(e) => setCompany(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                <CInput type="text" id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="issueType">Issue Type</CLabel>
                <CInput type="text" id="issueType" name="issueType" placeholder="Issue Type" value={issueType} onChange={(e) => setIssueType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="executive">Executive</CLabel>
                <CInput type="text" id="executive" name="executive" placeholder="Executive" value={executive} onChange={(e) => setExecutive(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="status">Status</CLabel>
                <CInput type="text" id="status" name="status" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="contactNumber">Contact Number</CLabel>
                <CInput type="text" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="reports">Reports</CLabel>
                <CInput type="text" id="reports" name="reports" placeholder="Reports" value={reports} onChange={(e) => setReports(e.target.value)}/>
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
        : null } 
        </CCol>
        <CModal 
              show={editModal} 
              onClose={() => setEditModal(!editModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit ServiceRequest</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
      
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="company">Company</CLabel>
                <CInput type="text" id="company" name="company" placeholder="company" value={company? company: ''} onChange={(e) => setCompany(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                <CInput type="text" id="description" name="description" placeholder="Description" value={description? description: ''} onChange={(e) => setDescription(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="issueType">Issue Type</CLabel>
                <CInput type="text" id="issueType" name="issueType" placeholder="Issue Type" value={issueType?issueType: ''} onChange={(e) => setIssueType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="executive">Executive</CLabel>
                <CInput type="text" id="executive" name="executive" placeholder="Executive" value={executive? executive: ''} onChange={(e) => setExecutive(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="status">Status</CLabel>
                <CInput type="text" id="status" name="status" placeholder="Status" value={status? status: ''} onChange={(e) => setStatus(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="contactNumber">Contact Number</CLabel>
                <CInput type="text" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={contactNumber?contactNumber: ''} onChange={(e) => setContactNumber(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="reports">Reports</CLabel>
                <CInput type="text" id="reports" name="reports" placeholder="Reports" value={reports?reports: ''} onChange={(e) => setReports(e.target.value)}/>
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


    </>
  )
}       