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
  CButton
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

const usersData = [
  {id: 0, breakdownId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
  executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
  {id: 1, breakdownId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
  executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
]

const breakdownData = [
  {id: 0, breakdownId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
  executive:'Naveen', status: 'on-site',createdDate:'2021-04-10',email:'adam@company.com'},

]
const salesData = [
  {id: 0, breakdownId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
  executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
]

export default function Overview() {
  const [info, setInfo] = useState(false)

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
              <CButton block variant="ghost" color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={usersData}
              fields={fields}
              itemsPerPage={2}
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
              <CButton block variant="ghost" color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={breakdownData}
              fields={fields}
              itemsPerPage={2}
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
              <CButton block variant="ghost" color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={salesData}
              fields={fields}
              itemsPerPage={2}
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