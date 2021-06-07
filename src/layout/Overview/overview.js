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
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['breakdownId','company', 'priority','issueType','executive', 'status','createdDate','email']

const usersData = [
  {id: 0, breakdownId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
  executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
  {id: 1, breakdownId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
  executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
]

export default function Overview() {
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
              All
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