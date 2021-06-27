import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CSelect,
  CRow,
  CButton,
  CFormGroup,
  CInput,
  CCardSubtitle,
  CCardFooter,
  CTextarea,
  CInputFile,
  CAlert
} from '@coreui/react'
import { useHistory } from 'react-router'
import ServiceRequestService from '../../services/serviceRequestService'
import CustomerService from '../../services/customerService'
import MachineService from '../../services/machineService'
import CommonService from '../../services/commonService'
import EmployeeService from '../../services/employeeService';
import moment from 'moment'
import CIcon from '@coreui/icons-react'

const serviceRequestService = new ServiceRequestService()
const customerSerice = new CustomerService()
const machineService = new MachineService()
const commonService = new CommonService()
const employeeService = new EmployeeService()
export default function CreateServiceRequest() {

  const history = useHistory();

  const [customerArr, setCustomerArr] = useState()
  const [customerName, setCustomerName] = useState("")
  const [company, setCompany] = useState("")
  const [customerCode, setCustomerCode] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [alternateNumber, setAlternateNumber] = useState("")
  const [email, setEmail] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")

  const [machineArr, setMachineArr] = useState("")
  const [machine, setMachine] = useState("")
  const [machineSerialNo, setMachineSerialNo] = useState("")
  const [machineType, setMachineType] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [machineAge, setMachineAge] = useState("")
  const [machineController, setMachineController] = useState("")
  const [controllerModel, setControllerModel] = useState("")

  const [employeesArr, setEmployeesArr] = useState()

  const [allIssueTypes, setAllIssueTypes] = useState()
  const [issueType, setIssueType] = useState("")
  const [priority, setPriority] = useState("")
  const [executive, setExecutive] = useState("")
  const [serviceRequestType,setServiceRequestType] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [issueDetails, setIssueDetails] = useState("")
  const [alert, setAlert] = useState(false)

  const cancelHandler = () => {
    history.push('./overview')
  }

  const submitHandler = async () => {
    let currentData = {}
    // currentData.id = Math.round(Math.random() * 10000000)
    // currentData.servicerequestId = 'UPNLSR' + Math.round(Math.random() * 100000)
    currentData.status = 'Assigned'
    currentData.client_id = customerName
    currentData.machine_id = machine
    currentData.customerName = customerName
    currentData.company = company
    currentData.customerCode = customerCode
    currentData.contactName = contactName
    currentData.contactNumber = contactNumber
    currentData.alternateNumber = alternateNumber
    currentData.email = email
    currentData.customerAddress = customerAddress
    currentData.machine = machine
    currentData.machineSerialNo = machineSerialNo
    currentData.machineType = machineType
    currentData.make = make
    currentData.model = model
    currentData.machineAge = machineAge
    currentData.machineController = machineController
    currentData.controllerModel = controllerModel
    currentData.issue_type = issueType
    currentData.request_priority = priority
    currentData.employee_id = executive
    currentData.expected_resolution_date = moment(new Date(date + ' ' + time)).format('YYYY-MM-DD HH:mm:ss')
    currentData.site_visit_date = moment(new Date(date + ' ' + time)).format('YYYY-MM-DD HH:mm:ss')
    currentData.service_request_type = serviceRequestType

    currentData.time = time
    currentData.request_detail = issueDetails
    // currentData.ISSUE_TYPE= { 0: "ELECTRICAL", 1: "MECHANICAL" }
    currentData.createdDate = moment().format('MMMM Do YYYY, h:mm:ss a')
    console.log(currentData)
    try {
    let res = await serviceRequestService.createServiceReq(currentData)
    history.push({
      pathname: './servicerequest',
      state: 'Service Request added'
    })
  } catch (err) {
    console.log('err', err.message)
    setAlert(true)
}
  }

  const customerChangeHandler = async (e) => {
    let customerId = e.target.value
    let selectedCustomer = customerArr.find((elem) => elem.client_id == customerId)
    console.log(selectedCustomer)
    setCompany(selectedCustomer.company)
    setCustomerName(selectedCustomer.client_id)
    setCustomerCode(selectedCustomer.client_id)
    setContactName(selectedCustomer.contact_person)
    setContactNumber(selectedCustomer.phone_number)
    setAlternateNumber(selectedCustomer.alternate_phone_number)
    setEmail(selectedCustomer.email_id)
    setCustomerAddress(selectedCustomer.address)

    console.log(machineArr)
    console.log(customerId)
    let res = await machineService.getAllMachines()
    console.log(res.data)
    let filteredMachinesArr = res.data.filter(item => item.client.client_id == customerId)
    console.log(filteredMachinesArr)
    setMachineArr(filteredMachinesArr)
  }

  const machineChangeController = (e) => {
    let machineId = e.target.value
    let selectedMachine = machineArr.find((elem) => elem.machine_id == machineId)
    console.log(selectedMachine)
    setMachine(selectedMachine.machine_id)
    setMachineSerialNo(selectedMachine.machine_serial_number)
    setMachineType(selectedMachine.machine_type)
    setMake(selectedMachine.machine_make)
    setModel(selectedMachine.machine_model)
    setMachineAge(selectedMachine.machine_age_as_on_installation)
    setMachineController(selectedMachine.machine_controller)
    setControllerModel(selectedMachine.machine_controller_model)
  }

  const getEmployees = async () => {
    let res = await employeeService.getEmployees()
    if (res.data) {
      setEmployeesArr(res.data)
    }
  }

  const getEnum = async () => {
    let res = await commonService.getenum()
    let issueTypeArr = []
    for (const key in res.data.ISSUE_TYPE) {
      let obj = {}
      obj.key = key
      obj.value = res.data.ISSUE_TYPE[key]
      issueTypeArr.push(obj)
    }
    console.log(issueTypeArr)
    setAllIssueTypes(issueTypeArr)
  }

  const getCustomersList = async () => {
    let res = await customerSerice.getAllCustomers()
    setCustomerArr(res.data)
  }

  const getMachinesList = async () => {
    let res = await machineService.getAllMachines()
    setMachineArr(res.data)
  }

  React.useEffect(() => {
    getCustomersList()
    getMachinesList()
    getEnum()
    getEmployees()
  }, [])

  var curr = new Date();
  curr.setDate(curr.getDate());
  var todayDate = curr.toISOString().substr(0,10);

  return (
    <>
   <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        Error occured Please try again!
      </CAlert>
      <CCard  className="mt-2">
        <CCardSubtitle className="pl-3 mt-3" style={{fontWeight: 'bold', fontSize: '1.1rem' }}>Create Service Request</CCardSubtitle>
        <hr />
        <CCardBody>
          <div className="pt-3 pl-3">
            <CRow>
              <CCol xs="12" sm="12" lg="4">
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-user" />  Customer Name: </div>
                  <CFormGroup className="ml-3">
                    <CSelect custom size="sm" name="name" id="name" value={customerName} onChange={customerChangeHandler}>
                      <option value="">Open this select menu</option>
                      {customerArr && customerArr.length ? customerArr.map((elem) => {
                        return <option key={elem.client_id} value={elem.client_id}>{elem.company}</option>
                      }
                      ) : null}
                    </CSelect>
                  </CFormGroup>
                </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-asterisk-circle" /> Customer Code :</div>
                  <span className="ml-2" >{customerCode}</span> </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-contact" /> Contact Person Name : </div>
                  <span className="ml-2">
                    {contactName}</span> </CRow>
              </CCol>
            </CRow>

            <CRow className="pt-2 pb-2">
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-mobile" /> Contact Number :  </div>
                  <span className="ml-2">
                    {contactNumber}</span> </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-mobile" /> Alternate Number :  </div>
                  <span className="ml-2">
                    {alternateNumber} </span></CRow>
              </CCol>
              <CCol xs="10" sm="12" lg="4">
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-envelope-closed" /> Email :  </div>
                  <span className="ml-2">
                    {email}</span>
                </CRow>
              </CCol>
            </CRow>

            <CRow className="pt-4">
              <CCol xs="12" sm="4" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}><CIcon name="cil-location-pin" />  Customer Address : </div>
                  <span className="ml-2">
                    {customerAddress}
                  </span> </CRow>
              </CCol>
            </CRow>

          </div>

          <CRow>
            <CCardSubtitle className="pl-3 pt-5" style={{fontSize: '1rem', fontWeight: 'bold' }}>Machine Details</CCardSubtitle>
          </CRow>
          <hr />

          <div className="pt-1 pl-3">
            <CRow>
              <CCol xs="12" sm="12" lg="4">
                <CRow>
                  <div style={{ fontWeight: 'bold' }}> Select Machine: </div>
                  <CFormGroup className="ml-3" >
                    <CSelect custom size="sm" name="name" id="name" value={machine} onChange={machineChangeController}>
                      <option value="">Open this select menu</option>
                      {machineArr && machineArr.length ? machineArr.map((elem) => {
                        return <option key={elem.machine_id} value={elem.machine_id}>{elem.machine_model}</option>
                      }
                      ) : null}

                    </CSelect>
                  </CFormGroup>
                </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}> Machine Serial Number : </div>
                  <span className="ml-2">
                    {machineSerialNo}</span>  </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Machine Type :</div>
                  <span className="ml-2">
                    {machineType} </span> </CRow>
              </CCol>
            </CRow>
            <CRow className="pt-2 pb-2">
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}>  Make: </div>
                  <span className="ml-2">
                    {make} </span>
                </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}>   Model: </div>
                  <span className="ml-2">
                    {model} </span> </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}>   Machine Age:  </div>
                  <span className="ml-2">
                    {machineAge} </span> </CRow>
              </CCol>
            </CRow>
            <CRow className="pt-4">
              <CCol xs="12" sm="12" lg="4" >
                <CRow>
                  <div style={{ fontWeight: 'bold' }}>   Machine Controller: </div>
                  <span className="ml-2">
                    {machineController} </span> </CRow>
              </CCol>
              <CCol xs="12" sm="12" lg="4" >
                <CRow >
                  <div style={{ fontWeight: 'bold' }}>  Controller Model: </div>
                  <span className="ml-2">
                    {controllerModel} </span> </CRow>
              </CCol>
            </CRow>
          </div>

          <CRow>
            <CCardSubtitle className="pl-3 pt-5" style={{fontSize: '1rem', fontWeight: 'bold' }}>Issue Details</CCardSubtitle>
          </CRow>
          <hr />

          <div className="pt-1 pl-3">
          <CRow>
            <CCol xs="12" sm="12" lg="4" >
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-chevron-circle-right-alt" className='m-1'/> Issue Type:
                <CFormGroup className="ml-3" value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                  <CSelect custom size="sm" name="name" id="name">
                    <option value="undefined">Open this select menu</option>
                    {allIssueTypes && allIssueTypes.length ? allIssueTypes.map((elem) => {
                      return <option key={elem.value} value={elem.value}>{elem.value}</option>
                    }
                    ) : null}
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="12" sm="12" lg="4" >
              <CRow style={{ fontWeight: 'bold' }}>
              <CIcon name="cil-asterisk-circle" className='m-1'/> Priority:
                <CFormGroup className="ml-3" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <CSelect custom size="sm" name="name" id="name">
                    <option value="undefined">Open this select menu</option>
                    <option value="HIGH">High</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="12" sm="12" lg="4" >
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-tags" className='m-1'/> Service Request Type :
                <CFormGroup className="ml-3" value={serviceRequestType} onChange={(e) => setServiceRequestType(e.target.value)}>
                  <CSelect custom size="sm" name="name" id="name"  className="w-100">
                  <option value="undefined">Open this select</option>
                  <option value="AMC">AMC</option>
                    <option value="BREAKDOWN">Breakdown</option>
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
          </CRow>
          <CRow className="pt-2 pb-2">
          <CCol xs="12" sm="12" lg="4" >
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-user" className='m-1'/>   Executive:
                <CFormGroup className="ml-3" value={executive} onChange={(e) => setExecutive(e.target.value)}>
                  <CSelect custom size="sm" name="name" id="name">
                    <option value="undefined">Open this select menu</option>
                    {employeesArr && employeesArr.length ? employeesArr.map((elem) => {
                      return <option key={elem.employee_id} value={elem.employee_id}>{elem.employee_name}</option>
                    }
                    ) : null}
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
          <CCol xs="12" sm="12" lg="4">
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-calendar" className='m-1'/> Schedule Date:
                <CFormGroup className="ml-3" value={date} onChange={(e) => setDate(e.target.value)} >
                  <CInput type="date" id="sheduleDate" name="sheduleDate" placeholder="sheduleDate" size="sm" defaultValue={todayDate}/>
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="12" sm="12" lg="4">
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-clock" className='m-1'/> Schedule Time:
                <CFormGroup className="ml-3" value={time} onChange={(e) => setTime(e.target.value)}>
                  <CInput type="time" id="sheduleTime" name="sheduleTime" placeholder="sheduleTime"  size="sm"/>
                </CFormGroup>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
          <CCol xs="12" sm="12" lg="4">
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-color-border" />  Issue Details:
                <CTextarea
                  name="issueDetails"
                  id="issueDetails"
                  className="w-50"
                  style={{ marginLeft: '6%' }}
                  rows="2"
                  placeholder=" Issue Details"
                  value={issueDetails}
                  onChange={(e) => setIssueDetails(e.target.value)}
                />
              </CRow>
            </CCol>

            <CCol xs="12" sm="12" lg="4">
              <CRow style={{fontWeight: 'bold' }}>
              <CIcon name="cil-cog" className='m-1'/>  MachinePicture:
                <CFormGroup className="ml-3">
                  <CInputFile id="machinePicture" name="machinePicture" />
                </CFormGroup>
              </CRow>
            </CCol>
          </CRow>
          </div>

          <CRow style={{ justifyContent: 'center' }}>
            <CCardFooter style={{ width: '25%' }}>

              <CRow>
                <CCol xs="6">
                  <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/serviceRequest')}
                  >Cancel</CButton>
                </CCol>
                <CCol xs="6">
                  <CButton block color="info" className="mr-1" onClick={submitHandler}
                  >Submit</CButton>
                </CCol>
              </CRow>

            </CCardFooter>
          </CRow>

        </CCardBody>
      </CCard>
    </>
  )
}