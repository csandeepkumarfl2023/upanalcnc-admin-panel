import React, { useState } from 'react'

import {
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
  CButtonGroup,
  CSelect,
  CLink
} from '@coreui/react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import ServiceRequestService from '../../services/serviceRequestService'
import SalesVisitService from '../../services/salesVisitService'
import PmService from '../../services/pmService';
import { Doughnut } from 'react-chartjs-2'
import EmployeeService from '../../services/employeeService';
import moment from 'moment'
import PmChart from '../Charts/PmChart';
import SalesvisitChart from '../Charts/SalesvisitChart';
import PaymentChart from '../Charts/PaymentChart';
import ServiceChart from '../Charts/ServiceChart';

const fields = ['servicerequestId', 'company', 'priority', 'issue_type', 'executive', 'status', 'contactNumber', 'email', 'createdDate']

const pmfields = ['name', 'type', 'description']

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

const salesvisitService = new SalesVisitService()
const serviceRequestService = new ServiceRequestService()
const employeeService = new EmployeeService()
const pmservice = new PmService()


export default function Overview() {

  const history = useHistory();

  const [serviceReqChartSeries, setServiceChartSeries] = React.useState()
  const [serviceReqChartLabels, setServiceChartLabels] = React.useState()
  const [serviceReqChartColors, setServiceReqChartColors] = React.useState()

  const [pmChartSeries, setPmChartSeries] = React.useState([1, 2])
  const [pmChartLabels, setPmChartLabels] = React.useState(['ACCEPTED', 'OPEN'])
  const [pmChartColors, setPmChartColors] = React.useState(['#8C88FF', '#00B9FF'])

  const [paymentChartSeries, setPaymentChartSeries] = React.useState([3, 2, 3])
  const [paymentChartLabels, setPaymentChartLabels] = React.useState(['NEW', 'ASSIGNED', 'OVERDUE'])
  const [paymentChartColors, setPaymentChartColors] = React.useState(['#00B9FF', '#D667CD','#FF3366'])

  const [salesVisitChartSeries, setSalesVisitChartSeries] = React.useState([1, 2])
  const [salesVisitChartLabels, setSalesVisitChartLabels] = React.useState(['PENDING', 'INPROGRESS'])
  const [salesVisitChartColors, setSalesVisitChartColors] = React.useState(['#FCAB53', '#50D2C2'])

  const [data, setData] = useState([])

  const [servicedata, setServiceData] = useState([])

  const [pmData, setPmData] = useState([])

  const [assign, setAssign] = useState([])

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
  const [info, setInfo] = useState(false)
  const [serviceinfo, setServiceInfo] = useState(false)

  const [loading, setLoading] = useState(false)
  const [servicerequestId, setServiceRequestId] = useState("")
  const [status, setStatus] = useState("")
  const [issueType, setIssueType] = useState("")
  const [priority, setPriority] = useState("")
  const [company, setCompany] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [executive, setExecutive] = useState("")
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const [employeesArr, setEmployeesArr] = useState()

  const [editAlert, setEditAlert] = useState(false)
  const [errAlertText, setErrorAlertText] = useState()
  const [errAlert, setErrAlert] = useState(false)

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [exeUpdateId, setExeUpdateId] = useState()


  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [name, setName] = useState("")
  const [pmEditModal, setPmEditModal] = useState(false)
  const [pmAddModal, setPmAddModal] = useState(false)
  const [executiveinfo, setExecutiveInfo] = useState(false)

  const [employee, setEmployee] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  const [serviceReqLength,setServiceReqLength] = useState("")
  const [salesVisitLength,setSalesVisitLength] = useState("")
  const [pmLength,setPmLength] = useState("")

  const submitHandler = async () => {
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.servicerequestId = "UPNLBKN" + Math.round(Math.random() * 100000)
    currentData.status = status
    currentData.issueType = issueType
    currentData.priority = priority
    currentData.company = company
    currentData.createdDate = createdDate
    currentData.executive = executive
    currentData.email = email
    let res = await salesvisitService.postSalesVisit(currentData)
    getSalesvisitData()
    setInfo(false)

  }
  const editBtnHandler = async () => {
    let updatedData = {}
    updatedData.id = updateId
    updatedData.servicerequestId = servicerequestId
    updatedData.status = status
    updatedData.issueType = issueType
    updatedData.company = company
    updatedData.executive = executive
    updatedData.email = email
    updatedData.createdDate = createdDate
    updatedData.priority = priority
    let res = await salesvisitService.putSalesVisit(updatedData, updateId)
    setEditModal(false)
    setEditAlert(true)
    getSalesvisitData()
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
  const deleteHandler = async () => {
    let res = await salesvisitService.deleteSalesVisit(updateId)
    getSalesvisitData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setDeleteAlert(true)
    }, 3000);
  }

  const submitServie = () => {
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.servicerequestId = "Ul456578"
    currentData.status = status
    currentData.issueType = issueType
    currentData.priority = priority
    currentData.company = company
    currentData.createdDate = createdDate
    //  currentData.executive=executive
    currentData.email = email
    let allData = [...servicedata]
    allData.push(currentData)
    setServiceData(allData)
    setServiceInfo(!serviceinfo)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setAlert(true)
    }, 3000);

  }



  const getServiceData = async () => {
    let res = await serviceRequestService.getAllServiceRequests()

    let labelArr = []
    let seriesArr = []
    let colorsArr = []
    res.data.forEach((elem) => {
      labelArr.push(elem.request_status)
      seriesArr.push(elem.service_requests.length)
      colorsArr.push(getBadge(elem.request_status))
    })
    // setServiceChartdata(chartArr)
    setServiceChartLabels(labelArr)
    setServiceChartSeries(seriesArr)
    setServiceReqChartColors(colorsArr)
    let mappedRes = []
    res.data.forEach(elem => mappedRes.push(...elem.service_requests))
     setServiceReqLength(mappedRes.length)
    setServiceData(mappedRes.slice(0, 3))

  }

  const getSalesvisitData = async () => {
    let res = await salesvisitService.getAllSalesVisits()
    setSalesVisitLength(res.length)
    setData(res.slice(0, 3)) 
  }

  const getPmData = async () => {
    let res = await pmservice.getAllPms()
    setPmLength(res.length)
    setPmData(res.slice(0, 3))
  }

  React.useEffect(() => {
    getServiceData()
    getSalesvisitData()
    getPmData()
    getEmployees()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

  const pmSubmitHandler = async () => {
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.description = description
    currentData.type = type
    currentData.name = name
    let res = await pmservice.postPm(currentData)
    getPmData()
    setPmAddModal(!pmAddModal)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setAlert(true)
    }, 3000);
  }
  const pmeEditHandler = async () => {
    let updatedData = {}
    updatedData.id = updateId
    updatedData.description = description
    updatedData.type = type
    updatedData.name = name
    let res = await pmservice.putPm(updatedData, updateId)
    getPmData()
    setPmEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setEditAlert(true)
    }, 3000);
  }
  const pmDeleteHandler = async () => {
    let res = await pmservice.deletePm(updateId)
    getPmData()
    setPmEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setDeleteAlert(true)
    }, 3000);
  }

  const executiveHandler = async () => {
    if (employee === '') {
      setExecutiveInfo(executiveinfo)
    }
    else {
      let currentData = {}
      currentData.employee_id = employee
      currentData.request_status = 'ASSIGNED'
      currentData.workstep_detail = {
        site_visit_date: moment(new Date(scheduleDate + ' ' + scheduleTime)).format('YYYY-MM-DD HH:mm:ss')
      }
      try {
        let res = await serviceRequestService.updateServiceRequest(currentData, exeUpdateId)
        getServiceData()
        setExecutiveInfo(false)
        setEditAlert(true)
      } catch (err) {
        setExecutiveInfo(false)
        setErrorAlertText(err.message || 'Error occured Please try again!')
        setErrAlert(true)
      }
    }
  }

  const getEmployees = async () => {
    let res = await employeeService.getEmployees()
    if (res.data) {
      setEmployeesArr(res.data)
    }
  }

  const editServiceHandler = (item) => {
    history.push({
      pathname: `/editServiceRequest/${item.service_request_id}`,
      state: item
    });
  }
  const addServiceHandler = () => {
    history.push('./createServiceRequest')
  }

  const servicerequestshow = (item) => {
    history.push({
      pathname: '/serviceRequest',
      state: item
    });
  }

  const SalesVisitshow = (item) => {
    history.push({
      pathname: '/sales_visit',
      state: item
    });
  }
  const pmmethodshow = (item) => {
    history.push({
      pathname: '/pm',
      state: item
    });
  }
  return (
    <>
      <div className="sweet-loading">
        <ClipLoader loading={loading} css={override} size={50} color='#2f4f4f' />
      </div>
      <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        Successfully Added!
      </CAlert>
      <CAlert color="success" show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
        Executive updated Successfully!
      </CAlert>

      <CAlert color="danger" show={errAlert} closeButton onClick={() => setErrAlert(false)} dismissible>
        {errAlertText}
      </CAlert>

      <CRow style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
        <CFormGroup>
          <CRow>
            <div className="mfe-2 c-subheader-nav">
              <CButtonGroup>
                <CButton color="secondary">Days</CButton>
                <CButton color="secondary">Weeks</CButton>
                <CButton color="secondary">Months</CButton>
              </CButtonGroup>
            </div>
            <CInput type="date" id="date-input" name="date-input" placeholder="date" style={{ width: '30%', marginTop: '1.5%' }} />
            <CInput type="date" id="date-input" name="date-input" placeholder="date" style={{ width: '30%', marginTop: '1.5%' }} />
          </CRow>
        </CFormGroup>
      </CRow>

      <CRow>
        {!loading ?
          <>

            <CCol>
              <CCard >
                <CCardHeader>

                  <CRow>
                    <CCol sm="2">
                      <CIcon name="cib-aurelia" style={{ color: 'gray' }} />

                    </CCol>
                    <CCol style={{ alignItems: 'flex-start'}}>
                      <b>Service Requests</b>
                    </CCol>

                  </CRow>
                </CCardHeader>

                <CRow>
                  <CCol>
                    <ServiceChart series={serviceReqChartSeries} labels={serviceReqChartLabels} colors={serviceReqChartColors} />
                  </CCol>
                </CRow>
              </CCard>
            </CCol>

            <CCol>
            <CCard >
                <CCardHeader>

                  <CRow>
                    <CCol sm="2">
                      <CIcon name="cil-briefcase" style={{ color: 'gray' }} />

                    </CCol>
                    <CCol style={{ alignItems: 'flex-start'}}>
                    <b>Sales Visits</b>
                    </CCol>

                  </CRow>
                </CCardHeader>
                <CRow>
                  <CCol>
                    <SalesvisitChart series={salesVisitChartSeries} labels={salesVisitChartLabels} colors={salesVisitChartColors} />
                    
                  </CCol>
                </CRow>
              </CCard>
            </CCol>

            <CCol>
            <CCard >
                <CCardHeader>

                  <CRow>
                    <CCol sm="2">
                      <CIcon name="cib-cc-amazon-pay" style={{ color: 'gray' }} />

                    </CCol>
                    <CCol style={{ alignItems: 'flex-start'}}>
                    <b>Payments</b>
                    </CCol>

                  </CRow>
                </CCardHeader>
                  <PaymentChart series={paymentChartSeries} labels={paymentChartLabels} colors={paymentChartColors} />
              </CCard>
            </CCol>

            <CCol xs="2" sm="2">
            <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol sm="2">
                      <CIcon name="cib-semaphoreci" style={{ color: 'gray' }} />
                    </CCol>
                    <CCol style={{ alignItems: 'flex-start'}}>
                    <b> PM </b>
                    </CCol>

                  </CRow>
                </CCardHeader>
                  <PmChart series={pmChartSeries} labels={pmChartLabels} colors={pmChartColors} />
              </CCard>
            </CCol>
            <CCol xs="4">
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
                  <CRow className="mb-2">
                    <CCol xs="10" style={{ display: 'flex', alignItems: 'center' }}>
                      <h5>
                        Service Requests {serviceReqLength}
                      </h5>
                    </CCol>
                    <CCol xs="2" style={{ width: '80px' }}>
                      <CButton block color="info" onClick={addServiceHandler}>New</CButton>
                    </CCol>
                  </CRow>
                  <CDataTable
                    items={servicedata}
                    fields={fields}
                    hover
                    
                    bordered
                    size="sm"
                    conditionalRowStyles={conditionalRowStyles}
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
                              setEmployee(item.service_request_tasks[0] ? item.service_request_tasks[0].employee.employee_id : '')
                              setScheduleDate(item.service_request_tasks[0] ? moment(item.service_request_tasks[0].site_visit_date).format('YYYY-MM-DD') : '')
                              setScheduleTime(item.service_request_tasks[0] ? moment(item.service_request_tasks[0].site_visit_date).format('HH:mm') : '')
                              setExeUpdateId(item.service_request_id)
                              setExecutiveInfo(!executiveinfo)
                            }
                            }>{item.service_request_tasks[0] ? item.service_request_tasks[0].employee.employee_name : null}
                              {<CIcon className="ml-2" name="cil-pen" size="1xl" />}</a></p>
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
                            : null}
                          </td>
                        ),
                      'company':
                        (item) => (
                          <td>{item.machine?.client.company}
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
                      'contactNumber':
                        (item) => (
                          <td>{item.machine?.client.phone_number}
                          </td>
                        ),
                      'email':
                        (item) => (
                          <td>{item.machine?.client.email_id}
                          </td>
                        ),
                      'createdDate':
                        (item) => (
                          <td>{item.request_date ? item.request_date : null}
                          </td>
                        ),
                    }}

                  />

                  <CLink color="info" style={{ marginLeft: '45%' }} onClick={servicerequestshow}>Show More</CLink>

                  <CModal
                    show={serviceinfo}
                    onClose={() => setServiceInfo(!serviceinfo)}
                    color="info"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Add New Service Request</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>

                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="company">Company</CLabel>
                            <CInput type="text" id="company" name="company" placeholder="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="priority">Priority</CLabel>
                            <CInput type="text" id="priority" name="priority" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="issueType">Issue Type</CLabel>
                            <CInput type="text" id="issueType" name="issueType" placeholder="Issue Type" value={issueType} onChange={(e) => setIssueType(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="executive">Executive</CLabel>
                            <CInput type="text" id="executive" name="executive" placeholder="Executive" value={executive} onChange={(e) => setExecutive(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="status">Status</CLabel>
                            <CInput type="text" id="status" name="status" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="createdDate">Created Date</CLabel>
                            <CInput type="date" id="createdDate" name="createdDate" placeholder="Created Date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="email">Email</CLabel>
                            <CInput type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

                <CCol xs="8" className="w-20" style={{ marginLeft: '2.5%' }}>
                  <CFormGroup >
                    <CLabel htmlFor="name">Sales/Service Executive Name</CLabel>
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
                  <CLabel htmlFor="scheduleDate">Schedule Date</CLabel>
                  <CInput type="date" id="scheduleDate" name="scheduleDate" placeholder="scheduleDate" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="8">
                <CFormGroup >
                  <CLabel htmlFor="scheduleTime">Schedule Time</CLabel>
                  <CInput type="time" id="scheduleTime" name="scheduleTime" placeholder="scheduleTime" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setExecutiveInfo(!executiveinfo)}>Cancel</CButton>
              <CButton color="info" onClick={() => { executiveHandler() }}>Assign</CButton>{' '}
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
                  <CRow className="mb-2">
                    <CCol xs="10" style={{ display: 'flex', alignItems: 'center' }}>
                      <h5>
                        Sales Visits {salesVisitLength}
                      </h5>
                    </CCol>
                    <CCol xs="2" style={{ width: '80px' }}>
                      <CButton block color="info" onClick={() => setInfo(!info)}>New</CButton>
                    </CCol>
                  </CRow>
                  <CDataTable
                    items={data}
                    fields={fields}
                    hover
                    
                    bordered
                    size="sm"
                    conditionalRowStyles={conditionalRowStyles}
                    // itemsPerPage={2}
                    // pagination
                    scopedSlots={{
                      'servicerequestId':
                        (item) => (
                          <td>
                            <CLink> <a onClick={() => {
                              setUpdateId(item.id)
                              setServiceRequestId(item.servicerequestId)
                              setCompany(item.company)
                              setIssueType(item.issueType)
                              setStatus(item.status)
                              setExecutive(item.executive)
                              setPriority(item.priority)
                              setCreatedDate(item.createdDate)
                              setEmail(item.email)
                              setEditModal(!editModal)
                            }
                            }
                            >{item.servicerequestId}</a></CLink>
                          </td>
                        ),
                      'status':
                        (item) => (
                          <td>
                            <button
                              style={{
                                backgroundColor: getBadge(item.status),
                                padding: '5px 8px',
                                borderRadius: '3px',
                                color: 'white',
                                fontSize: '13px',
                                width: '70px',
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                outline: 'none',
                                border: 'none',
                              }}>{item.status}</button>
                          </td>
                        ),
                      'executive':
                        (item) => (
                          <td>{item.executive ? item.executive : null}</td>
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
                      'issueType':
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
                  <CLink color="info" style={{ marginLeft: '45%' }} onClick={SalesVisitshow}>Show More</CLink>

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
                            <CInput type="text" id="company" name="company" placeholder="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="priority">Priority</CLabel>
                            <CInput type="text" id="priority" name="priority" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="issueType">Issue Type</CLabel>
                            <CInput type="text" id="issueType" name="issueType" placeholder="Issue Type" value={issueType} onChange={(e) => setIssueType(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="executive">Executive</CLabel>
                            <CInput type="text" id="executive" name="executive" placeholder="Executive" value={executive} onChange={(e) => setExecutive(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="status">Status</CLabel>
                            <CInput type="text" id="status" name="status" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="createdDate">Created Date</CLabel>
                            <CInput type="date" id="createdDate" name="createdDate" placeholder="Created Date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="email">Email</CLabel>
                            <CInput type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                      <CInput type="text" id="company" name="company" placeholder="company" value={company ? company : ''} onChange={(e) => setCompany(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="priority">Priority</CLabel>
                      <CInput type="text" id="priority" name="priority" placeholder="Priority" value={priority ? priority : ''} onChange={(e) => setPriority(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="issueType">Issue Type</CLabel>
                      <CInput type="text" id="issueType" name="issueType" placeholder="Issue Type" value={issueType ? issueType : ''} onChange={(e) => setIssueType(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="executive">Executive</CLabel>
                      <CInput type="text" id="executive" name="executive" placeholder="Executive" value={executive ? executive : ''} onChange={(e) => setExecutive(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="status">Status</CLabel>
                      <CInput type="text" id="status" name="status" placeholder="Status" value={status ? status : ''} onChange={(e) => setStatus(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="createdDate">Created Date</CLabel>
                      <CInput type="date" id="createdDate" name="createdDate" placeholder="Created Date" value={createdDate ? createdDate : ''} onChange={(e) => setCreatedDate(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput type="text" id="email" name="email" placeholder="Email" value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={deleteHandler}>Delete</CButton>
                <CButton color="info" onClick={editBtnHandler}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
          </CRow>

          {/* PM */}
          <CRow>
            <CCol xs="12" lg="12">
              <CCard>
                <CCardBody>
                  <CRow className="mb-2">
                    <CCol xs="10" style={{ display: 'flex', alignItems: 'center' }}>
                      <h5>PM {pmLength}</h5>
                    </CCol>
                    <CCol xs="2" style={{ width: '80px' }}>
                      <CButton color="info" onClick={() => setPmAddModal(!pmAddModal)} style={{ height: '100%', width: '100%' }}>New</CButton>
                    </CCol>
                  </CRow>
                  <CDataTable
                    items={pmData}
                    fields={pmfields}
                    hover
                    
                    bordered
                    size="sm"
                    conditionalRowStyles={conditionalRowStyles}
                    // itemsPerPage={2}
                    // pagination
                    scopedSlots={{
                      'name':
                        (item) => (
                          <td>
                            <CLink> <a onClick={() => {
                              setUpdateId(item.id)
                              setName(item.name)
                              setDescription(item.description)
                              setType(item.type)

                              setPmEditModal(!pmEditModal)
                            }
                            }
                            >{item.name}</a></CLink>
                          </td>
                        )
                    }}

                  />
                  <CLink color="info" style={{ marginLeft: '45%' }} onClick={pmmethodshow}>Show More</CLink>

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
                            <CInput type="text" id="name" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="type">Type</CLabel>
                            <CInput type="text" id="type" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" md="6">
                          <CFormGroup >
                            <CLabel htmlFor="description">Description</CLabel>
                            <CInput type="text" id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
                      <CInput type="text" id="name" name="name" placeholder="name" value={name ? name : ''} onChange={(e) => setName(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="type">Type</CLabel>
                      <CInput type="text" id="type" name="type" placeholder="Type" value={type ? type : ''} onChange={(e) => setType(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" md="6">
                    <CFormGroup >
                      <CLabel htmlFor="description">Description</CLabel>
                      <CInput type="text" id="description" name="description" placeholder="Description" value={description ? description : ''} onChange={(e) => setDescription(e.target.value)} />
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