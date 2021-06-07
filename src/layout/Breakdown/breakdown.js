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

const getBadge = status => {
  switch (status) {
    case 'Completed': return 'success'
    case 'ON-SITE': return 'secondary'
    case 'InProgress': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['breakdownId','company','description','issueType','executive', 'status','contactNumber', 'reports']

export default function Breakdown() {
    const [info, setInfo] = useState(false)
    const [data, setData] = useState([
        {id: 0, breakdownId: 'UPNLBKN202101', status:'Completed', issueType:'Electrical',description:'value proposition', company: 'Upanal CNC', contactNumber: '8765964234', 
        executive:'ABC',reports:'no'},
        {id: 1, breakdownId: 'UPNLBKN202102', status:'InProgress', issueType:'Mechanical',description:'Prospecting', company: 'ABC', contactNumber: '97543281231', 
        executive:'XYZ',reports:'no'},
        {id: 2, breakdownId: 'UPNLBKN202103', status:'ON-SITE', issueType:'Electrical',description:'Id.decision Makers', company: 'XYZ', contactNumber: '76854012334', 
        executive:'ABC',reports:'no'},
      ])
    const [breakdownId,setBreakdownId] = useState("")
    const [status,setStatus] = useState("")
    const [issueType,setIssueType] = useState("")
    const [description,setDescription] = useState("")
    const [company,setCompany] = useState("")
    const [contactNumber,setContactNumber] = useState("")
    const [executive,setExecutive] = useState("")
    const [reports,setReports] = useState("")


    const submitHandler = () => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.breakdownId = breakdownId
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
              Breakdown
              </CCol>
              <CCol xs="1">
              <CButton block variant="ghost" color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              itemsPerPage={1}
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
                <CModalTitle>Add New</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="breakdownId">Breakdown Id</CLabel>
                <CInput type="text" id="breakdownId" name="breakdownId" placeholder="BreakdownId" value={breakdownId} onChange={(e) => setBreakdownId(e.target.value)}/>
              </CFormGroup>
            </CCol>
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
        </CCol>
        </CRow>
    </>
  )
}       