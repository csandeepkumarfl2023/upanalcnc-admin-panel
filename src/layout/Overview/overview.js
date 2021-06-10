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
const fields = ['servicerequestId','company', 'priority','issueType','executive', 'status','createdDate','email']

const usersData = [
  {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
  executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
  {id: 1, servicerequestId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
  executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
]

const servicerequestData = [
  {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
  executive:'Naveen', status: 'on-site',createdDate:'2021-04-10',email:'adam@company.com'},

]
const salesData = [
  {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
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

      <CCard>
        <CCardHeader>
         Service Requests
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [10, 10, 10, 10]
              }
            ]}
         //   labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
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
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [10, 10, 10, 10]
              }
            ]}
           // labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
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
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [10, 10, 10, 10]
              }
            ]}
          //  labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
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
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [10, 10, 10, 10]
              }
            ]}
         
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
              ServiceRequest
              </CCol>
              <CCol xs="1">
              <CButton block  color="info"onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={servicerequestData}
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