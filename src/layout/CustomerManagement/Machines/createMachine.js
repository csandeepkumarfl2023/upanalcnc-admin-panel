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
    CCardFooter
} from '@coreui/react'
import { Formik } from "formik"
import MachineService from '../../../services/machineService';
import CommonService from '../../../services/commonService'
import { useHistory } from "react-router-dom";

const machineservice = new MachineService()
const commonService = new CommonService()

export default function CreateMachine() {
    const history = useHistory();

    const [data, setData] = useState({
        machine_type: "", machine_make: "", machine_model: "", machine_name: "",customerCode: "",
        machine_serial_number: "", machineAge: "", machine_controller: "", machine_controller_model: "", generateQRCode: ""
    })
    const [typeOthers, setTypeOthers] = useState(false)
    const [others, setOthers] = useState(false)
    const [controllersArr, setControllersArr] = useState()
    const [machinetypesArr, setMachineTypesArr] = useState()

    const submitHandler = async (value) => {
        value.client_id = value.customerCode
        console.log(value)
        value.machine_manufactured_date = "2020-03-03 03:03:03"
        value.machine_installation_date = "2020-03-03 03:03:03"
        value.machine_manufacturer = "test"
        let res = await machineservice.createMachine(value)
        console.log(res);
        history.push('/customermanagement')
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
        getEnum()
    }, [])

    return (
        <div>
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
                                {/* <CCol xs="10" sm="4">
                                    Machine Id:
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machineId" className="w-52" name="machineId" placeholder="Machine Id" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol> */}

                                <CCol xs="10" sm="4">
                                    <b>Customer code:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="customerCode" className="w-52" name="customerCode" placeholder="Name" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="10" sm="4">
                                    <b>Make:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machine_make" className="w-52" name="machine_make" placeholder="Make" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="4">
                                    <b>Controller Model:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machine_controller_model" className="w-52" name="machine_controller_model" placeholder="Controller Model" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow style={{ marginTop: '2%' }}>
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
                                <CCol xs="10" sm="4">
                                    <b>Machine Age:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="machineAge" className="w-52" name="machineAge" placeholder="Machine Age" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol>


                            </CRow>


                            <CRow style={{ marginTop: '2%' }}>

                                <CCol xs="10" sm="4">
                                    <b>Machine Controller:</b>
                                    <CFormGroup className="w-52">
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

                                        {others ?
                                            <>
                                                <CLabel htmlFor="machine_controller">Enter Your Option</CLabel>
                                                <CInput type="text" id="others" name="other_machine_controller" placeholder="Machine controller" onChange={handleChange} />
                                            </>
                                            : null}
                                    </CFormGroup>
                                </CCol>

                                <CCol xs="10" sm="4">
                                    <b>Machine Type:</b>
                                    <CFormGroup className="w-52">
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
                                        {typeOthers ?
                                            <>
                                                <CLabel htmlFor="controller">Enter Your Option</CLabel>
                                                <CInput type="text" id="others" name="other_machine_type" placeholder="Machine Type" onChange={handleChange} />
                                            </>
                                            : null}
                                    </CFormGroup>
                                </CCol>
                                {/* <CCol xs="10" sm="4">
                                    <b>Generate QRCode:</b>
                                    <CFormGroup onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                        <CInput type="text" id="generateQRCode" className="w-52" name="generateQRCode" placeholder="Generate QRCode" onChange={handleChange} />
                                    </CFormGroup>
                                </CCol> */}
                            </CRow>
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
