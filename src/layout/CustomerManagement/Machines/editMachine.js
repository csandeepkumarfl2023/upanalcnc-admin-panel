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
import CIcon from '@coreui/icons-react'
import '../../styles.css'
import { Formik } from "formik"
import * as yup from 'yup'

const machineService = new MachineService()
const customerservice = new CustomerService()
const commonService = new CommonService()

export default function EditMachine(props) {
    const validation = yup.object().shape({
        machineType: yup
           .string()
           .required('Machine Type required'),
           customerCode: yup
           .string()
           .required('customer Code required'),
           make: yup
           .string()
           .required('make required'),
           model: yup
           .string()
           .required('model required'),
           machineSerialNo: yup
           .string()
           .required('machineSerialNo required'),
           machineAge: yup
           .string()
           .required('machineAge required'),
           controller: yup
           .string()
           .required('controller required'),
           controllerModel: yup
           .string()
           .required('controller Model required'),

     })



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
    const [edit, setEdit] = React.useState(false)

    const [alert, setAlert] = useState(false)

    const [data, setData] = useState({
        machineType: "", customerCode: "", make: "", model: "", machineSerialNo: "",
        machineAge: "", controller: "", controllerModel: ""
     })

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
        let currentData = {}
        currentData = {...data}
        currentData.customerCode = res.data.client_id
        currentData.machineType = res.data.machine_type
        currentData.make = res.data.machine_make
        currentData.model = res.data.machine_model
        currentData.machineSerialNo = res.data.machine_serial_number
        currentData.machineAge = res.data.machine_age_as_on_installation
        currentData.controller = res.data.machine_controller
        currentData.controllerModel = res.data.machine_controller_model
        setData(currentData)

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
      <Formik
                enableReinitialize={true}
                validationSchema={validation}
                initialValues={data}
                onSubmit={(values) => {
                    console.log(values)
                    submitHandler(values)
                }}>
                {({ handleSubmit, handleChange, values,errors, touched, setFieldValue }) => (

        <CCard className="mt-2">
            <CCardHeader>
            <CRow className="pl-3 mt-3" >
                    <CCol xs="6" md="11">
                        <CCardSubtitle style={{ marginTop: '1%' }}>Machine {item ? item.machine_id : null}</CCardSubtitle>
                    </CCol>
                    <CCol xs="6" md="1">
                    <CIcon name="cil-pen" size="lg" style={{ cursor: 'pointer' }} onClick={() => {setEdit(true)}}>
                  </CIcon>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <CCol xs="12" md="6">
                        
                    <CIcon name="cil-check-circle" className='m-1'/> <b>Customer Code:    </b>
                    { edit ?
                    <>
                        <CFormGroup style={{ marginTop: '10px' }}>
                                <CSelect custom size="md" name="customerCode" id="customerCode"
                                            onChange={handleChange}
                                            value={values.CustomerCode}  className={errors.CustomerCode && touched.CustomerCode && "error"}>
                                            <option value="0">Open this select menu</option>
                                            {customerseArr && customerseArr.length ? customerseArr.map((elem) => {
                                                return <option key={elem.client_id} value={elem.client_id} style={{ textTransform: 'capitalize' }}>{elem.client_id}</option>
                                            }
                                            ) : null}
                                        </CSelect>
                        </CFormGroup>
                          {errors.customerCode && touched.customerCode &&
                            <div className="input-feedback">{errors.customerCode}</div>}
                            </>
                       : customerCode }
                      
                    </CCol>
                    <CCol xs="12" lg="6">
                    <CIcon name="cil-cog" className='m-1'/>  <b>Machine Type:    </b>
                    { edit ?
                        <CFormGroup style={{ marginTop: '10px' }} >
                                 <CSelect custom size="md" name="machine_type" id="machine_type"
                                            value={values.machineType}
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
                        : machineType }
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

                <CCol xs="12" md="6">
                    <CIcon name="cil-arrow-thick-right" className='m-1'/>  <b>Make:    </b>
                    { edit ?
                    <>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="make" className="w-52"
                                name="make" placeholder="make" value={values.make} 
                                onChange={handleChange} 
                                className={errors.make && touched.make && "error"} />
                        </CFormGroup>
                          {errors.make && touched.make &&
                            <div className="input-feedback">{errors.make}</div>}
                            </>
                        : make }
                       

                    </CCol>

                    <CCol xs="12" md="6">
                    <CIcon name="cil-pen-nib" className='m-1'/> <b>Model:    </b>
                    { edit ?
                    <>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="model" className="w-52"
                                name="model" placeholder="model" value={values.model}
                                 onChange={handleChange} 
                                 className={errors.model && touched.model && "error"} />
                        </CFormGroup>
                        {errors.model && touched.model &&
                            <div className="input-feedback">{errors.model}</div>}
                            </>
                        : model }
                         
                    </CCol>

                </CRow>

                <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <CCol xs="12" md="6">
                    <CIcon name="cil-tv" className='m-1'/> <b>MachineAge:    </b>
                    { edit ?
                    <>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="machineAge" className="w-52"
                                name="machineAge" placeholder="machineAge" value={values.machineAge}
                                onChange={handleChange} 
                                 className={errors.machineAge && touched.machineAge && "error"}/>
                        </CFormGroup>
                          {errors.machineAge && touched.machineAge &&
                            <div className="input-feedback">{errors.machineAge}</div>}
                            </>
                        : machineAge }
                       
                    </CCol>
                    <CCol xs="12" md="6">
                    <CIcon name="cil-aperture" className='m-1'/>   <b>Machine SerialNo:     </b>
                    { edit ?
                    <>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="machineSerialNo" className="w-52"
                                name="machineSerialNo" placeholder="machineSerialNo" value={values.machineSerialNo} 
                                onChange={handleChange} 
                                className={errors.machineSerialNo && touched.machineSerialNo && "error"}/>
                        </CFormGroup>
                         {errors.machineSerialNo && touched.machineSerialNo &&
                            <div className="input-feedback">{errors.machineSerialNo}</div>}
                            </>
                        : machineSerialNo }
                        
                    </CCol>
                    </CRow>
       
                    <CRow style={{ marginLeft: '2%', marginTop: '2%' }}>          
                    <CCol xs="12" md="6">
                    <CIcon name="cil-camera-control" className='m-1'/> <b>Controller:     </b>
                    { edit ?
                        <CFormGroup style={{ marginTop: '10px' }}>
                                 <CSelect custom size="md" name="machine_controller" id="machine_controller" value={values.controller}
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
                        : controller }
                        {/* {! controller &&
                              <div className="input-feedback" >Controller is required</div>}  */}
                    </CCol>
                    <CCol xs="12" md="6">
                    <CIcon name="cil-badge" className='m-1'/>   <b>ControllerModel:     </b>
                    { edit ?
                    <>
                        <CFormGroup style={{ marginTop: '10px' }}>
                            <CInput type="text" id="controllerModel" className="w-52"
                                name="controllerModel" placeholder="controllerModel" value={values.controllerModel}
                                onChange={handleChange} 
                                className={errors.controllerModel && touched.controllerModel && "error"}/>
                        </CFormGroup>
                          {errors.controllerModel && touched.controllerModel &&
                            <div className="input-feedback">{errors.controllerModel}</div>}
                            </>
                        : controllerModel }
                       
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
            {edit ?
                     <CCardFooter style={{ width: '25%' }}>

                        <CRow>
                           <CCol xs="6">
                              <CButton variant="outline" block color="info" className="mr-1" onClick={() => setEdit(false)}
                              >Cancel</CButton>
                           </CCol>
                           <CCol xs="6">
                           <CButton block color="info" className="mr-1" onClick={handleSubmit}
                              >Submit</CButton>
                           </CCol>
                        </CRow>

                     </CCardFooter>
                     :
                     <CCardFooter style={{ width: '13%' }}>
                        <CButton variant="outline" block color="info" className="mr-1" onClick={() => history.push('/customermanagement')}
                        >Close</CButton>
                     </CCardFooter>
                  }
            </CRow>
        </CCardBody>
        </CCard>
       )}
     </Formik>
        </>
    )
}