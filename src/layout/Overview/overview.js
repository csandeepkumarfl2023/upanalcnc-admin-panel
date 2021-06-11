import React, { useState } from 'react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CAlert,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CLabel,
  CInput,
} from '@coreui/react'
import {
  CChartDoughnut,
} from '@coreui/react-chartjs'


const fields = ['servicerequestId','company', 'priority','issueType','executive', 'status','createdDate','email']






export default function Overview() {
  const [data, setData] = useState([
    {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 1, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 2, servicerequestId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
    executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
  ])

  const [servicedata, setServiceData]  =useState( [
    {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'on-site',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 1, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 2, servicerequestId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
    executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
  
  ])

  const [overviewdata, setOverviewData]  =useState([
    {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 1, servicerequestId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
    executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 2, servicerequestId: 'UPNLBKN202103', company: 'Company three', priority: 'High',issueType:'Mechanical',
    executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
  ])

  const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'on-site': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  const [info, setInfo] = useState(false)
  const [serviceinfo, setServiceInfo] = useState(false)
  const [overviewinfo, setOverviewInfo] = useState(false)

  const  [loading,setLoading] = useState(false)
  const [servicerequestId,setServiceRequestId] = useState("")
  const [status,setStatus] = useState("")
  const [issueType,setIssueType] = useState("")
  const [priority,setPriority] = useState("")
  const [company,setCompany] = useState("")
  const [createdDate,setCreatedDate] = useState("")
  const [executive,setExecutive] = useState("")
  const [email,setEmail] = useState("")
  const [alert,setAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [serviceeditModal, setServiceEditModal] = useState(false)
  const [overvieweditModal, setOverviewEditModal] = useState(false)

  const [editAlert,setEditAlert] = useState(false)

  const [deleteAlert,setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()

  const submitHandler = () => {
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.servicerequestId = "Uld32351"
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
    updatedData.servicerequestId = servicerequestId
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

const submitServie = () => {
  let currentData = {}
  currentData.id = Math.round(Math.random() * 10000000)
  currentData.servicerequestId = "Ul456578"
  currentData.status = status
  currentData.issueType=issueType
  currentData.priority=priority
  currentData.company=company
  currentData.createdDate=createdDate
  currentData.executive=executive
  currentData.email=email
  let allData = [...servicedata] 
  allData.push(currentData)
  setServiceData(allData)
  console.log('alldata',allData);
  setServiceInfo(!serviceinfo)
  setAlert(true)

}
const editservice = () => {   
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
  let filteredArr = servicedata.filter(function( obj ) {
    return obj.id !== updateId;
  });
  console.log(filteredArr)
  setServiceData([...filteredArr, updatedData])

  setServiceEditModal(false)
  setEditAlert(true)
 
}

const deleteservice = () => {
let element = [...servicedata]
let updatedData = {}
updatedData.id = updateId
console.log(updatedData.id);
element = element.filter(item => item.id !==updatedData.id);
setServiceData(element)
setServiceEditModal(false)
setDeleteAlert(true)
}

const overviewsubmitServie = () => {
  let currentData = {}
  currentData.id = Math.round(Math.random() * 10000000)
  currentData.servicerequestId = "Ul45S365TY78"
  currentData.status = status
  currentData.issueType=issueType
  currentData.priority=priority
  currentData.company=company
  currentData.createdDate=createdDate
  currentData.executive=executive
  currentData.email=email
  let allData = [...overviewdata] 
  allData.push(currentData)
  setOverviewData(allData)
  console.log('alldata',allData);
  setOverviewInfo(!overviewinfo)
  setAlert(true)

}
const overvieweditservice = () => {   
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
  let filteredArr = overviewdata.filter(function( obj ) {
    return obj.id !== updateId;
  });
  console.log(filteredArr)
  setOverviewData([...filteredArr, updatedData])
  setOverviewEditModal(false)
  setEditAlert(true)
 
}

const overviewdeleteservice = () => {
let element = [...overviewdata]
let updatedData = {}
updatedData.id = updateId
console.log(updatedData.id);
element = element.filter(item => item.id !==updatedData.id);
setOverviewData(element)
setOverviewEditModal(false)

setDeleteAlert(true)
}
  return (
    <>
     {/* <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
    </div> */}
        <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
           Successfully Added!
          </CAlert>
          <CAlert color="success" show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
           Updated Successfully!
          </CAlert>

          <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
            Deleted Successfully!
          </CAlert>
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
              OverView
              </CCol>
              <CCol xs="1">
              <CButton block  color="info" onClick={() => setOverviewInfo(!overviewinfo)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={overviewdata}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={2}
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
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setPriority(item.priority)
                     setCreatedDate(item.createdDate)
                     setEmail(item.email)
                      setOverviewEditModal(!overvieweditModal)}
                   }
                      >{item.servicerequestId}</a>
                    </td>
                  )
              }}

            />
             <CModal 
              show={overviewinfo} 
              onClose={() => setOverviewInfo(!overviewinfo)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New Overview</CModalTitle>
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
                <CButton color="secondary" onClick={() => setOverviewInfo(!overviewinfo)}>Cancel</CButton>
                <CButton color="info" onClick={overviewsubmitServie}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>  


            </CCardBody>
          </CCard>
        </CCol>
        <CModal 
              show={overvieweditModal} 
              onClose={() => setOverviewEditModal(!overvieweditModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Overview</CModalTitle>
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
                <CButton color="secondary" onClick={ overviewdeleteservice}>Delete</CButton>
                <CButton color="info" onClick={overvieweditservice}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
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
              <CButton block  color="info" onClick={() => setServiceInfo(!serviceinfo)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={servicedata}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={2}
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
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setPriority(item.priority)
                     setCreatedDate(item.createdDate)
                     setEmail(item.email)
                      setServiceEditModal(!serviceeditModal)}
                   }
                      >{item.servicerequestId}</a>
                    </td>
                  )
              }}

            />
             <CModal 
              show={serviceinfo} 
              onClose={() => setServiceInfo(!serviceinfo)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New ServiceRequest</CModalTitle>
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
                <CButton color="secondary" onClick={() => setServiceInfo(!serviceinfo)}>Cancel</CButton>
                <CButton color="info" onClick={submitServie}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>  

    
            </CCardBody>
          </CCard>
        </CCol>
        <CModal 
              show={serviceeditModal} 
              onClose={() => setServiceEditModal(!serviceeditModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Service Request</CModalTitle>
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
                <CButton color="secondary" onClick={ deleteservice}>Delete</CButton>
                <CButton color="info" onClick={editservice}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
        </CRow>



                 {/* salesVisit */}
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
              itemsPerPage={2}
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
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setPriority(item.priority)
                     setCreatedDate(item.createdDate)
                     setEmail(item.email)
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