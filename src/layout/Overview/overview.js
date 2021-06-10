import React, { useState } from 'react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal
} from '@coreui/react'
import {
  CChartDoughnut,
} from '@coreui/react-chartjs'

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
  const  [loading,setLoading] = useState(false)

  return (
    <>
    <CModal
     show={loading} 
     onClose={() => setLoading(!loading)}
     color="info">
    <div class="text-center">
     <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
      </div>
      </div>
      </CModal>
    <CRow>
    <CCol xs="4" sm="3">

      <CCard >
        <CCardHeader>
         Service Requests
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#50D2C2',
                  '#FF3366',
                  '#FCAB53',
                  '#D667CD',
                  '#8C88FF'
                ],
                data: [10, 10, 10, 10,10]
              }
            ]}
         //  labels={['Completed', 'Overdue', 'Pending', 'Assigned','Accepted']}
            options={{  
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      <CCol xs="4" sm="3">
      <CCard>
        <CCardHeader>
        Sales Visits
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#50D2C2',
                  '#FF3366',
                  '#FCAB53',
                  '#D667CD',
                  '#8C88FF'
                ],
                data: [10, 10, 10, 10,10]
              }
            ]}
          //  labels={['Completed', 'Overdue', 'Pending', 'Assigned','Accepted']}
            options={{  
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      <CCol xs="4" sm="3">
      <CCard>
        <CCardHeader>
        Payment Follo-Ups
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#50D2C2',
                  '#FF3366',
                  '#FCAB53',
                  '#D667CD',
                  '#8C88FF'
                ],
                data: [10, 10, 10, 10,10]
              }
            ]}
          //  labels={['Completed', 'Overdue', 'Pending', 'Assigned','Accepted']}
            options={{  
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
      <CCol xs="4" sm="3">
      <CCard>
        <CCardHeader>
        PM
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#50D2C2',
                  '#FF3366',
                  '#FCAB53',
                  '#D667CD',
                  '#8C88FF'
                ],
                data: [10, 10, 10, 10,10]
              }
            ]}
          //  labels={['Completed', 'Overdue', 'Pending', 'Assigned','Accepted']}
            options={{  
              tooltips: {
                enabled: true
              }
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
              All
              </CCol>
              <CCol xs="1">
              <CButton block  color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
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
              <CButton block  color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
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
              <CButton block  color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
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