import React, { useState } from 'react'
import {
    CCard,
    CCol,
    CSelect,
    CRow,
    CButton,
    CFormGroup,
    CInput,
    CLabel,
    CCardFooter,
    CAlert,
    CCardSubtitle,
    CCardBody
} from '@coreui/react'
import { Formik } from "formik"
import MachineService from '../../../services/machineService';
import CustomerService from '../../../services/customerService';
import CommonService from '../../../services/commonService'
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'

const customerservice = new CustomerService()
const machineservice = new MachineService()
const commonService = new CommonService()

export default function CreateMachine() {
    const history = useHistory();

    const [data, setData] = useState({
        machine_type: "", machine_make: "", machine_model: "", machine_name: "", customerCode: "",
        machine_serial_number: "", machineAge: "", machine_controller: "", machine_controller_model: "", generateQRCode: ""
    })
    const [typeOthers, setTypeOthers] = useState(false)
    const [others, setOthers] = useState(false)
    const [controllersArr, setControllersArr] = useState()
    const [machinetypesArr, setMachineTypesArr] = useState()
    const [customerseArr, setCustomersArr] = useState()
    const [alert, setAlert] = useState(false)

    const submitHandler = async (value) => {
        try {
            value.client_id = value.customerCode
            console.log(value)
            value.machine_manufactured_date = "2020-03-03 03:03:03"
            value.machine_installation_date = "2020-03-03 03:03:03"
            value.machine_manufacturer = "test"
            let res = await machineservice.createMachine(value)
            console.log(res);
            history.push({
                pathname: '/customermanagement',
                state: 'Machine added'
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
    }, [])

    return (
        <div>
            <CAlert color="danger" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
                {alert}
            </CAlert>
            <Formik
                initialValues={data}
                onSubmit={(values) => {
                    submitHandler(values)
                    console.log(values)
                }}>
                {({ handleSubmit, handleChange, values, setFieldValue }) => (


                    <CCard>
                        <CCardSubtitle className="pl-3 mt-3" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Create Machine</CCardSubtitle>

                        <CCardBody>
                            <div className="pt-3 pl-3">
                                <CRow className="mb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-check-circle" className='m-1'/><b>Customer code:</b>
                                            <CCol>
                                                <CFormGroup>
                                                    <CSelect style={{ width: '85%' }} custom size="md" style={{ width: '85%' }} name="customerCode" id="customerCode"
                                                        onChange={(e) => setFieldValue('customerCode', e.target.value)}
                                                        value={values.customerCode}>
                                                        <option value="0">Open this select menu</option>
                                                        {customerseArr && customerseArr.length ? customerseArr.map((elem) => {
                                                            return <option key={elem.client_id} value={elem.client_id} style={{ textTransform: 'capitalize' }}>{elem.client_id}</option>
                                                        }
                                                        ) : null}
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-cog" className='m-1'/>  <b>Machine Type:</b>
                                            <CCol>
                                                <CFormGroup>
                                                    <CSelect style={{ width: '85%' }} custom size="md" name="machine_type" id="machine_type"
                                                        value={values.machine_type}
                                                        onChange={(e) => {
                                                            setFieldValue('machine_type', e.target.value)
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
                                    </CCol>
                                </CRow>


                                {typeOthers ?
                                    <CRow className="pt-3 pb-2">
                                        <CCol xs="12" sm="12" lg="6">
                                            <CRow>
                                                <b>Enter Your Option:</b>
                                                <CCol>
                                                    <CFormGroup>
                                                        <CInput type="text"
                                                            style={{ width: '85%' }} id="others" name="other_machine_type" placeholder="Machine Type" onChange={handleChange} />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    : null}

                                <CRow className="pt-3 pb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-arrow-thick-right" className='m-1'/>  <b>Make:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput type="text" id="machine_make" name="machine_make" 
                                            style={{width: '85%'}}
                                            placeholder="Make" onChange=
                                            {handleChange} />
                                        </CFormGroup>
                                        </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-pen-nib" className='m-1'/><b>Model:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput type="text" id="machine_model" name="machine_model" 
                                            style={{width: '85%'}}
                                            placeholder="Model" onChange=
                                            {handleChange} />
                                        </CFormGroup>
                                        </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-aperture" className='m-1'/>  <b>MachineSerialNo:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput style={{width: '85%'}}
                                             type="text" id="machine_serial_number" name="machine_serial_number" placeholder="Machine SerialNo" onChange={handleChange} />
                                        </CFormGroup>
                                        </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-tv" className='m-1'/><b>Machine Age:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput style={{width: '85%'}}
                                             type="text" id="machineAge" name="machineAge" placeholder="Machine Age" onChange={handleChange} />
                                        </CFormGroup>
                                        </CCol>
                                        </CRow>
                                    </CCol>

                               </CRow>
                                
                               <CRow className="pt-3 pb-2">
                                <CCol xs="12" sm="12" lg="6">
                                    <CRow>
                                    <CIcon name="cil-camera-control" className='m-1'/>  <b>Machine Controller:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CSelect style={{ width: '85%' }} custom size="md" name="machine_controller" id="machine_controller" value={values.machine_controller}
                                                onChange={(e) => {
                                                    setFieldValue('machine_controller', e.target.value)
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
                                        </CRow>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                        <CRow>
                                        <CIcon name="cil-badge" className='m-1'/> <b>Controller Model:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput type="text" 
                                            style={{width: '85%'}}
                                            id="machine_controller_model" name="machine_controller_model" placeholder="Controller Model" onChange={handleChange} />
                                        </CFormGroup>
                                        </CCol>
                                        </CRow>
                                    </CCol>
                               
                                </CRow>

                                {others ?
                                    <CRow className="pt-3 pb-4">
                                        <CCol xs="12" sm="12" lg="6">
                                            <CRow>
                                            <b>Enter Your Option:</b>
                                            <CCol>
                                            <CInput type="text" id="others" 
                                            style={{width: '85%'}}
                                            name="other_machine_controller" 
                                            placeholder="Machine controller" onChange={handleChange} />
                                            </CCol>
                                            </CRow>
                                      
                                        </CCol>
                                    </CRow>
                                    : null}
                            </div>
                            <CRow style={{ justifyContent: 'center' }}>
                                <CCardFooter style={{ width: '25%' }}>

                                    <CRow>
                                        <CCol xs="6">
                                            <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/customermanagement')}
                                            >Cancel</CButton>
                                        </CCol>
                                        <CCol xs="6">
                                            <CButton block color="info" className="mr-1" onClick={handleSubmit}
                                            >Submit</CButton>
                                        </CCol>
                                    </CRow>

                                </CCardFooter>
                            </CRow>
                        </CCardBody>
                    </CCard>

                )}
            </Formik>

        </div>
    )
}
