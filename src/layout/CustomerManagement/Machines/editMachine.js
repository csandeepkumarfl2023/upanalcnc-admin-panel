import React, { useState } from 'react'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CInput,
    CCardSubtitle,
    CCardFooter,
    CAlert,
    CSelect,
    CLabel
} from '@coreui/react'

import { useHistory } from "react-router-dom";

import MachineService from '../../../services/machineService'
import CustomerService from '../../../services/customerService';
import CommonService from '../../../services/commonService'

const machineService = new MachineService()
const customerservice = new CustomerService()
const commonService = new CommonService()

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
    const [customerseArr, setCustomersArr] = useState()
    const [machinetypesArr, setMachineTypesArr] = useState()
    const [typeOthers, setTypeOthers] = useState(false)
    const [controllersArr, setControllersArr] = useState()
    const [others, setOthers] = useState(false)

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
            setAlert(err.message || 'Error occured Please try again!')
        }
    }

    const getCustomer = async () => {
        let res = await customerservice.getAllCustomers()
        console.log(res)
        setCustomersArr(res.data)
    }

    const getEnum = async () => {
        let res = await commonService.getenum()
        let machineControllers = []
        for (const key in res.data.MACHINE_CONTROLLER) {
            let obj = {}
            obj.key = key
            obj.value = res.data.MACHINE_CONTROLLER[key]
            machineControllers.push(obj)
        }
        let machineTypes = []
        for (const key in res.data.MACHINE_TYPE) {
            let obj = {}
            obj.key = key
            obj.value = res.data.MACHINE_TYPE[key]
            machineTypes.push(obj)
        }

        setControllersArr(machineControllers)
        setMachineTypesArr(machineTypes)
    }

    React.useEffect(() => {
        getCustomer()
        getEnum()
        setItem(props.location.state)
        if (props.location.state) {
            getMachineDetails()

        }
    }, [])

    return (
        <>
        <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
       {alert}
      </CAlert>
        <CCard className="mt-2">
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
                            {/* <CInput type="text" id="customerCode" className="w-52"
                                name="customerCode" placeholder="customerCode" value={customerCode} onChange={(e) => { setCustomerCode(e.target.value) }} /> */}
                                <CSelect custom size="md" name="customerCode" id="customerCode"
                                            onChange={(e) => setCustomerCode(e.target.value)}
                                            value={customerCode}>
                                            <option value="0">Open this select menu</option>
                                            {customerseArr && customerseArr.length ? customerseArr.map((elem) => {
                                                return <option key={elem.client_id} value={elem.client_id} style={{ textTransform: 'capitalize' }}>{elem.client_id}</option>
                                            }
                                            ) : null}
                                        </CSelect>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" lg="6">
                        <b>Machine Type:</b>
                        <CFormGroup style={{ marginTop: '10px' }} >
                                 <CSelect custom size="md" name="machine_type" id="machine_type"
                                            value={machineType}
                                            onChange={(e) => {
                                                setMachineType(e.target.value)
                                                e.target.value == 'OTHERS' ? setTypeOthers(true) : setTypeOthers(false)
                                            }}>
                                            <option value="0">Open this select menu</option>
                                            {machinetypesArr && machinetypesArr.length ? machinetypesArr.map((elem) => {
                                                return <option key={elem.key} value={elem.value} style={{ textTransform: 'capitalize' }}>{elem.value}</option>
                                            }
                                            ) : null}
                                        </CSelect>
                        </CFormGroup>
                    </CCol>
                   </CRow>

                                 {typeOthers ?
                                <CRow style={{ marginLeft: '2%'}}>
                                    <CCol xs="10" sm="4">
                                        <CLabel htmlFor="machine_type" style={{ fontWeight: 'bold' }}>Enter Your Option:</CLabel>
                                        <CInput type="text" id="OTHERS" name="other_machine_type" placeholder="Machine Type" onChange={(e) => {setMachineType(e.target.value)}} />
                                    </CCol>
                                </CRow>
                                : null}

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
                                 <CSelect custom size="md" name="machine_controller" id="machine_controller" value={controller}
                                            onChange={(e) => {
                                                setController(e.target.value)
                                                e.target.value == 'others' ? setOthers(true) : setOthers(false)
                                            }}>
                                            <option value="0">Open this select menu</option>
                                            {controllersArr && controllersArr.length ? controllersArr.map((elem) => {
                                                return <option key={elem.key} value={elem.value} style={{ textTransform: 'capitalize' }}>{elem.value}</option>
                                            }
                                            ) : null}
                                        </CSelect>
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
                      
                {others ?
                                 <CRow style={{ marginTop: '2%',marginLeft:'2%' }}>
                                 <CCol xs="10" sm="4">
                                    <CLabel htmlFor="machine_controller" style={{fontWeight: 'bold'}}>Enter Your Option</CLabel>
                                    <CInput type="text" id="others" name="other_machine_controller" placeholder="Machine controller" onChange={(e) => {setController(e.target.value)}} />
                                </CCol>
                                </CRow>
                                : null}

            <CRow style={{ justifyContent: 'center' }}>
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