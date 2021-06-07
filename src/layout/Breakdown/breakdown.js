import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
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

const usersData = [
  {id: 0, breakdownId: 'UPNLBKN202101', status:'Completed', issueType:'Electrical',description:'value proposition', company: 'Upanal CNC', contactNumber: '8765964234', 
  executive:'ABC'},
  {id: 1, breakdownId: 'UPNLBKN202102', status:'InProgress', issueType:'Mechanical',description:'Prospecting', company: 'ABC', contactNumber: '97543281231', 
  executive:'XYZ'},
  {id: 2, breakdownId: 'UPNLBKN202103', status:'ON-SITE', issueType:'Electrical',description:'Id.decision Makers', company: 'XYZ', contactNumber: '76854012334', 
  executive:'ABC'},
]

export default function Breakdown() {
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
              <CButton block variant="ghost" color="info">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={usersData}
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
            </CCardBody>
          </CCard>
        </CCol>
        </CRow>
    </>
  )
}       