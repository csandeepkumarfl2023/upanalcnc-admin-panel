import React,{useState} from 'react'
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
    CLabel
 } from '@coreui/react'
 import { Formik } from "formik"
 import MachineService from '../../../services/machineService';
 import { useHistory } from "react-router-dom";

 const machineservice = new MachineService()

export default function CreateMachine() {
    const history = useHistory();

    const [data, setData] = useState({ machineId: "", customerCode: "", machineType: "", make: "", model: "" ,
    machineSerialNo:"", machineAge: "", controller: "", controllerModel: "", generateQRCode: ""})
    const [typeOthers,setTypeOthers] = useState(false)
    const [others,setOthers] = useState(false)
    const [machineType,setMachineType] = useState("")
    const [controller,setController] = useState("")

    const submitHandler = async (value) =>  {
        if(value.controller == 'Others') {
            value.controller = value.otherMachineController
        }
        if(value.machineType == 'Others') {
            value.machineType = value.otherMachineType
        }
        let res = await machineservice.createMachine(value)
        console.log(res);
        history.push('./customermanagement')
    }
    const typeHandler = (e) => {
        e.target.value == 'Others' ? setTypeOthers(true) :  setTypeOthers(false)
         setMachineType(e.target.value)
      }
      const controllerHandler = (e) => {
        e.target.value == 'Others' ? setOthers(true) :  setOthers(false)
        console.log(e.target.value);
         setController(e.target.value)
      }
    return (
        <div>
           <Formik 
             initialValues={data}
            onSubmit={async (values) => {
               submitHandler(values)
               console.log(values)
            }}>
            {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (

                <div >
                    <CCard style={{ padding: '40px', borderColor: 'lightgray' }}>
                     <CRow>
                    <CCol xs="10" sm="3">
                        Machine Id: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="machineId" className="w-55" name="machineId" placeholder="Machine Id" onChange={handleChange}/>
                            </CFormGroup>
                            </CCol>
                        <CCol xs="10" sm="3">
                        Customer Code: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="customerCode" className="w-55" name="customerCode" placeholder="Customer Code" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                      
                        <CCol xs="10" sm="3">
                         Make: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="make" className="w-55" name="make" placeholder="Make" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        Controller Model: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="controllerModel" className="w-55" name="controllerModel" placeholder="Controller Model" onChange={handleChange}/>
                            </CFormGroup>
                            </CCol>
                        </CRow>   
   
                    <CRow>
                    <CCol xs="10" sm="3">
                       Model: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="model" className="w-55" name="model" placeholder="Model" onChange={handleChange}/>
                            </CFormGroup>
                            </CCol>
                        <CCol xs="10" sm="3">
                        MachineSerialNo: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="machineSerialNo" className="w-55" name="machineSerialNo" placeholder="Machine SerialNo" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        Machine Age: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="machineAge" className="w-55" name="machineAge" placeholder="Machine Age" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="3">
                        Generate QRCode: 
                        <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                        <CInput type="text" id="generateQRCode" className="w-55" name="generateQRCode" placeholder="Generate QRCode" onChange={handleChange}/>
                        </CFormGroup>
                        </CCol>
                       
                        </CRow>   

                        
                    <CRow>
                    <CCol xs="10" sm="3">
                    Machine Controller: 
                <CFormGroup >
                <CSelect custom size="md" name="controller" id="controller"  value={values.controller} 
                onChange={(e) => {
                    setFieldValue('controller', e.target.value)
                    e.target.value == 'Others' ? setOthers(true) :  setOthers(false)
                    }}>
                  <option value="0">Open this select menu</option>
                  <option value="Funac">Funac</option>
                  <option value="Siemens">Siemens</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Others">Others</option>
                </CSelect>
                
                 { others ?   
                  <>
                <CLabel htmlFor="controller">Enter Your Option</CLabel>                  
                <CInput type="text" id="others" name="otherMachineController" placeholder="Machine controller"  onChange={handleChange}/>
                </>
                  : null } 
              </CFormGroup>
            </CCol>
                      
                        <CCol xs="10" sm="3">
                        Machine Type: 
                        <CFormGroup >
                <CSelect custom size="md" name="machineType" id="machineType"
                    value={values.machineType} 
                onChange={(e) => {
                    setFieldValue('machineType', e.target.value)
                    e.target.value == 'Others' ? setTypeOthers(true) :  setTypeOthers(false)
                    }}>
                  <option value="0">Open this select menu</option>
                  <option value="VMC">VMC</option>
                  <option value="TURNING">TURNING</option>
                  <option value="VTL">VTL</option>
                  <option value="HMC">HMC</option>
                  <option value="SPM">SPM</option>
                  <option value="Others">Others</option>
                </CSelect>
                { typeOthers ? 
                  <>
                 <CLabel htmlFor="controller">Enter Your Option</CLabel>                  
                <CInput type="text" id="others" name="otherMachineType" placeholder="Machine Type"  onChange={handleChange}/>
                 </>
                  : null } 
              </CFormGroup>
                        </CCol>
                        </CRow>  
                        <CCol xs="10" sm="4">
                        <CButton block color="info" className="w-25" style={{marginRight:'0%',marginLeft:'250%'}} onClick={handleSubmit}>Submit</CButton> 
                        </CCol>
                    </CCard>
                </div>
            )}
        </Formik>
        
        </div>
    )
}
