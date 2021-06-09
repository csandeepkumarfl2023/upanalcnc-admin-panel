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
  CCardHeader
} from '@coreui/react'


const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'on-site': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  const fields = ['breakdownId','company', 'priority','issueType','executive', 'status','createdDate','email']

export default function SalesVisit() {
    const [data, setData] = useState([
      {id: 0, breakdownId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
      executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    ])
    const [breakdownId,setBreakdownId] = useState("")
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

    const submitHandler = () => {
      let currentData = {}
      currentData.id = Math.round(Math.random() * 10000000)
      currentData.breakdownId = breakdownId
      currentData.status = status
      currentData.issueType=issueType
      currentData.priority=priority
      currentData.company=company
      currentData.createdDate=createdDate
      currentData.executive=executive
      currentData.email=email
      let allData = [...data] 
      allData.push(currentData)
      setData(allData)
      console.log('alldata',allData);
      setInfo(!info)
      setAlert(true)

  }
  const editBtnHandler = () => {   
    let updatedData = {}
      updatedData.id = updateId
      updatedData.breakdownId = breakdownId
      updatedData.status = status
      updatedData.issueType=issueType
      updatedData.company=company
      updatedData.executive=executive
      updatedData.email=email
      updatedData.createdDate=createdDate
      updatedData.priority=priority
      console.log('updatedData', updatedData)
      let filteredArr = data.filter(function( obj ) {
        return obj.id !== updateId;
      });
      console.log(filteredArr)
      setData([...filteredArr, updatedData])

      setEditModal(false)
      setEditAlert(true)
     
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
}
  return (
    <>
   <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            {/* <CCardHeader>
             All
              <DocsLink name="CModal"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
              <CCol xs="11">
              Sales Visit
              </CCol>
              <CCol xs="1">
              <CButton block  color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'breakdownId':
                  (item)=>(
                    <td>
                   <a  onClick={()=>{
                     setUpdateId(item.id)
                     setBreakdownId(item.breakdownId)
                     setCompany(item.company)
                     setIssueType(item.issueType)
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setPriority(item.priority)
                     setCreatedDate(item.createdDate)
                     setEmail(item.email)
                      setEditModal(!editModal)}
                   }
                      >{item.breakdownId}</a>
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

            <CModal show={alert} variant="success" onClose={() => setAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setAlert(false)}>Successfully Added!</CModalHeader>
          </CModal>

          <CModal show={editAlert} variant="success" onClose={() => setEditAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setEditAlert(false)}>Updated Successfully</CModalHeader>
          </CModal>

          <CModal show={deleteAlert} variant="success" onClose={() => setDeleteAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setDeleteAlert(false)}>Deleted Successfully</CModalHeader>
          </CModal>
            </CCardBody>
          </CCard>
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