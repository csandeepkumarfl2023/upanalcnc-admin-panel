import React, { useState } from 'react'

import {
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

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import ServiceRequestService from '../../services/serviceRequestService'
import EmployeeService from '../../services/employeeService';
import moment from 'moment'

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
const fields = [
  { key: 'service_request_id', _style: { width: '40%'} },
  { key: 'company', _style: { width: '20%'} },
  { key: 'request_priority', _style: { width: '20%'} },
  { key: 'issue_type', _style: { width: '20%'} },
  { key: 'executive', _style: { width: '20%'} },
  { key: 'request_status', _style: { width: '20%'} },
  { key: 'phone_number', _style: { width: '20%'} },
  { key: 'email_id', _style: { width: '20%'} },
  { key: 'request_date', _style: { width: '20%'} },
]
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
const employeeService = new EmployeeService()
export default function ServiceRequest(props) {

  const history = useHistory();

  const [data, setData] = useState([])

  const [alert, setAlert] = useState(false)
  const [editAlert, setEditAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [executiveinfo, setExecutiveInfo] = useState(false)
  const [employee, setEmployee] = useState("")
  const [scheduleDate, setSheduleDate] = useState("")
  const [scheduleTime, setSheduleTime] = useState("")
  const [exeUpdateId, setExeUpdateId] = useState()
  const [executive, setExecutive] = useState("")
  const [employeesArr, setEmployeesArr] = useState()

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

  const executiveHandler = async () => {
    if (employee === '') {
      setExecutiveInfo(executiveinfo)
    }
    else {
      console.log('time', scheduleTime)
      let currentData = {}
      currentData.employee_id = employee
      currentData.request_status = 'ASSIGNED'
      currentData.workstep_detail = {
        site_visit_date: moment(new Date(scheduleDate + ' ' + scheduleTime)).format('YYYY-MM-DD HH:mm:ss')
      }  
      console.log(currentData)
      try {
        let res = await serviceRequestService.updateServiceRequest(currentData, exeUpdateId)
        getData()
        setExecutiveInfo(false)
        setEditAlert(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const getEmployees = async () => {
    let res = await employeeService.getEmployees()
    if (res.data) {
      setEmployeesArr(res.data)
    }
  }


  const getData = async () => {
    setLoading(true)
    let res = await serviceRequestService.getAllServiceRequests()
    let mappedRes = []
    res.data.forEach(elem => mappedRes.push(...elem.service_requests))

    for (let item of mappedRes) { 
      let company 
      item.company =  item.machine?.client.company
    }

    for (let item of mappedRes) { 
      item.executive =  item.machine?.client.executive
    }
    for (let item of mappedRes) { 
      item.phone_number =  item.machine?.client.phone_number
    }
    for (let item of mappedRes) { 
      item.email_id =  item.machine?.client.email_id
    }
    // for (let item of mappedRes) {
    //   let reqDetail = await serviceRequestService.getServiceRequest(item.service_request_id)
    //   item.service_request_tasks = reqDetail.data.service_request_tasks
    // }
    console.log('mappedRes', mappedRes)
    setData(mappedRes)
    setLoading(false)
  }

  const showAlert = () => {
    if (props.location.state === 'Service Request added')
      setAlert(true)
    if (props.location.state === 'Service Request updated')
      setAlert(true)
  }

  React.useEffect(() => {
    getData()
    getEmployees()
    showAlert()
  }, [])

  return (
    <>
      <div className="sweet-loading">
        <ClipLoader loading={loading} css={override} size={50} color='#2f4f4f' />
      </div>
      <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        {props.location.state} Successfully!
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
            <CCard  className="mt-2">
              <CCardBody>
                <CRow className="mb-2">
                  <CCol xs="10" style={{ display: 'flex', alignItems: 'center' }}>
                    <h5>
                      Service Request</h5>
                  </CCol>
                  <CCol xs="2" style={{ width: '80px' }} >
                    <CButton block color="info" onClick={addServiceHandler}>New</CButton>
                  </CCol>
                </CRow>

                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  columnFilter
                  sorter
                  bordered
                  size="sm"
                  conditionalRowStyles={conditionalRowStyles}
                  itemsPerPage={20}
                  pagination
                  scopedSlots={{
                    'service_request_id':
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
                          <p>  <a style={{ cursor: 'pointer' }} onClick={() => {
                            setEmployee(item.service_request_tasks[0] ? item.service_request_tasks[0].employee.employee_id : '')
                            setSheduleDate(item.service_request_tasks[0] ? moment(item.service_request_tasks[0].site_visit_date).format('YYYY-MM-DD') : '')
                            setSheduleTime(item.service_request_tasks[0] ? moment(item.service_request_tasks[0].site_visit_date).format('HH:mm') : '')
                            setExeUpdateId(item.service_request_id)
                            setExecutiveInfo(!executiveinfo)
                          }
                          }>{item.service_request_tasks[0] ? item.service_request_tasks[0].employee.employee_name : null}
                            {<CIcon className="ml-2" name="cil-pen" size="1xl" />}</a></p>
                        </td>
                      ),
                    'request_status':
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
                          : null}
                        </td>
                      ),
                    'company':
                      (item) => (
                        <td>{item.company ? item.company : null}
                        </td>
                      ),
                    'priority':
                      (item) => (
                        <td>{item.request_priority ? item.request_priority : null}
                        </td>
                      ),
                    'issue_type':
                      (item) => (
                        <td>{item.issue_type ? item.issue_type : null}
                        </td>
                      ),
                    'phone_number':
                      (item) => (
                        <td>{item.phone_number ? item.phone_number : null}
                        </td>
                      ),
                    'email':
                      (item) => (
                        <td>{item.email_id ? item.email_id : null}
                        </td>
                      ),
                    'created_date':
                      (item) => (
                        <td>{item.request_date? item.request_date : null}
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
                  <CLabel htmlFor="name"><CIcon name="cil-user" className='m-1'/> Sales/Service Executive Name</CLabel>
                  <CSelect custom size="md" name="name" id="name" value={employee} onChange={(e) => setEmployee(e.target.value)}>
                    <option value="undefined">Open this select menu</option>
                    {employeesArr && employeesArr.length ? employeesArr.map((elem) => {
                      return <option key={elem.employee_id} value={elem.employee_id}>{elem.employee_name}</option>
                    }
                    ) : null}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CCol xs="8">
              <CFormGroup >
                <CLabel htmlFor="scheduleDate"><CIcon name="cil-calendar" />  Shedule Date</CLabel>
                <CInput type="date" id="scheduleDate" name="scheduleDate" placeholder="scheduleDate" value={scheduleDate} onChange={(e) => setSheduleDate(e.target.value)} />
              </CFormGroup>
            </CCol>
            <CCol xs="8" >
              <CFormGroup >
                <CLabel htmlFor="scheduleTime"><CIcon name="cil-clock" /> Shedule Time</CLabel>
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