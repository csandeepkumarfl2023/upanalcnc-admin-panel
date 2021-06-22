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
    CAlert
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
    const [machineType, setMachineType] = useState("")
    const [customerCode, setCustomerCode] = useState("")
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [machineSerialNo, setMachineSerialNo] = useState("")
    const [machineAge, setMachineAge] = useState("")
    const [controller, setController] = useState("")
    const [controllerModel, setControllerModel] = useState("")
    const [generateQRCode, setGenerateQRCode] = useState("")

    const [alert, setAlert] = useState(false)

    const cancelHandler = () => {
        history.push('/customermanagement');
    }

    const getMachineDetails = async () => {
        const res = await machineService.getMachine(item.machine_id)
        console.log('getMachinedetails', res.data)
        setCustomerCode(res.data.client_id)
        setMachineType(res.data.machine_type)
        setMake(res.data.machine_make)
        setModel(res.data.machine_model)
        setMachineSerialNo(res.data.machine_serial_number)
        setMachineAge(res.data.machine_age_as_on_installation)
        setController(res.data.machine_controller)
        setControllerModel(res.data.machine_controller_model)
        setGenerateQRCode(res.data.generateQRCode)

    }

    const submitHandler = async () => {
        try {
        let currentData = { ...item }
        currentData.machine_type = machineType
        currentData.customerCode = customerCode
        currentData.machine_make = make
        currentData.machine_model = model
        currentData.machine_serial_number = machineSerialNo
        currentData.machine_age_as_on_installation = machineAge
        currentData.machine_controller = controller
        currentData.machine_controller_model = controllerModel
        currentData.generateQRCode = generateQRCode

        console.log(currentData);
        let res = await machineService.updateMachine(currentData)
        history.push({
            pathname: '/customermanagement',
            state: 'Machine updated'
          })
        } catch (err) {
            console.log('err', err.message)
            setAlert(true)
        }
    }

    React.useEffect(() => {
        setItem(props.location.state)
        if (props.location.state) {
            getMachineDetails()

        }
    }, [])

    return (
        <>
        <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        Error occured Please try again!
      </CAlert>
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol xs="6" md="11">
                        <CCardSubtitle style={{ marginTop: '1%' }}>Machine {item ? item.machine_id : null}</CCardSubtitle>
                    </CCol>
                    <CCol xs="6" md="1">
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <CCol xs="12" md="6">
                        <b>Customer Code:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="customerCode" className="w-52"
                                name="customerCode" placeholder="customerCode" value={customerCode} onChange={(e) => { setCustomerCode(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="6">
                        <b>Machine Type:</b>
                        <CFormGroup style={{ marginTop: '10px' }} >
                            <CInput type="text" id="machineType" className="w-52"
                                name="machineType" placeholder="machineType" value={machineType} onChange={(e) => { setMachineType(e.target.value) }} />
                        </CFormGroup>
                    </CCol>

                </CRow>

                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>


                    <CCol xs="12" lg="4">
                        <b>Make:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="make" className="w-52"
                                name="make" placeholder="make" value={make} onChange={(e) => { setMake(e.target.value) }} />
                        </CFormGroup>

                    </CCol>

                    <CCol xs="12" lg="4">
                        <b>Model:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="model" className="w-52"
                                name="model" placeholder="model" value={model} onChange={(e) => { setModel(e.target.value) }} />
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" lg="4">
                        <b>Machine SerialNo:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="machineSerialNo" className="w-52"
                                name="machineSerialNo" placeholder="machineSerialNo" value={machineSerialNo} onChange={(e) => { setMachineSerialNo(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <CCol xs="12" lg="4">
                        <b>MachineAge:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="machineAge" className="w-52"
                                name="machineAge" placeholder="machineAge" value={machineAge} onChange={(e) => { setMachineAge(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                    
                    <CCol xs="12" lg="4">
                        <b>Controller:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="controller" className="w-52"
                                name="controller" placeholder="controller" value={controller} onChange={(e) => { setController(e.target.value) }} />
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" lg="4">
                        <b>ControllerModel:</b>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="controllerModel" className="w-52"
                                name="controllerModel" placeholder="controllerModel" value={controllerModel} onChange={(e) => { setControllerModel(e.target.value) }} />
                        </CFormGroup>
                    </CCol>
                </CRow>


            <CRow style={{ justifyContent: 'flex-end' }}>
                <CCardFooter style={{ width: '25%' }}>

                    <CRow>
                        <CCol xs="6">
                            <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/customermanagement')}
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