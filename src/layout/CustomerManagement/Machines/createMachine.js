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
    CAlert
} from '@coreui/react'
import { Formik } from "formik"
import MachineService from '../../../services/machineService';
import CustomerService from '../../../services/customerService';
import CommonService from '../../../services/commonService'
import { useHistory } from "react-router-dom";

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
            console.log('err', err.message)
            setAlert(true)
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
        Error occured Please try again!
      </CAlert>
            <Formik
                initialValues={data}
                onSubmit={(values) => {
                    submitHandler(values)
                    console.log(values)
                }}>
                {({ handleSubmit, handleChange, values, setFieldValue }) => (

                    <div >
                        <CCard style={{ padding: '40px', borderColor: 'lightgray' }}>
                            <CRow style={{ marginTop: '2%' }}>
                                <CCol xs="10" sm="6">
                                    <b>Customer code:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CSelect custom size="md" name="customerCode" id="customerCode"
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

                                <CCol xs="10" sm="6">
                                    <b>Machine Type:</b>
                                    <CFormGroup className="w-52" style={{ marginTop: '10px' }}>
                                        <CSelect custom size="md" name="machine_type" id="machine_type"
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


                            {typeOthers ?
                                <CRow>
                                    <CCol xs="10" sm="4">
                                        <CLabel htmlFor="controller" style={{ fontWeight: 'bold' }}>Enter Your Option:</CLabel>
                                        <CInput type="text" id="others" name="other_machine_type" placeholder="Machine Type" onChange={handleChange} />
                                    </CCol>
                                </CRow>
                                : null}

                            <CRow style={{ marginTop: '2%' }}>
                                <CCol xs="10" sm="4">
                                    <b>Make:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machine_make" className="w-52" name="machine_make" placeholder="Make" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="4">
                                    <b>Model:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machine_model" className="w-52" name="machine_model" placeholder="Model" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="4">

                                    <b>MachineSerialNo:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machine_serial_number" className="w-52" name="machine_serial_number" placeholder="Machine SerialNo" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow style={{ marginTop: '2%' }}>
                                <CCol xs="10" sm="4">
                                    <b>Machine Age:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machineAge" className="w-52" name="machineAge" placeholder="Machine Age" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="10" sm="4">
                                    <b>Machine Controller:</b>
                                    <CFormGroup className="w-52" style={{ marginTop: '10px' }}>
                                        <CSelect custom size="md" name="machine_controller" id="machine_controller" value={values.machine_controller}
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

                                <CCol xs="10" sm="4">
                                    <b>Controller Model:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machine_controller_model" className="w-52" name="machine_controller_model" placeholder="Controller Model" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol> 
                            </CRow>


                            {others ?
                                 <CRow style={{ marginTop: '2%' }}>
                                 <CCol xs="10" sm="4">
                                    <CLabel htmlFor="machine_controller" style={{fontWeight: 'bold'}}>Enter Your Option</CLabel>
                                    <CInput type="text" id="others" name="other_machine_controller" placeholder="Machine controller" onChange={handleChange} />
                                </CCol>
                                </CRow>
                                : null}
                            <CRow style={{ justifyContent: 'flex-end', marginTop: '2%' }}>
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
                        </CCard>
                    </div>
                )}
            </Formik>

        </div>
    )
}
