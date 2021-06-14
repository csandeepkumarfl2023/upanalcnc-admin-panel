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
  CSubheader,
  CBreadcrumbRouter,
  CButtonGroup,
  CSelect,
  CLink
} from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import routes from '../../routes'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";

const fields = ['servicerequestId','company', 'priority','issueType','executive', 'status','createdDate','email']

const pmfields = ['name','type', 'description']

const override = css`
display: block;
margin: 0 auto;
`;  

export default function Overview() {

  const history = useHistory();

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
    executive:'Assign', status: 'Assigned',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 1, servicerequestId: 'UPNLBKN202102', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Assign', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 2, servicerequestId: 'UPNLBKN202103', company: 'Company Two', priority: 'Low',issueType:'Electrical',
    executive:'Assign', status: 'Completed',createdDate:'2021-04-10',email:'adam@company.com'}
  
  ])

  const [overviewdata, setOverviewData]  =useState([
    {id: 0, servicerequestId: 'UPNLBKN202101', company: 'Company one', priority: 'High',issueType:'Electrical',
    executive:'Naveen', status: 'Pending',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 1, servicerequestId: 'UPNLBKN202102', company: 'Company Two', priority: 'Low',issueType:'Electrical',
    executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'},
    {id: 2, servicerequestId: 'UPNLBKN202103', company: 'Company three', priority: 'High',issueType:'Mechanical',
    executive:'Naveen', status: 'Active',createdDate:'2021-04-10',email:'adam@company.com'}
  ])

  const [pmData, setPmData] = useState([
    {id: 0,  name: 'Pm1', type: 'Pm Type',description:'Pm Desc'},
    {id: 1,  name: 'Pm2', type: 'Pm Type',description:'Pm Desc'},
    {id: 2,  name: 'Pm3', type: 'Pm Type',description:'Pm Desc'}
  ])

  const [assign,setAssign] = useState ([])

  const getBadge = status => {
    switch (status) {
      case 'Completed': return 'info'
    case 'Overdue': return 'danger'
    case 'Pending': return 'warning'
    case 'Assigned': return 'light'
    case 'Accepted': return 'secondary'
    case 'new': return 'dark'
    case 'open': return 'dark'
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
 // const [serviceeditModal, setServiceEditModal] = useState(false)
  const [overvieweditModal, setOverviewEditModal] = useState(false)

  const [editAlert,setEditAlert] = useState(false)

  const [deleteAlert,setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [exeUpdateId, setExeUpdateId] = useState()

  
  const [description,setDescription] = useState("")
  const [type,setType] = useState("")
  const [name,setName] = useState("")
  const [pmEditModal, setPmEditModal] = useState(false)
  const [pmAddModal,setPmAddModal] = useState(false)
  const [executiveinfo,setExecutiveInfo] = useState(false)

  const [employee,setEmployee] = useState("")
  const [scheduleDate,setScheduleDate] = useState("")
  const [scheduleTime,setScheduleTime] = useState("")

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
    setInfo(!info)
    setLoading(true)
    setTimeout(function(){  
       setLoading(false)
       setAlert(true)
     }, 3000);

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
  setLoading(true)
  setTimeout(function(){  
    setLoading(false)
    setDeleteAlert(true)
  }, 3000);}

const submitServie = () => {
  let currentData = {}
  currentData.id = Math.round(Math.random() * 10000000)
  currentData.servicerequestId = "Ul456578"
  currentData.status = status
  currentData.issueType=issueType
  currentData.priority=priority
  currentData.company=company
  currentData.createdDate=createdDate
//  currentData.executive=executive
  currentData.email=email
  let allData = [...servicedata] 
  allData.push(currentData)
  setServiceData(allData)
  setServiceInfo(!serviceinfo)
  setLoading(true)
  setTimeout(function(){  
     setLoading(false)
     setAlert(true)
   }, 3000);

}
// const deleteservice = () => {
// let element = [...servicedata]
// let updatedData = {}
// updatedData.id = updateId
// console.log(updatedData.id);
// element = element.filter(item => item.id !==updatedData.id);
// setServiceData(element)
// //setServiceEditModal(false)
// setLoading(true)
// setTimeout(function(){  
//   setLoading(false)
//   setDeleteAlert(true)
// }, 3000);}

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
  setOverviewInfo(!overviewinfo)
  setLoading(true)
  setTimeout(function(){  
     setLoading(false)
     setAlert(true)
   }, 3000);

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
  let filteredArr = overviewdata.filter(function( obj ) {
    return obj.id !== updateId;
  });
  setOverviewData([...filteredArr, updatedData])
  setOverviewEditModal(false)
  setLoading(true)
  setTimeout(function(){  
     setLoading(false)
     setEditAlert(true)
   }, 3000);
 
}

const overviewdeleteservice = () => {
let element = [...overviewdata]
let updatedData = {}
updatedData.id = updateId
console.log(updatedData.id);
element = element.filter(item => item.id !==updatedData.id);
setOverviewData(element)
setOverviewEditModal(false)
setLoading(true)
setTimeout(function(){  
  setLoading(false)
  setDeleteAlert(true)
}, 3000);
}

React.useEffect(() => {
  setLoading(true)
  setTimeout(function(){  
    setLoading(false)
  }, 2000);
},[])

const pmSubmitHandler = () => {
  let currentData = {}
  currentData.id = Math.round(Math.random() * 10000000)
  currentData.description=description
  currentData.type=type
  currentData.name=name
  let allData = [...pmData]
  allData.push(currentData)
  setPmData(allData)
  console.log('alldata',allData);
  setPmAddModal(!pmAddModal)
  setLoading(true)
  setTimeout(function(){   
    setLoading(false)
    setAlert(true)
   }, 3000);
}
const pmeEditHandler = () => {   
  let updatedData = {}
    updatedData.id = updateId
    updatedData.description=description
    updatedData.type=type
    updatedData.name=name
    console.log('updatedData', updatedData)
    let filteredArr = pmData.filter(function( obj ) {
      return obj.id !== updateId;
    });
    console.log(filteredArr)
    setPmData([...filteredArr, updatedData])
    setPmEditModal(false)
    setLoading(true)
    setTimeout(function(){   
      setLoading(false)
      setEditAlert(true)
    }, 3000);   
}
const pmDeleteHandler = () => {
  let element = [...pmData]
  let updatedData = {}
  updatedData.id = updateId
  console.log(updatedData.id);
  element = element.filter(item => item.id !==updatedData.id);
  setPmData(element)
  setPmEditModal(false)
  setLoading(true)
  setTimeout(function(){   
    setLoading(false)
    setDeleteAlert(true)
  }, 3000);
}

const executiveHandler = () => {
    let updatedData = {}
    updatedData.id = exeUpdateId
    updatedData.executive=employee
    updatedData.servicerequestId = servicerequestId
     updatedData.status = status
    updatedData.issueType=issueType
    updatedData.company=company
    updatedData.email=email
    updatedData.createdDate=createdDate
    updatedData.priority=priority
    updatedData.date = scheduleDate
     updatedData.time = scheduleTime
    console.log('updatedData',updatedData);
    let filteredArr = servicedata.filter(function( obj ) {
      return obj.id!= exeUpdateId       
    });
    setServiceData([...filteredArr, updatedData])
    setLoading(true)
    setTimeout(function(){  
       setLoading(false)
       setEditAlert(true)
     }, 3000); 
     setExecutiveInfo(!executiveinfo)
  }
const editServiceHandler =  (item) => {
  history.push({
    pathname:'/editServiceRequest',
    state: item });
}
const addServiceHandler = () => {
 history.push('./createServiceRequest')
}

const servicerequestshow =  (item) => {
  history.push({
    pathname:'/serviceRequest',
    state: item });
}

const SalesVisitshow =  (item) => {
  history.push({
    pathname:'/sales_visit',
    state: item });
}
const pmmethodshow =  (item) => {
  history.push({
    pathname:'/pm',
    state: item });
}
  return (
    <>
     <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
    </div>
        <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
           Successfully Added!
          </CAlert>
          <CAlert color="success" show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
           Updated Successfully!
          </CAlert>

          <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
            Deleted Successfully!
          </CAlert>
      
    <CRow>
    {!loading ? 
    <> 
     <CSubheader className="px-3 justify-content-between" style={{ marginTop:'1px'}}>
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
           <CFormGroup row>
             <CRow>
          <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CButtonGroup>
              <CButton color="secondary">Days</CButton>
              <CButton color="secondary">Weeks</CButton>
              <CButton color="secondary">Months</CButton>
            </CButtonGroup>
          </div>
            <CInput type="date" id="date-input" name="date-input" placeholder="date" style={{width:'30%',marginTop:'1.5%'}} />
            <CInput type="date" id="date-input" name="date-input" placeholder="date" style={{width:'30%',marginTop:'1.5%'}} />
            </CRow>
            </CFormGroup>
      </CSubheader>

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
      </>
      : null}
      </CRow>
      {!loading ? 
          <>
        <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
              <CRow>
              <CCol xs="11">
              ServiceRequest
              </CCol>
              <CCol xs="1">
              <CButton block  color="info" onClick={addServiceHandler} style={{height:'83%',width:'100%', textAlign:'center', marginLeft: '5%'}}className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={servicedata}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              // itemsPerPage={2}
              // pagination
              scopedSlots = {{
                'servicerequestId':
                  (item)=>(
                    <td>
                   <CLink> <a  onClick={()=>{
                     editServiceHandler(item)
                  }
                   }
                      >{item.servicerequestId}</a> </CLink>

                    </td>
                  ),
                  'executive':
                     (item)=>(
                       <td>
                        <p>  <a  onClick={()=>{
                      setExeUpdateId(item.id)
                     setServiceRequestId(item.servicerequestId)
                     setCompany(item.company)
                     setIssueType(item.issueType)
                     setStatus(item.status)
                     setExecutive(item.executive)
                     setPriority(item.priority)
                     setCreatedDate(item.createdDate)
                     setEmail(item.email)                    
                      setExecutiveInfo(!executiveinfo)}
                      }>{item.executive}
                          {<CIcon name="cil-pen"  size="1xl"/>}</a></p>
                       </td>
                     ),
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
            
            <CLink color="info" style={{ marginLeft: '45%'}}  onClick={servicerequestshow}>Show More</CLink>

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
       
        </CRow>


        <CModal 
              show={executiveinfo} 
              onClose={() => setExecutiveInfo(!executiveinfo)}
            //  color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Assign Service Request</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>
       
              <CCol xs="8" style={{marginLeft:'2%'}}>
              <CFormGroup >
                <CLabel htmlFor="name">Sales/Service Executive Name</CLabel>
                <CSelect custom size="md" name="name" id="name" value={employee} onChange={(e) => setEmployee(e.target.value)}>
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
            <CCol xs="8">
              <CFormGroup >
                <CLabel htmlFor="scheduleDate">Schedule Date</CLabel>
                <CInput type="date" id="scheduleDate" name="scheduleDate" placeholder="scheduleDate" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="8">
              <CFormGroup >
                <CLabel htmlFor="scheduleTime">Schedule Time</CLabel>
                <CInput type="time" id="scheduleTime" name="scheduleTime" placeholder="scheduleTime" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)}/>
              </CFormGroup>
            </CCol>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setExecutiveInfo(!executiveinfo)}>Cancel</CButton>
                <CButton color="info" onClick={() => {executiveHandler()}}>Assign</CButton>{' '}
              </CModalFooter>
            </CModal>


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
              <CButton block  color="info" onClick={() => setInfo(!info)} style={{height:'83%',width:'100%', textAlign:'center', marginLeft: '5%'}}className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              // itemsPerPage={2}
              // pagination
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
                  )
              }}

            />
                 <CLink color="info" style={{ marginLeft: '45%'}} onClick={SalesVisitshow}>Show More</CLink>

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

        {/* PM */}
        <CRow>
        <CCol xs="12" lg="12">
          <CCard>   
            <CCardBody>
              <CRow>
              <CCol xs="11">
              PM
              </CCol>
              <CCol xs="1">
              <CButton  color="info" onClick={() => setPmAddModal(!pmAddModal)} style={{height:'83%',width:'100%', textAlign:'center', marginLeft: '5%'}}className="mr-1">New</CButton>
            </CCol>
            </CRow>   
        <CDataTable
        items={pmData}
        fields={pmfields}
        conditionalRowStyles={conditionalRowStyles}
        // itemsPerPage={2}
        // pagination
        scopedSlots = {{
          'name':
            (item)=>(
              <td>
             <CLink> <a  onClick={()=>{
              setUpdateId(item.id)
               setName(item.name)
               setDescription(item.description)
               setType(item.type)
              
               setPmEditModal(!pmEditModal)}
             }
                >{item.name}</a></CLink>
              </td>
            )
        }}

      /> 
    <CLink color="info" style={{ marginLeft: '45%'}} onClick={pmmethodshow}>Show More</CLink>

       <CModal 
              show={pmAddModal} 
              onClose={() => setPmAddModal(!pmAddModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New PM</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>

            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="name">Name</CLabel>
                <CInput type="text" id="name" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="type">Type</CLabel>
                <CInput type="text" id="type" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                <CInput type="text" id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>

              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setPmAddModal(!pmAddModal)}>Cancel</CButton>
                <CButton color="info" onClick={pmSubmitHandler}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>

            </CCardBody>
          </CCard>
        </CCol>
        <CModal 
              show={pmEditModal} 
              onClose={() => setPmEditModal(!pmEditModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit PM </CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>

            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="name">Name</CLabel>
                <CInput type="text" id="name" name="name" placeholder="name" value={name?name:''} onChange={(e) => setName(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="type">Type</CLabel>
                <CInput type="text" id="type" name="type" placeholder="Type" value={type?type:''} onChange={(e) => setType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                <CInput type="text" id="description" name="description" placeholder="Description" value={description?description:''} onChange={(e) => setDescription(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>

              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={pmDeleteHandler}>Delete</CButton>
                <CButton color="info" onClick={pmeEditHandler}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
        </CRow>  
  
   </>   
  : null}
    </>
  )
}