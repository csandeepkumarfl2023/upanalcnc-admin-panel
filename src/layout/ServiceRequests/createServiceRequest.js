import React , {useState} from 'react'
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
  } from '@coreui/react'
import { useHistory } from 'react-router'
import ServiceRequestService from '../../services/serviceRequestService'
import CustomerService from '../../services/customerService'
import MachineService from '../../services/machineService'
import moment from 'moment'

const serviceRequestService = new ServiceRequestService()
const customerSerice = new CustomerService()
const machineService = new MachineService()
export default function CreateServiceRequest() {

    const  history  = useHistory();

    const [customerArr, setCustomerArr] = useState()
    const[customerName,setCustomerName] = useState("")
    const[company,setCompany] = useState("")
    const[customerCode,setCustomerCode] = useState("")
    const[contactName,setContactName] = useState("")
    const[contactNumber,setContactNumber] = useState("")
    const[alternateNumber,setAlternateNumber] = useState("")
    const[email,setEmail] = useState("")
    const[customerAddress, setCustomerAddress] = useState("")

    const [machineArr, setMachineArr] = useState("")
    const [machine,setMachine] = useState("")
    const [machineSerialNo, setMachineSerialNo] = useState("")
    const [machineType, setMachineType] = useState("")
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [machineAge, setMachineAge] = useState("")
    const [machineController, setMachineController] = useState("")
    const [controllerModel, setControllerModel] = useState("")

    const [issueType,setIssueType] = useState("")
    const [priority,setPriority] = useState("")
    const [executive,setExecutive] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [issueDetails,setIssueDetails] = useState("")

    const  cancelHandler = () => {
        history.push('./overview')
    }

    const submitHandler = async() => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.servicerequestId = 'UPNLSR' + Math.round(Math.random() * 100000)
        currentData.status = 'Assigned'
        currentData.customerName = customerName
        currentData.company = company
        currentData.customerCode = customerCode
        currentData.contactName=contactName
        currentData.contactNumber=contactNumber
        currentData.alternateNumber=alternateNumber
        currentData.email=email
        currentData.customerAddress = customerAddress
        currentData.machine=machine
        currentData.machineSerialNo = machineSerialNo
        currentData.machineType = machineType
        currentData.make = make
        currentData.model = model
        currentData.machineAge = machineAge
        currentData.machineController = machineController
        currentData.controllerModel = controllerModel
        currentData.issueType=issueType
        currentData.priority=priority
        currentData.executive=executive
        currentData.date=date
        currentData.time=time
        currentData.issueDetails=issueDetails
        currentData.createdDate = moment().format('MMMM Do YYYY, h:mm:ss a')
        console.log(currentData)
        let res = await serviceRequestService.createServiceReq(currentData)
        history.push('./servicerequest')
    }

    const customerChangeHandler = (e) => {
      let customerId = e.target.value
      let selectedCustomer = customerArr.find((elem) => elem.id == customerId )
      console.log(selectedCustomer)
      setCompany(selectedCustomer.customerName)
      setCustomerName(selectedCustomer.id)
      setCustomerCode(selectedCustomer.customerCode)
      setContactName(selectedCustomer.contactPerson)
      setContactNumber(selectedCustomer.mobileNo)
      setAlternateNumber(selectedCustomer.alternateNo)
      setEmail(selectedCustomer.email)
      setCustomerAddress(selectedCustomer.address)
    }

    const machineChangeController = (e) => {
      let machineId = e.target.value
      let selectedMachine = machineArr.find((elem) => elem.id == machineId )
      console.log(selectedMachine)
      setMachine(selectedMachine.id)
      setMachineSerialNo(selectedMachine.machineSerialNo)
      setMachineType(selectedMachine.machineType)
      setMake(selectedMachine.make)
      setModel(selectedMachine.model)
      setMachineAge(selectedMachine.machineAge)
      setMachineController(selectedMachine.controller)
      setControllerModel(selectedMachine.controllerModel)
    }

    const getCustomersList = async() => {
      let res = await customerSerice.getAllCustomers()
      setCustomerArr(res)
    }

    const getMachinesList = async() => {
      let res = await machineService.getAllMachines()
      setMachineArr(res)
    }

    React.useEffect(() => {
      getCustomersList()
      getMachinesList()
    },[])
    
    return (
        <CCard>
           <CCardHeader><CCardSubtitle>Create Service Request</CCardSubtitle></CCardHeader>
           <CCardBody>
            <CRow>
             <CCol xs="12" md="4">
                <CRow style={{marginLeft:'1%'}}>
                 Customer Name: 
               <CFormGroup style={{marginLeft:'3%'}}>
               <CSelect custom size="md" name="name" id="name" value={customerName} onChange={customerChangeHandler}>
                 <option value="">Open this select menu</option>
                 {customerArr && customerArr.length ? customerArr.map((elem) => {
                   return <option key={elem.id} value={elem.id}>{elem.customerName}</option>
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
               <CCol xs="12" md="4">
               Customer Code : {customerCode}
               </CCol>
               <CCol xs="12" lg="4">
              Contact Person Name : {contactName}
               </CCol>
           </CRow>

           <CRow >
        <CCol xs="10" lg="4">
           Contact Number : {contactNumber}
        </CCol>
        <CCol xs="10" lg="4">
           Alternate Number : {alternateNumber}
        </CCol>
        <CCol xs="10" lg="4">
          Email : {email}
        </CCol>
        </CRow>

        <CRow><CCol xs="10" lg="10" style={{marginTop:'2%'}}>Customer Address : {customerAddress}</CCol></CRow>
        <CCardHeader>
      <CCardFooter>
      <CCardSubtitle>Machine Details</CCardSubtitle></CCardFooter></CCardHeader>
      <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="4">
        <CRow style={{marginLeft:'1%'}}>
           Select Machine : 
           <CFormGroup style={{marginLeft:'3%'}}>
               <CSelect custom size="md" name="name" id="name"  value={machine} onChange={machineChangeController}>
                 <option value="">Open this select menu</option>
                 {machineArr && machineArr.length ? machineArr.map((elem) => {
                   return <option key={elem.id} value={elem.id}>{elem.machineType}</option>
                 }
                   ) : null}
                
               </CSelect>
             </CFormGroup>
             </CRow>
        </CCol>
        <CCol xs="10" lg="4">
          Machine Serial Number : {machineSerialNo}
        </CCol>
        <CCol xs="10" lg="4">
          Machine Type : {machineType}
        </CCol>
        </CRow>
        <CRow >
        <CCol xs="10" lg="4">
            Make: {make}
        </CCol>
        <CCol xs="10" lg="4">
           Model: {model}
        </CCol>
        <CCol xs="10" lg="4">
           Machine Age: {machineAge}
        </CCol>
        </CRow>
        <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="4">
            Machine Controller: {machineController}
        </CCol>
        <CCol xs="10" lg="4">
          Controller Model: {controllerModel}
        </CCol>  
        </CRow>

        <CCardFooter>
            <CCardHeader>
            <CCardSubtitle>Issue Details</CCardSubtitle>
            </CCardHeader>
        </CCardFooter>
        <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="4">
        <CRow style={{marginLeft:'1%'}}>
        Issue Type: 
           <CFormGroup style={{marginLeft:'3%'}} value={issueType} onChange={(e)=> setIssueType(e.target.value)}>
               <CSelect custom size="md" name="name" id="name">
                 <option value="undefined">Open this select menu</option>
                 <option value="Electrical">Electrical</option>
                 <option value="Mechanical">Mechanical</option>
               </CSelect>
             </CFormGroup>
             </CRow>
        </CCol>
        <CCol xs="10" lg="4">
        <CRow style={{marginLeft:'1%'}}>
        Priority:
           <CFormGroup style={{marginLeft:'3%'}} value={priority} onChange={(e)=> setPriority(e.target.value)}>
               <CSelect custom size="md" name="name" id="name">
                 <option value="undefined">Open this select menu</option>
                 <option value="High">High</option>
                 <option value="Low">Low</option>
               </CSelect>
             </CFormGroup>
             </CRow>
        </CCol>
        <CCol xs="10" lg="4">
        <CRow style={{marginLeft:'1%'}}>
        Executive:
           <CFormGroup style={{marginLeft:'3%'}} value={executive} onChange={(e)=> setExecutive(e.target.value)}>
               <CSelect custom size="md" name="name" id="name">
                 <option value="undefined">Open this select menu</option>
                 <option value="Naveen">Naveen</option>
                 <option value="Sandeep">Sandeep</option>
               </CSelect>
             </CFormGroup>
             </CRow>
        </CCol>
        </CRow>
        <CRow>
        <CCol xs="10" sm="4">
            <CRow style={{marginLeft:'1%'}}>
           Schedule Date: 
            <CFormGroup style={{marginLeft:'3%'}} value={date} onChange={(e)=> setDate(e.target.value)}>
            <CInput type="date" id="sheduleDate" name="sheduleDate" placeholder="sheduleDate" />
          </CFormGroup>
          </CRow>
        </CCol>
        <CCol xs="10" sm="4">
            <CRow style={{marginLeft:'1%'}}>
           Schedule Time: 
            <CFormGroup style={{marginLeft:'3%'}} value={time} onChange={(e)=> setTime(e.target.value)}>
            <CInput type="time" id="sheduleTime" name="sheduleTime" placeholder="sheduleTime" />
          </CFormGroup>
          </CRow>
        </CCol>
        </CRow>
        <CRow>
        <CCol xs="12" lg="4">
        <CRow style={{marginLeft:'1%'}}>
         Issue Details: 
         <CTextarea
                  name="issueDetails"
                  id="issueDetails"
                  rows="2"
                  placeholder=" Issue Details"
                  value={issueDetails}
                  onChange={(e)=> setIssueDetails(e.target.value)}
            />
            </CRow>
        </CCol>

        <CCol xs="10" lg="4">
           Upload Machine Pictures: 
           <CFormGroup style={{marginLeft:'3%'}}>
            <CInput type="text" id="picture" name="picture" placeholder="Machine Picture" />
          </CFormGroup>
        </CCol>
        </CRow>

            <CCardFooter style={{width:'15%',marginLeft:'70%'}}>
            <CRow>
             <CButton block  color="info" className="mr-1"  onClick={submitHandler}
            >Submit</CButton>    
            <CButton block  color="info" className="mr-1" onClick={cancelHandler}
            >Cancel</CButton> 
            </CRow> 
            </CCardFooter>
    </CCardBody>
</CCard>
    )
}