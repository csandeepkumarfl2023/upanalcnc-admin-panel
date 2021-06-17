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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";

import MachineService from '../../../services/machineService'
import moment from 'moment'


const machineService = new MachineService()

export default function EditMachine(props) {



    console.log('item', props.location.state);
    const history = useHistory();
    const [item, setItem] = useState(props.location.state)
    const [edit, setEdit] = React.useState(false)
    const [machineType, setMachineType] = useState("")
    const [customerCode, setCustomerCode] = useState("")
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [machineSerialNo, setMachineSerialNo] = useState("")
    const [machineAge, setMachineAge] = useState("")
    const [controller, setController] = useState("")
    const [controllerModel, setControllerModel] = useState("")
    const [generateQRCode, setGenerateQRCode] = useState("")
    const [data, setData] = useState([])
    const [machineDetails, setMachineDetails] = useState()
    const [serviceReqDetails, setServiceReqDetails] = useState()
    const [updateId, setUpdateId] = useState()


    // const closeHandler = () => {
    //     history.push('/customermanagement');
    // }
    const cancelHandler = () => {
        history.push('/customermanagement');
    }

    const getMachineDetails = async () => {
        const res = await machineService.getMachine(item.id)
        setMachineDetails(res)
        console.log('getCustomerDetails', res)
        setCustomerCode(res.customerCode)
        setMachineType(res.machineType)
        setMake(res.make)
        setModel(res.model)
        setMachineSerialNo(res.machineSerialNo)
        setMachineAge(res.machineAge)
        setController(res.controller)
        setControllerModel(res.controllerModel)
        setGenerateQRCode(res.generateQRCode)

    }

    const submitHandler = async () => {
        let currentData = { ...item }
        currentData.machineType = machineType
        currentData.customerCode = customerCode
        currentData.make = make
        currentData.model = model
        currentData.machineSerialNo = machineSerialNo
        currentData.machineAge = machineAge
        currentData.controller = controller
        currentData.controllerModel = controllerModel
        currentData.generateQRCode = generateQRCode


        console.log(currentData);
        let res = await machineService.updateMachine(currentData, currentData.id)
        history.push('/customermanagement');
    }

    React.useEffect(() => {
        setItem(props.location.state)
        if (props.location.state) {
            getMachineDetails()

        }
    }, [])

    return (
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol xs="6" md="11">
                        <CCardSubtitle style={{ marginTop: '1%' }}>Manchine {item ? item.machineId : null}</CCardSubtitle>
                    </CCol>
                    <CCol xs="6" md="1">
                        {/* <CIcon name="cil-pen" size="1xl" onClick={() => setEdit(true)} /> */}
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <CCol xs="12" md="4">
                        Customer Code:
                        <CFormGroup >
                            <CInput type="text" id="customerCode" className="w-50"
                                name="customerCode" placeholder="customerCode" value={customerCode} onChange={(e) => { setCustomerCode(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="4">
                        Contact Person Name:
                        <CFormGroup >
                            <CInput type="text" id="machineType" className="w-50"
                                name="machineType" placeholder="machineType" value={machineType} onChange={(e) => { setMachineType(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="4">
                GenerateQRCode: 
                     <CFormGroup >
                        <CInput type="text" id="generateQRCode" className="w-50"
                   name="generateQRCode" placeholder="generateQRCode" value={generateQRCode} onChange={(e) => { setGenerateQRCode(e.target.value) }} />
                     </CFormGroup>
            </CCol>
         
                </CRow>

                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>


                    <CCol xs="12" lg="4">
                        Contact Number:
                        <CFormGroup >
                            <CInput type="text" id="make" className="w-50"
                                name="make" placeholder="make" value={make} onChange={(e) => { setMake(e.target.value) }} />
                        </CFormGroup>

                    </CCol>
                    <CCol xs="12" lg="4">
                        Alternate Number:
                        <CFormGroup >
                            <CInput type="text" id="controller" className="w-50"
                                name="controller" placeholder="controller" value={controller} onChange={(e) => { setController(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="4">
                        Customer MachineSerialNo:
                        <CFormGroup >
                            <CInput type="text" id="machineSerialNo" className="w-50"
                                name="machineSerialNo" placeholder="machineSerialNo" value={machineSerialNo} onChange={(e) => { setMachineSerialNo(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>

                    <CCol xs="12" lg="4">
                        Model:
                        <CFormGroup >
                            <CInput type="text" id="model" className="w-50"
                                name="model" placeholder="model" value={model} onChange={(e) => { setModel(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="4">
                        MachineAge:
                        <CFormGroup >
                            <CInput type="text" id="machineAge" className="w-50"
                                name="machineAge" placeholder="machineAge" value={machineAge} onChange={(e) => { setMachineAge(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="4">
                        ControllerModel:
                        <CFormGroup >
                            <CInput type="text" id="controllerModel" className="w-50"
                                name="controllerModel" placeholder="controllerModel" value={controllerModel} onChange={(e) => { setControllerModel(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                </CRow>








            </CCardBody>

            <CRow>
                <CCardFooter style={{ width: '15%', marginLeft: '70%' }}>

                    <CRow>
                        <CButton block color="info" className="mr-1" onClick={submitHandler}
                        >Submit</CButton>
                        <CButton block color="info" className="mr-1" onClick={cancelHandler}
                        >Cancel</CButton>
                    </CRow>

                </CCardFooter>
            </CRow>
        </CCard>
)
}