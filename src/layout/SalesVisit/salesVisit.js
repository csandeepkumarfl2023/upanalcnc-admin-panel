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
  CAlert,
  CButton,
  CFormGroup,
  CLabel,
  CSelect,
  CInput,
  CCardHeader,
  CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import SalesVisitService from '../../services/salesVisitService'
const salesvisitService = new SalesVisitService()

const getBadge = status => {
  switch (status) {
    case 'Completed':
    case 'completed':
      return '#50D2C2'
    case 'Overdue':
    case 'overdue':
      return '#FF3366'
    case 'Pending':
    case 'pending':
      return '#FCAB53'
    case 'Assigned':
    case 'assigned':
      return '#D667CD'
    case 'Accepted':
    case 'accepted':
      return '#8C88FF'
    case 'new':
    case 'New':
      return '#00B9FF'
    case 'open':
    case 'Open':
      return '#00B9FF'
    default: return 'secondary'
  }
}
  const fields = ['servicerequestId','company', 'priority','issueType','executive', 'status','createdDate','email']
  
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

export default function SalesVisit() {
    const [data, setData] = useState([])
    const [servicerequestId,setServiceRequestId] = useState("")
    const [status,setStatus] = useState("")
    const [issueType,setIssueType] = useState("")
    const [priority,setPriority] = useState("")
    const [company,setCompany] = useState("")
    const [createdDate,setCreatedDate] = useState("")
    const [executive,setExecutive] = useState("")
    const [email,setEmail] = useState("")
    const [info, setInfo] = useState(false)
    const [alert,setAlert] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editAlert,setEditAlert] = useState(false)

    const [deleteAlert,setDeleteAlert] = useState(false)
    const [updateId, setUpdateId] = useState()
    const  [loading,setLoading] = useState(false)
    const [executiveinfo,setExecutiveInfo] = useState(false)
    const [name,setName] = useState("")
    const [sheduleDate,setSheduleDate] = useState("")
    const [sheduleTime,setSheduleTime] = useState("")


    const getData = async () => {
      let res = await salesvisitService.getAllSalesVisits()
      setData(res)
    }


    const addnewBtnHandler = () => {
      setUpdateId('')
      setStatus('')
      setIssueType('')
      setPriority('')
      setCompany('')
      setCreatedDate('')
      setExecutive('')
      setEmail('')
      setInfo(true)
    }

    const submitHandler =async () => {
      let currentData = {}
      currentData.id = Math.round(Math.random() * 10000000)
      currentData.servicerequestId = 'Uld32351'
      currentData.status = status
      currentData.issueType=issueType
      currentData.priority=priority
      currentData.company=company
      currentData.createdDate=createdDate
      currentData.executive=executive
      currentData.email=email
      let res = await salesvisitService.postSalesVisit(currentData)
      getData()
      setInfo(!info)
      setLoading(true)
      setTimeout(function(){   
        setLoading(false)
        setAlert(true)
       }, 3000);

  }


  const editBtnHandler =async () => {   
    let updatedData = {}
      updatedData.id = updateId
      updatedData.servicerequestId = servicerequestId
      updatedData.status = status
      updatedData.issueType=issueType
      updatedData.company=company
      updatedData.executive=executive
      updatedData.email=email
      updatedData.createdDate=createdDate
      updatedData.priority=priority
      console.log('updatedData', updatedData)
      let res = await salesvisitService.putSalesVisit(updatedData, updateId)
      getData()
      setEditModal(false)
      setLoading(true)
      setTimeout(function(){  
         setLoading(false)
         setEditAlert(true)
       }, 3000);   
 }

 const ExecutivesubmitHandler = () => {
  // let currentData = {}
  // currentData.id = Math.round(Math.random() * 10000000)
  // currentData.name = name
  // currentData.sheduleDate = sheduleDate
  // currentData.sheduleTime=sheduleTime
  // let allData = [...data]
  // allData.push(currentData)
  // setData(allData)
  // console.log('alldata',allData);
   setExecutiveInfo(!executiveinfo)
 // setAlert(true)
 // setLoading(true)

//  setLoading(false)
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
  const deleteHandler =async () => {
    let res = await salesvisitService.deleteSalesVisit(updateId)
    getData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function(){  
       setLoading(false)
       setDeleteAlert(true)
     }, 3000);
}

React.useEffect(() => {
  getData()
  setLoading(true)
  setTimeout(function(){  
    setLoading(false)
  }, 2000);
},[])

  return (
    <>
    <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
    </div>
      <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
          Successfully Added!
          </CAlert>
          <CAlert color="success"show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
           Updated Successfully!
          </CAlert>

          <CAlert color="danger"  show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
           Deleted Successfully!
          </CAlert>
        <CRow>
        <CCol xs="12" lg="12">
        {!loading ?  
          <CCard>
            {/* <CCardHeader>
             All
              <DocsLink name="CModal"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
              <CCol xs="11">
                <h3>              
                  Sales Visit
                </h3>
              </CCol>
              <CCol xs="1">
              <CCard >
              <CButton color="info" onClick={addnewBtnHandler} style={{height:'10%',width:'100%'}} className="mr-1">New</CButton>
              </CCard>
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
                  <CLink> <a  onClick={()=>{
                     setUpdateId(item.id)
                     setServiceRequestId(item.servicerequestId)
                     setCompany(item.company)
                     setIssueType(item.issueType)
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setPriority(item.priority)
                     setCreatedDate(item.createdDate)
                     setEmail(item.email)
                      setEditModal(!editModal)}
                   }
                      >{item.servicerequestId}</a></CLink>
                    </td>
                  ),
                     'executive':
                     (item)=>(
                       <td>
                        <p>  <a  onClick={()=>{
                    setExecutiveInfo(!executiveinfo)}
                      }>
                          {<CIcon name="cil-phone"  size="1xl"/>}</a></p>
                    
                       </td>
                     ),
                     'status':
                     (item)=>(
                       <td>
                              <button
                              style={{
                                backgroundColor: getBadge(item.status),
                                padding: '5px 8px',
                                borderRadius: '3px',
                                color: 'white',
                                fontSize: '13px',
                                width: '70px',
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                outline: 'none',
                                border: 'none',
                              }}>{item.status}</button>
                       </td>
                     )
                 }}
            />
             <CModal 
              show={executiveinfo} 
              onClose={() => setExecutiveInfo(!executiveinfo)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add Executive</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
       
              <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="name">Name</CLabel>
                <CSelect custom size="md" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
                  <option value="undefined">Open this select menu</option>
                  <option value="Vamsi">Vamsi</option>
                  <option value="Sandeep">Sandeep</option>
                  <option value="Pooja">Pooja</option>
                  <option value="Vikram">Vikram</option>
                  <option value="Arun">Arun</option>
                </CSelect>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="sheduleDate">Shedule Date</CLabel>
                <CInput type="date" id="sheduleDate" name="sheduleDate" placeholder="sheduleDate" value={sheduleDate} onChange={(e) => setSheduleDate(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="sheduleTime">Shedule Time</CLabel>
                <CInput type="time" id="sheduleTime" name="sheduleTime" placeholder="sheduleTime" value={sheduleTime} onChange={(e) => setSheduleTime(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setExecutiveInfo(!executiveinfo)}>Cancel</CButton>
                <CButton color="info" onClick={ExecutivesubmitHandler}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>
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
                <CLabel htmlFor="priority">Priority</CLabel>
                <CInput type="text" id="priority" name="priority" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}/>
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
                <CLabel htmlFor="createdDate">Created Date</CLabel>
                <CInput type="date" id="createdDate" name="createdDate" placeholder="Created Date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="email">Email</CLabel>
                <CInput type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
                <CModalTitle>Edit SalesVisit</CModalTitle>
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
                <CLabel htmlFor="priority">Priority</CLabel>
                <CInput type="text" id="priority" name="priority" placeholder="Priority" value={priority?priority: ''} onChange={(e) => setPriority(e.target.value)}/>
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
                <CLabel htmlFor="createdDate">Created Date</CLabel>
                <CInput type="date" id="createdDate" name="createdDate" placeholder="Created Date" value={createdDate?createdDate:''} onChange={(e) => setCreatedDate(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="email">Email</CLabel>
                <CInput type="text" id="email" name="email" placeholder="Email" value={email?email:''} onChange={(e) => setEmail(e.target.value)}/>
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