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
import '../../styles.css'

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
             validate={values => {
                let errors = {};
                if (!values.customerCode) {
                  errors.customerCode = "Customer Code is required";
                }
                if (!values.machine_make) {
                    errors.machine_make = "Make is required";
                  }
                  if (!values.machine_model) {
                    errors.machine_model = "Machine Model is required";
                  }
                  if (!values.machine_serial_number) {
                    errors.machine_serial_number = "Machine Serial Number is required";
                  }
                  if (!values.machineAge) {
                    errors.machineAge = "Machine Age is required";
                  }
                  if (!values.machine_controller_model) {
                    errors.machine_controller_model = "Controller Model is required";
                  }
                  if (!values.machine_type) {
                    errors.machine_type = "Machine Type is required";
                  }
                  if (!values.machine_controller) {
                    errors.machine_controller = "Machine Controller is required";
                  }
                
                return errors;
              }}
                initialValues={data}
                onSubmit={(values) => {
                    submitHandler(values)
                    console.log(values)
                }}>
                {({ handleSubmit, handleChange, values,errors, touched, setFieldValue }) => (


                    <CCard>
                        <CCardSubtitle className="pl-3 mt-3" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Create Machine</CCardSubtitle>

                        <CCardBody>
                            <div className="pt-3 pl-3">
                                <CRow className="mb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-check-circle" className='m-2'/><b>Customer code:</b>
                                            <CCol>
                                                <CFormGroup>
                                                    <CSelect style={{ width: '85%' }} custom size="md" style={{ width: '85%' }} name="customerCode" id="customerCode"
                                                        onChange={(e) => setFieldValue('customerCode', e.target.value)}
                                                        value={values.customerCode} className={errors.customerCode && touched.customerCode && "error"}>
                                                        <option value="0">Open this select menu</option>
                                                        {customerseArr && customerseArr.length ? customerseArr.map((elem) => {
                                                            return <option key={elem.client_id} value={elem.client_id} style={{ textTransform: 'capitalize' }}>{elem.client_id}</option>
                                                        }
                                                        ) : null}
                                                    </CSelect>
                                                </CFormGroup>
                                        {errors.customerCode && touched.customerCode && 
                                       <div className="input-feedback">{errors.customerCode}</div>}
                                            </CCol>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-cog" className='m-2'/>  <b>Machine Type:</b>
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
                                                {errors.machine_type && touched.machine_type && 
                                       <div className="input-feedback">{errors.machine_type}</div>}
                                            </CCol>
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
                                                            style={{ width: '85%' }} id="others" name="other_machine_type" placeholder="Machine Type" 
                                                            onChange={handleChange} />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    : null}

                                <CRow className="pt-3 pb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-arrow-thick-right" className='m-2'/>  <b>Make:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput type="text" id="machine_make" name="machine_make" 
                                            style={{width: '85%'}}
                                            placeholder="Make" onChange=
                                            {handleChange}  className={errors.machine_make && touched.machine_make && "error"}/>
                                        </CFormGroup>
                                        {errors.machine_make && touched.machine_make && 
                                       <div className="input-feedback">{errors.machine_make}</div>}
                                        </CCol>
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-pen-nib" className='m-2'/><b>Model:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput type="text" id="machine_model" name="machine_model" 
                                            style={{width: '85%'}}
                                            placeholder="Model" onChange=
                                            {handleChange}  className={errors.machine_model && touched.machine_model && "error"}/>
                                        </CFormGroup>
                                        {errors.machine_model && touched.machine_model && 
                                       <div className="input-feedback">{errors.machine_model}</div>}
                                        </CCol>
                                    </CCol>
                                </CRow>

                                <CRow className="pt-3 pb-2">
                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-aperture" className='m-2'/>  <b>MachineSerialNo:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput style={{width: '85%'}}
                                             type="text" id="machine_serial_number" name="machine_serial_number" placeholder="Machine SerialNo" 
                                             onChange={handleChange} className={errors.machine_serial_number && touched.machine_serial_number && "error"}/>
                                        </CFormGroup>
                                        {errors.machine_serial_number && touched.machine_serial_number && 
                                       <div className="input-feedback">{errors.machine_serial_number}</div>}
                                        </CCol>
                                    </CCol>
                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-tv" className='m-2'/><b>Machine Age:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput style={{width: '85%'}}
                                             type="text" id="machineAge" name="machineAge" placeholder="Machine Age"
                                              onChange={handleChange} className={errors.machineAge && touched.machineAge && "error"}/>
                                        </CFormGroup>
                                        {errors.machineAge && touched.machineAge && 
                                       <div className="input-feedback">{errors.machineAge}</div>}
                                        </CCol>
                                    </CCol>

                               </CRow>
                                
                               <CRow className="pt-3 pb-2">
                                <CCol xs="12" sm="12" lg="6">
                                    <CIcon name="cil-camera-control" className='m-2'/>  <b>Machine Controller:</b>
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
                                        {errors.machine_controller && touched.machine_controller && 
                                       <div className="input-feedback">{errors.machine_controller}</div>}
                                        </CCol>
                                    </CCol>

                                    <CCol xs="12" sm="12" lg="6">
                                        <CIcon name="cil-badge" className='m-2'/> <b>Controller Model:</b>
                                        <CCol>
                                        <CFormGroup>
                                            <CInput type="text" 
                                            style={{width: '85%'}}
                                            id="machine_controller_model" name="machine_controller_model" placeholder="Controller Model" 
                                            onChange={handleChange}  className={errors.machine_controller_model && touched.machine_controller_model && "error"}/>
                                        </CFormGroup>
                                        {errors.machine_controller_model && touched.machine_controller_model && 
                                       <div className="input-feedback">{errors.machine_controller_model}</div>}
                                        </CCol>
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
