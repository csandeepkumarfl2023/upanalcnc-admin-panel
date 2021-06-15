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
  CAlert,
  CDataTable,
  CRow,
  CSelect,
  CButton,
  CFormGroup,
  CLabel,
  CInput,
  CLink,
  CNav,
  CNavItem,
  CNavLink

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import ServiceRequestService from '../../services/serviceRequestService'

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
const fields = ['servicerequestId','company','priority','issueType','executive', 'status','contactNumber', 'email', 'createdDate']

const override = css`
width: 5em;
height: 5em;
display: block;
  position: absolute;
  top: 50%;
  margin-top: -4.05em;
  left: 55%;
  margin-left: -5em;
`;

const serviceRequestService = new ServiceRequestService()
export default function ServiceRequest() {

  const history = useHistory();

    const [data, setData] = useState([])

    const [alert,setAlert] = useState(false)
    const [editAlert,setEditAlert] = useState(false)
    const [deleteAlert,setDeleteAlert] = useState(false)
    const  [loading,setLoading] = useState(false)
    const [executiveinfo,setExecutiveInfo] = useState(false)
    const [servicerequestId,setServiceRequestId] = useState("")
    const [status,setStatus] = useState("")
    const [priority,setPriority] = useState("")
    const [company,setCompany] = useState("")
    const [createdDate,setCreatedDate] = useState("")
    const [email,setEmail] = useState("")
    const [issueType,setIssueType] = useState("")
    const [employee,setEmployee] = useState("")
    const [scheduleDate,setSheduleDate] = useState("")
    const [scheduleTime,setSheduleTime] = useState("")
    const [exeUpdateId, setExeUpdateId] = useState()
    const [executive,setExecutive] = useState("")
    const [contactNumber,setContactNumber] = useState("")
    const [description,setDescription] = useState("")
    const [reports,setReports] = useState("")

    const addServiceHandler = () => {
      history.push('./createServiceRequest')
     }

     const editServiceHandler =  (item) => {
      history.push({
        pathname:'/editServiceRequest',
        state: item });
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

    const executiveHandler = () => {
      let updatedData = {}
      updatedData.id = exeUpdateId
      updatedData.executive=employee
      updatedData.servicerequestId = servicerequestId
       updatedData.status = status
      updatedData.issueType=issueType
      updatedData.company=company
      updatedData.description=description
      updatedData.contactNumber=contactNumber
      updatedData.reports=reports
      updatedData.priority=priority
      updatedData.date = scheduleDate
       updatedData.time = scheduleTime
      console.log('updatedData',updatedData);
      let filteredArr = data.filter(function( obj ) {
        return obj.id != exeUpdateId       
      });
      console.log('filteredArr',filteredArr);
      setData([...filteredArr, updatedData])
      setLoading(true)
      setTimeout(function(){  
         setLoading(false)
         setEditAlert(true)
       }, 3000); 
       setExecutiveInfo(!executiveinfo)
    }

    const getData = async () => {
      let res = await serviceRequestService.getAllServiceRequests()
      setData(res)
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
            <CCardBody>
              <CRow>
              <CCol xs="11">
              ServiceRequest
              </CCol>
              <CCol xs="1">
              <CButton block  color="info" onClick={addServiceHandler} className="mr-1">New</CButton>
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
                     editServiceHandler(item)
                  }
                   }
                      >{item.servicerequestId}</a></CLink>

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
                        setDescription(item.description)
                        setContactNumber(item.contactNumber)
                        setReports(item.reports) 
                        setExecutiveInfo(!executiveinfo)}
                   }>{item.executive}
                   {<CIcon name="cil-pen"  size="1xl"/>}</a></p>
                </td>
                  ),
                  'status':
                  (item)=>(
                    <td>
                      <CButton color={getBadge(item.status)}>
                        {item.status}
                      </CButton>
                    </td>
                  )
              }}

            />            
            </CCardBody>
          </CCard>
        : null } 
        </CCol>
       
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
       
              <CCol xs="8" style={{marginLeft:'1%'}}>
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
                <CLabel htmlFor="scheduleDate">Shedule Date</CLabel>
                <CInput type="date" id="scheduleDate" name="scheduleDate" placeholder="scheduleDate" value={scheduleDate} onChange={(e) => setSheduleDate(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="8" >
              <CFormGroup >
                <CLabel htmlFor="scheduleTime">Shedule Time</CLabel>
                <CInput type="time" id="scheduleTime" name="scheduleTime" placeholder="scheduleTime" value={scheduleTime} onChange={(e) => setSheduleTime(e.target.value)}/>
              </CFormGroup>
            </CCol>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setExecutiveInfo(!executiveinfo)}>Cancel</CButton>
                <CButton color="info" onClick={() => {executiveHandler()}}>Assign</CButton>{' '}
              </CModalFooter>
            </CModal>
        </CRow>


    </>
  )
}       