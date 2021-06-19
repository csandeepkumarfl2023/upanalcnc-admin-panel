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
    case 'Completed':
    case 'completed':
    case 'COMPLETED':
      return '#50D2C2'
    case 'Overdue':
    case 'OVERDUE':
    case 'overdue':
      return '#FF3366'
    case 'Pending':
    case 'PENDING':
    case 'pending':
      return '#FCAB53'
    case 'Assigned':
    case 'assigned':
    case 'ASSIGNED':
      return '#D667CD'
    case 'Accepted':
    case 'accepted':
    case 'ACCEPTED':
      return '#8C88FF'
    case 'new':
    case 'NEW':
    case 'New':
      return '#00B9FF'
    case 'open':
    case 'Open':
    case 'OPEN':
      return '#00B9FF'
    default: return 'gray'
  }
}
const fields = ['servicerequestId', 'company', 'priority', 'issue_type', 'executive', 'status', 'contactNumber', 'email', 'createdDate']

const override = css`
width: 5em;
height: 5em;
display: block;
  position: absolute;
  top: 50%;
  margin-top: -4.05em;
  left: 60%;
  margin-left: -5em;
`;

const serviceRequestService = new ServiceRequestService()
export default function ServiceRequest() {

  const history = useHistory();

  const [data, setData] = useState([])

  const [alert, setAlert] = useState(false)
  const [editAlert, setEditAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [executiveinfo, setExecutiveInfo] = useState(false)
  const [servicerequestId, setServiceRequestId] = useState("")
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [company, setCompany] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [email, setEmail] = useState("")
  const [issueType, setIssueType] = useState("")
  const [employee, setEmployee] = useState("")
  const [scheduleDate, setSheduleDate] = useState("")
  const [scheduleTime, setSheduleTime] = useState("")
  const [exeUpdateId, setExeUpdateId] = useState()
  const [executive, setExecutive] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [description, setDescription] = useState("")
  const [reports, setReports] = useState("")

  const addServiceHandler = () => {
    history.push('./createServiceRequest')
  }

  const editServiceHandler = (item) => {
    history.push({
      pathname: `/editServiceRequest/${item.service_request_id}`,
      state: item
    });
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
    if (employee === '') {
      setExecutiveInfo(executiveinfo)
    }
    else {
      let updatedData = {}
      updatedData.id = exeUpdateId
      updatedData.executive = employee
      updatedData.servicerequestId = servicerequestId
      updatedData.status = status
      updatedData.issueType = issueType
      updatedData.company = company
      updatedData.description = description
      updatedData.contactNumber = contactNumber
      updatedData.reports = reports
      updatedData.priority = priority
      updatedData.date = scheduleDate
      updatedData.time = scheduleTime
      console.log('updatedData', updatedData);
      let filteredArr = data.filter(function (obj) {
        return obj.id != exeUpdateId
      });
      console.log('filteredArr', filteredArr);
      setData([...filteredArr, updatedData])
      setLoading(true)
      setTimeout(function () {
        setLoading(false)
        setEditAlert(true)
      }, 3000);
      setExecutiveInfo(!executiveinfo)
    }
  }

  const getData = async () => {
    let res = await serviceRequestService.getAllServiceRequests()
    let mappedRes = []
    res.data.forEach(elem => mappedRes.push(...elem.service_requests))
    console.log(mappedRes)
    setData(mappedRes)
  }

  React.useEffect(() => {
    getData()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

  return (
    <>
      <div className="sweet-loading">
        <ClipLoader loading={loading} css={override} size={50} color='#2f4f4f' />
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
        <CCol xs="12" lg="12">
          {!loading ?
            <CCard>
              <CCardBody>
                <CRow className="mb-2">
                  <CCol xs="11" style={{ display: 'flex', alignItems: 'center' }}>
                    <h5>
                      ServiceRequest</h5>
                  </CCol>
                  <CCol xs="1" style={{ display: 'flex', alignItems: 'center' }}>
                    <CButton block color="info" onClick={addServiceHandler}>New</CButton>
                  </CCol>
                </CRow>

                <CDataTable
                  items={data}
                  fields={fields}
                  conditionalRowStyles={conditionalRowStyles}
                  itemsPerPage={5}
                  pagination
                  scopedSlots={{
                    'servicerequestId':
                      (item) => (
                        <td>
                          <CLink> <a onClick={() => {
                            editServiceHandler(item)
                          }
                          }
                          >{item.service_request_id ? item.service_request_id : null}</a> </CLink>

                        </td>
                      ),
                    'executive':
                      (item) => (
                        <td>
                          <p>  <a onClick={() => {
                            setExeUpdateId(item.id)
                            setServiceRequestId(item.servicerequestId)
                            setCompany(item.company)
                            setIssueType(item.issueType)
                            setStatus(item.status)
                            setExecutive(item.executive)
                            setPriority(item.priority)
                            setCreatedDate(item.createdDate)
                            setEmail(item.email)
                            setExecutiveInfo(!executiveinfo)
                          }
                          }>{item.executive}
                            {<CIcon name="cil-pen" size="1xl" />}</a></p>
                        </td>
                      ),
                    'status':
                      (item) => (
                        <td>{item.request_status ? 
                          <button
                            style={{
                              backgroundColor: getBadge(item.request_status),
                              padding: '5px 8px',
                              borderRadius: '3px',
                              color: 'white',
                              fontSize: '13px',
                              width: '90px',
                              textTransform: 'capitalize',
                              textAlign: 'center',
                              outline: 'none',
                              border: 'none',
                            }}>{item.request_status}</button>
                            : null }
                        </td>
                      ),
                      'company':
                      (item) => (
                        <td>{item.company ? item.company : null}
                        </td>
                      ),
                      'priority':
                      (item) => (
                        <td>{item.priority ? item.priority : null}
                        </td>
                      ),
                      'issue_type':
                      (item) => (
                        <td>{item.issueType ? item.issueType : null}
                        </td>
                      ),
                      'contactNumber':
                      (item) => (
                        <td>{item.contactNumber ? item.contactNumber : null}
                        </td>
                      ),
                      'email':
                      (item) => (
                        <td>{item.email ? item.email : null}
                        </td>
                      ),
                      'createdDate':
                      (item) => (
                        <td>{item.createdDate ? item.createdDate : null}
                        </td>
                      ),
                  }}
                />
              </CCardBody>
            </CCard>
            : null}
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

              <CCol xs="8" style={{ marginLeft: '1%' }}>
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
                <CInput type="date" id="scheduleDate" name="scheduleDate" placeholder="scheduleDate" value={scheduleDate} onChange={(e) => setSheduleDate(e.target.value)} />
              </CFormGroup>
            </CCol>
            <CCol xs="8" >
              <CFormGroup >
                <CLabel htmlFor="scheduleTime">Shedule Time</CLabel>
                <CInput type="time" id="scheduleTime" name="scheduleTime" placeholder="scheduleTime" value={scheduleTime} onChange={(e) => setSheduleTime(e.target.value)} />
              </CFormGroup>
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setExecutiveInfo(!executiveinfo)}>Cancel</CButton>
            <CButton color="info" onClick={() => { executiveHandler() }}>Assign</CButton>{' '}
          </CModalFooter>
        </CModal>
      </CRow>


    </>
  )
}