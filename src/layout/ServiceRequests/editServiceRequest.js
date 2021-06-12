import React,{useState} from 'react'
import {
    CBadge,
    CCard,
    CCardHeader,
    CCardBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CAlert,
    CDataTable,
    CSelect,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
    CCardSubtitle,
    CCardFooter,
  } from '@coreui/react'

  import CIcon from '@coreui/icons-react'
  import { useHistory } from "react-router-dom";

export default function EditServiceRequest(props) {

    console.log('item',props.location.state);
    const history = useHistory();
    const [edit,setEdit] = React.useState(false)
    const [executive,setExecutive] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [data,setData] = useState([])

    const closeHandler = () => {
     history.push('/overview');
    }
    const cancelHandler = () => {
        setEdit(false)
    }

    const submitHandler = () => {
    let currentData = {}
    currentData.executive = executive
    currentData.date = date
    currentData.time=time
    let allData = [...data] 
    allData.push(currentData)
    setData(allData)
    setEdit(false)
    console.log('alldata',allData);
    }

    // let updatedData = {}
    // updatedData.id = updateId
    // updatedData.servicerequestId = servicerequestId
    // updatedData.status = status
    // updatedData.issueType=issueType
    // updatedData.company=company
    // updatedData.executive=executive
    // updatedData.email=email
    // updatedData.createdDate=createdDate
    // updatedData.priority=priority
    // let filteredArr = data.filter(function( obj ) {
    //   return obj.id !== updateId;
    // });
    // console.log(filteredArr)
    // setData([...filteredArr, updatedData])

    // setEditModal(false)
    // setEditAlert(true)
    return (
        <CCard>
            <CCardHeader>
                <CRow>
            <CCol xs="6" md="11">
            <CCardSubtitle>Service Request UPNLSR2021001</CCardSubtitle>
           </CCol>
           <CCol xs="6" md="1">
           <CIcon name="cil-pen"  size="1xl" onClick={() => setEdit(true)}/>
           </CCol>
           </CRow>
            </CCardHeader>
            <CCardBody>
            <CRow>
             <CCol xs="12" md="4">
               Customer Name: Upanal CNC Solutions
               </CCol>
               <CCol xs="12" md="4">
               Customer Code: UPNLCUST001
               </CCol>
               <CCol xs="12" lg="4">
              View Report: N/A
               </CCol>
           </CRow>
           

        <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="4">
            Issue Type: {props.location.state.issueType}
        </CCol>
        <CCol xs="10" lg="4">
           Priority: {props.location.state.priority}
        </CCol>
        <CCol xs="10" lg="4">
           Status:  {props.location.state.status}
        </CCol>
        </CRow>

        <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" sm="4">
           Executive:   
           {edit ? 
             <CFormGroup >
               <CSelect custom size="md" name="name" id="name" value={executive} onChange={(e)=> setExecutive(e.target.value)}>
                 <option value="undefined">Open this select menu</option>
                 <option value="Vamsi">Vamsi</option>
                 <option value="Sandeep">Sandeep</option>
                 <option value="Pooja">Pooja</option>
                 <option value="Vikram">Vikram</option>
                 <option value="Arun">Arun</option>
               </CSelect>
             </CFormGroup>
           :   props.location.state.executive }
        </CCol>
        <CCol xs="10" sm="4">
           Schedule Date: {edit ? 
            <CFormGroup >
            <CInput type="date" id="sheduleDate" name="sheduleDate" placeholder="sheduleDate" value={date} onChange={(e) => {setDate(e.target.value)}}/>
          </CFormGroup>
           :  props.location.state.date }
        </CCol>
        <CCol xs="10" lg="4">
        Schedule Time:  {edit ? 
         <CFormGroup >
         <CInput type="time" id="sheduleTime" name="sheduleTime" placeholder="sheduleTime" value={time} onChange={(e) => {setTime(e.target.value)}}/>
       </CFormGroup>
        :   props.location.state.time }
        </CCol>
        </CRow>

        <CRow style={{marginTop:'2%'}}>
        <CCol xs="10" lg="6">
           Issue Details:
        </CCol>
        <CCol xs="10" lg="6">
           Machine Pictures:
        </CCol>
        </CRow>
            </CCardBody>

        <CCardFooter>
            <CCardHeader>
            <CCardSubtitle> Machine Details</CCardSubtitle>
            </CCardHeader>
        </CCardFooter>
        <CRow style={{marginLeft:'2%',marginTop:'2%'}}>
        <CCol xs="10" lg="4">
            Machine ID: UPNLMACH001
        </CCol>
        <CCol xs="10" lg="4">
           Machine Serial Number: HP012345
        </CCol>
        <CCol xs="10" lg="4">
           Machine Type: +91-980012345
        </CCol>
        </CRow>

        <CRow style={{marginLeft:'2%',marginTop:'2%'}}>
        <CCol xs="10" lg="4">
            Make: UPNLMACH001
        </CCol>
        <CCol xs="10" lg="4">
           Model: HP012345
        </CCol>
        <CCol xs="10" lg="4">
           Machine Age: 2 Years old
        </CCol>
        </CRow>

        <CRow style={{marginLeft:'2%',marginTop:'2%'}}>
        <CCol xs="10" lg="4">
            Machine Controller: +91-980012345
        </CCol>
        <CCol xs="10" lg="4">
          Controller Model: +91-980012345
        </CCol>  
        </CRow>

        <CCardFooter>
            <CCardHeader>
            <CCardSubtitle>Customer Contact Details</CCardSubtitle>
            </CCardHeader>
        </CCardFooter>
        <CRow style={{marginLeft:'2%',marginTop:'2%'}}>
        <CCol xs="10" lg="4">
           Contact Person Name: Mr. Arun Upanal
        </CCol>
        <CCol xs="10" lg="4">
           Contact Number: +91-980012345
        </CCol>
        <CCol xs="10" lg="4">
           Alternate Number: +91-914512345
        </CCol>
        </CRow>

        <CRow style={{marginLeft:'2%',marginTop:'2%'}}>
        <CCol xs="10" lg="6">
            Customer Address: #104,1st cross,Peenya Industrial Area
        </CCol>
        <CCol xs="10" lg="6">
           Email: customermailbox@gmail.com
        </CCol>
        </CRow>
              <CRow>
            <CCardFooter style={{width:'15%',marginLeft:'70%'}}>
            { edit ?  
            <CRow>
             <CButton block  color="info" className="mr-1" onClick={submitHandler}
            >Submit</CButton>    
            <CButton block  color="info" className="mr-1" onClick={cancelHandler}
            >Cancel</CButton> 
            </CRow> 
              :  <CButton block  color="info" className="mr-1" onClick={closeHandler}>Close</CButton>}
            </CCardFooter>
            </CRow>
        </CCard>

    )
}
