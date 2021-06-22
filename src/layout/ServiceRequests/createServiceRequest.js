import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
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
    currentData.expected_resolution_date = moment(date).format('YYYY-MM-DD hh: mm: ss')
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

  return (
    <>
   <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        Error occured Please try again!
      </CAlert>
      <CCard>
        <CCardHeader><CCardSubtitle style={{ marginTop: '1%', fontWeight: 'bold', fontSize: '1.1rem' }}>Create Service Request</CCardSubtitle></CCardHeader>
        <CCardBody>
          <CRow style={{ marginTop: '2%' }}>
            <CCol xs="10" lg="4">
              <CRow style={{ marginLeft: '0.1%' }}>
                <div style={{ fontWeight: 'bold' }}> Customer Name: </div>
                <CFormGroup style={{ marginLeft: '3%' }}>
                  <CSelect custom size="md" name="name" id="name" value={customerName} onChange={customerChangeHandler}>
                    <option value="">Open this select menu</option>
                    {customerArr && customerArr.length ? customerArr.map((elem) => {
                      return <option key={elem.client_id} value={elem.client_id}>{elem.company}</option>
                    }
                    ) : null}

                    {/* <option value="Vamsi">Vamsi</option>
                 <option value="Sandeep">Sandeep</option>
                 <option value="Pooja">Pooja</option>
                 <option value="Vikram">Vikram</option>
                 <option value="Arun">Arun</option> */}
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="10" md="4" >
              <CRow>
                <div style={{ fontWeight: 'bold' }}> Customer Code :</div>
                <CCol xs="10" md="4">
                  {customerCode} </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4" >
              <CRow>
                <div style={{ fontWeight: 'bold' }}>   Contact Person Name : </div>
                <CCol xs="10" md="4">
                  {contactName}  </CCol> </CRow>
            </CCol>
          </CRow>

          <CRow >
            <CCol xs="10" lg="4" >
              <CRow>
                <div style={{ fontWeight: 'bold', marginLeft: '3%' }}>Contact Number :  </div>
                <CCol xs="10" md="4">
                  {contactNumber}  </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4" >
              <CRow>
                <div style={{ fontWeight: 'bold' }}>Alternate Number :  </div>
                <CCol xs="10" md="4">
                  {alternateNumber} </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
              <CRow>
                <div style={{ fontWeight: 'bold' }}>Email :  </div>
                <CCol xs="10" md="6">
                  {email}</CCol> </CRow>
            </CCol>
          </CRow>

          <CRow><CCol xs="10" lg="10" style={{ marginTop: '2%', marginLeft: '1%' }}>
            <CRow>
              <div style={{ fontWeight: 'bold' }}> Customer Address : </div>
              <CCol xs="10" md="6">
                {customerAddress}
              </CCol> </CRow>
          </CCol></CRow>
          <CCardHeader>
            <CCardSubtitle style={{ marginTop: '2%', fontSize: '1rem', marginLeft: '-2%' }}>Machine Details</CCardSubtitle></CCardHeader>
          <CRow style={{ marginTop: '2%' }}>
            <CCol xs="12" lg="4">
              <CRow style={{ marginLeft: '3%' }}>
                <CRow>
                  <div style={{ fontWeight: 'bold' }}> Select Machine : </div>
                  <CCol xs="10" md="6">
                    <CFormGroup style={{ marginLeft: '3%' }} >
                      <CSelect custom size="md" name="name" id="name" value={machine} onChange={machineChangeController} style={{ width: '150%' }}>
                        <option value="">Open this select menu</option>
                        {machineArr && machineArr.length ? machineArr.map((elem) => {
                          return <option key={elem.machine_id} value={elem.machine_id}>{elem.machine_model}</option>
                        }
                        ) : null}

                      </CSelect>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CRow>
            </CCol>
            <CCol xs="10" lg="4" >
              <CRow>
                <div style={{ fontWeight: 'bold' }}> Machine Serial Number : </div>
                <CCol xs="10" md="6">
                  {machineSerialNo} </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4" >
              <CRow>
                <div style={{ fontWeight: 'bold' }}>  Machine Type :</div>
                <CCol xs="10" md="6">
                  {machineType} </CCol> </CRow>
            </CCol>
          </CRow>
          <CRow >
            <CCol xs="10" lg="4" >
              <CRow style={{ marginLeft: '0%' }}>
                <div style={{ fontWeight: 'bold' }}>  Make: </div>
                <CCol xs="10" md="6">
                  {make} </CCol></CRow>
            </CCol>
            <CCol xs="10" lg="4" >
              <CRow>
                <div style={{ fontWeight: 'bold' }}>   Model: </div>
                <CCol xs="10" md="6">
                  {model} </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4">
              <CRow>
                <div style={{ fontWeight: 'bold' }}>   Machine Age:  </div>
                <CCol xs="10" md="6">
                  {machineAge} </CCol> </CRow>
            </CCol>
          </CRow>
          <CRow style={{ marginTop: '2%' }} >
            <CCol xs="10" lg="4">
              <CRow style={{ marginLeft: '1%' }}>
                <div style={{ fontWeight: 'bold' }}>   Machine Controller: </div>
                <CCol xs="10" md="6">
                  {machineController} </CCol> </CRow>
            </CCol>
            <CCol xs="10" lg="4" >
              <CRow >
                <div style={{ fontWeight: 'bold' }}>  Controller Model: </div>
                <CCol xs="10" md="6">
                  {controllerModel} </CCol> </CRow>
            </CCol>
          </CRow>

          <CCardHeader>
            <CCardSubtitle style={{ marginTop: '2%', fontWeight: 'bold', fontSize: '1rem', marginLeft: '-2%' }}>Issue Details</CCardSubtitle>
          </CCardHeader>
          <CRow style={{ marginTop: '2%' }}>
            <CCol xs="10" lg="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                Issue Type:
                <CFormGroup style={{ marginLeft: '9%' }} value={issueType} onChange={(e) => setIssueType(e.target.value)} className="w-50">
                  <CSelect custom size="md" name="name" id="name">
                    <option value="undefined">Open this select menu</option>
                    {allIssueTypes && allIssueTypes.length ? allIssueTypes.map((elem) => {
                      return <option key={elem.value} value={elem.value}>{elem.value}</option>
                    }
                    ) : null}
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="10" lg="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                Priority:
                <CFormGroup style={{ marginLeft: '15%' }} value={priority} onChange={(e) => setPriority(e.target.value)} className="w-50">
                  <CSelect custom size="md" name="name" id="name">
                    <option value="undefined">Open this select menu</option>
                    <option value="HIGH">High</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="10" lg="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                Executive:
                <CFormGroup style={{ marginLeft: '3%' }} value={executive} onChange={(e) => setExecutive(e.target.value)} className="w-50">
                  <CSelect custom size="md" name="name" id="name">
                    <option value="undefined">Open this select menu</option>
                    {employeesArr && employeesArr.length ? employeesArr.map((elem) => {
                      return <option key={elem.employee_id} value={elem.employee_id}>{elem.employee_name}</option>
                    }
                    ) : null}
                  </CSelect>
                </CFormGroup>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="10" sm="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                Schedule Date:
                <CFormGroup style={{ marginLeft: '3%' }} value={date} onChange={(e) => setDate(e.target.value)} className="w-50">
                  <CInput type="date" id="sheduleDate" name="sheduleDate" placeholder="sheduleDate" />
                </CFormGroup>
              </CRow>
            </CCol>
            <CCol xs="10" sm="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                Schedule Time:
                <CFormGroup style={{ marginLeft: '3%' }} value={time} onChange={(e) => setTime(e.target.value)} className="w-50">
                  <CInput type="time" id="sheduleTime" name="sheduleTime" placeholder="sheduleTime" />
                </CFormGroup>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12" lg="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                Issue Details:
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

            <CCol xs="7" lg="4">
              <CRow style={{ marginLeft: '1%', fontWeight: 'bold' }}>
                MachinePicture:
                <CFormGroup style={{ marginLeft: '2%' }}>
                  <CInputFile id="machinePicture" name="machinePicture" />
                </CFormGroup>
              </CRow>
            </CCol>
          </CRow>


          <CRow style={{ justifyContent: 'flex-end' }}>
            <CCardFooter style={{ width: '25%' }}>

              <CRow>
                <CCol xs="6">
                  <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/overview')}
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