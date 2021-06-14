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

export default function CreateServiceRequest() {

    const  history  = useHistory();
    const [data,setData] = useState([])
    const[customerName,setCustomerName] = useState("")
    const[customerCode,setCustomerCode] = useState("")
    const[contactName,setContactName] = useState("")
    const[contactNumber,setContactNumber] = useState("")
    const[alternateNumber,setAlternateNumber] = useState("")
    const[email,setEmail] = useState("")

    const [machine,setMachine] = useState("")
    const [issueType,setIssueType] = useState("")
    const [priority,setPriority] = useState("")
    const [executive,setExecutive] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [issueDetails,setIssueDetails] = useState("")

    const  cancelHandler = () => {
        history.push('./overview')
    }

    const submitHandler = () => {
        let currentData = {}
        currentData.id = Math.round(Math.random() * 10000000)
        currentData.customerName = customerName
        currentData.customerCode = customerCode
        currentData.contactName=contactName
        currentData.contactNumber=contactNumber
        currentData.alternateNumber=alternateNumber
        currentData.email=email
        currentData.machine=machine
        currentData.issueType=issueType
        currentData.priority=priority
        currentData.executive=executive
        currentData.date=date
        currentData.time=time
        currentData.issueDetails=issueDetails
        let allData = [...data] 
        allData.push(currentData)
        setData(allData)
        console.log('alldata',allData);
    }

    return (
        <CCard>
           <CCardHeader><CCardSubtitle style={{marginTop:'1%'}}>Create Service Request</CCardSubtitle></CCardHeader>
           <CCardBody>
            <CRow>
             <CCol xs="12" md="4">
                <CRow style={{marginLeft:'1%'}}>
                 Customer Name: 
               <CFormGroup style={{marginLeft:'3%'}}>
               <CSelect custom size="md" name="name" id="name" value={customerName} onChange={(e)=> setCustomerName(e.target.value)}>
                 <option value="undefined">Open this select menu</option>
                 <option value="Vamsi">Vamsi</option>
                 <option value="Sandeep">Sandeep</option>
                 <option value="Pooja">Pooja</option>
                 <option value="Vikram">Vikram</option>
                 <option value="Arun">Arun</option>
               </CSelect>
             </CFormGroup>
             </CRow>
               </CCol>
               <CCol xs="12" md="4">
               Customer Code :
               </CCol>
               <CCol xs="12" lg="4">
              Contact Person Name :
               </CCol>
           </CRow>

           <CRow >
        <CCol xs="10" lg="4">
           Contact Number : 
        </CCol>
        <CCol xs="10" lg="4">
           Alternate Number : 
        </CCol>
        <CCol xs="10" lg="4">
          Email :
        </CCol>
        </CRow>

        <CRow><CCol xs="10" lg="4" style={{marginTop:'2%'}}>Customer Address : </CCol></CRow>
        <CCardHeader>
      <CCardSubtitle style={{marginTop:'1%'}}>Machine Details</CCardSubtitle></CCardHeader>
      <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="4">
        <CRow style={{marginLeft:'1%'}}>
           Select Machine : 
           <CFormGroup style={{marginLeft:'3%'}} value={machine} onChange={(e)=> setMachine(e.target.value)}>
               <CSelect custom size="md" name="name" id="name">
                 <option value="undefined">Open this select menu</option>
                 <option value="Electrical">Electrical</option>
                 <option value="Mechanical">Mechanical</option>
               </CSelect>
             </CFormGroup>
             </CRow>
        </CCol>
        <CCol xs="10" lg="4">
          Machine Serial Number : 
        </CCol>
        <CCol xs="10" lg="4">
          Machine Type :
        </CCol>
        </CRow>
        <CRow >
        <CCol xs="10" lg="4">
            Make: 
        </CCol>
        <CCol xs="10" lg="4">
           Model: 
        </CCol>
        <CCol xs="10" lg="4">
           Machine Age: 
        </CCol>
        </CRow>
        <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="4">
            Machine Controller:
        </CCol>
        <CCol xs="10" lg="4">
          Controller Model: 
        </CCol>  
        </CRow>

            <CCardHeader>
            <CCardSubtitle style={{marginTop:'1%'}}>Issue Details</CCardSubtitle>
            </CCardHeader>
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
        {/* <CFormGroup row>
                  <CCol md="3"> */}
                  
        <CCol md="4">
            <CRow style={{marginLeft:'1%'}}>
           Schedule Date: 
            <CFormGroup style={{marginLeft:'3%'}}  row>
            <CInput type="date" id="sheduleDate" name="sheduleDate" placeholder="sheduleDate" value={date} onChange={(e)=> setDate(e.target.value)}/>
          </CFormGroup>
          </CRow>
        </CCol>
        <CCol xs="10" sm="4">
            <CRow style={{marginLeft:'1%'}}>
           Schedule Time: 
            <CFormGroup style={{marginLeft:'3%'}} row>
            <CInput type="time" id="sheduleTime" name="sheduleTime" placeholder="sheduleTime" value={time} onChange={(e)=> setTime(e.target.value)}/>
          </CFormGroup>
          </CRow>
        </CCol>
        </CRow>
        <CRow>
        <CCol xs="12" sm="4">
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

        <CCol xs="10" lg="3">
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
