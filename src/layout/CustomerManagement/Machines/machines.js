import React, { useState } from 'react'

import {
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CAlert,
  CDataTable,
  CRow,
  CButton,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { css } from "@emotion/react";
import MachineService from '../../../services/machineService';
import { useHistory } from "react-router-dom";
import QRCode from 'qrcode.react';
import ClipLoader from "react-spinners/ClipLoader";

const machineService = new MachineService()

const fields = [
  { key: 'machine_id', _style: { width: '40%'} },
  { key: 'customerCode', _style: { width: '20%'} },
  { key: 'machine_type', _style: { width: '20%'} },
  { key: 'machine_make', _style: { width: '20%'} },
  { key: 'machine_model', _style: { width: '20%'} },
  { key: 'machine_serial_number', _style: { width: '20%'} },
  { key: 'machine_age_as_on_installation', _style: { width: '20%'} },
  { key: 'machine_controller', _style: { width: '20%'} },
  { key: 'machine_controller_model', _style: { width: '20%'} },
  { key: 'generateQRCode', _style: { width: '20%'} },
]
const override = css`
display: block;
margin: 0 auto;
`;

export default function Machines() {
  const history = useHistory();

  const conditionalRowStyles = [
    {
      when: row => row.calories < 300,
      style: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    }
  ];

  const [confirmPopup, setConfirmPopup] = useState(false)
  const [qrPopup, setQrPopup] = useState(false)

  const [alert, setAlert] = useState(false)
  const [editAlert, setEditAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clickedMachine, setClickedMachine] = useState()
  const [qrValue, setQrValue] = useState()

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [data, setData] = useState([])

  const getData = async () => {
    setLoading(true)
    let res = await machineService.getAllMachines()
    setData(res.data)
    setLoading(false)
  }

  const addMachineHandler = () => {
    history.push('./createMachine')
  }
  const editMachineHandler = (item) => {
    history.push({
      pathname: `/editMachine/${item.machine_id}`,
      state: item
    });
  }

  const getQrCode = async() => {
    let res = await machineService.generateQRCode(clickedMachine)
    console.log('res qrCode', res.data)
    setQrValue(atob(res.data.encode_string))
  }



  React.useEffect(() => {
    getData()
    // setLoading(true)
    // setTimeout(function () {
    //   setLoading(false)
    // }, 2000);
  }, [])

  return (
      <div style={{position: 'relative'}}>
      {/* <div style={{position: 'absolute', top: '45%', left: '50%'}}>
      <div className="sweet-loading">
      <ClipLoader  loading={loading}  size={60} color='#2f4f4f'/>
     </div> 
      </div> */}
      <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        Successfully Added!
      </CAlert>
      <CAlert color="success" show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
        Updated Successfully!
      </CAlert>

      <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
        Deleted Successfully!
      </CAlert>
      <CRow>
        <CCol xs="12" lg="12">
          {/* {!loading ?   */}
          <CCardBody>
            <CRow className="mb-2">
              <CCol xs="10" style={{ display: 'flex', alignItems: 'center' }}>
                <h5>
                  Machines
                </h5>
              </CCol>
              <CCol xs="2"  style ={{width: '100px'}} >
                <CButton color="info" onClick={addMachineHandler} block>New</CButton>
              </CCol>
            </CRow>
            <CDataTable
              items={data}
              fields={fields}
              hover
              columnFilter
              sorter
              bordered
              size="sm"
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={20}
              pagination
              scopedSlots={{
                'machine_id':
                  (item) => (
                    <td>
                      <CLink> <a onClick={() => {
                        editMachineHandler(item)
                      }
                      }
                      >{item.machine_id}</a></CLink>
                    </td>
                  ),
                'customerCode':
                  (item) => (
                    <td>{item.client_id}
                    </td>
                  ),
                'make':
                  (item) => (
                    <td>{item.machine_make}
                    </td>
                  ),
                'model':
                  (item) => (
                    <td>{item.machine_model}
                    </td>
                  ),
                'machineSerialNo':
                  (item) => (
                    <td>{item.machine_serial_number}
                    </td>
                  ),
                'machineSerialNo':
                  (item) => (
                    <td>{item.machine_serial_number}
                    </td>
                  ),
                'machineAge':
                  (item) => (
                    <td>{item.machine_age_as_on_installation}
                    </td>
                  ),
                'controller':
                  (item) => (
                    <td>{item.other_machine_controller ? item.other_machine_controller : item.machine_controller}
                    </td>
                  ),
                'controllerModel':
                  (item) => (
                    <td>{item.machine_controller_model}
                    </td>
                  ),
                'machine_type':
                  (item) => (
                    <td>{item.other_machine_type ? item.other_machine_type : item.machine_type}
                    </td>
                  ),
                'generateQRCode':
                  (item) => (
                    <td style={{ textAlign: 'center' }}>
                      <CLink><a onClick={() => {
                        setConfirmPopup(true)
                        setClickedMachine(item.machine_id)
                      }
                      }>
                      <CIcon name="cil-qr-code" style={{ color: 'gray' }} customClasses="c-sidebar-nav-icon" />
                      </a></CLink>
                    </td>
                  )
              }}
            />

            <CModal
              show={confirmPopup}
              onClose={() => setConfirmPopup(false)}
              color="info"
            >
              <CModalHeader>
                <CModalTitle>Confirm ?</CModalTitle>
              </CModalHeader>
              <CModalBody>
              Are you sure you want to generate QR Code for MachineID: {clickedMachine}
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setConfirmPopup(false)}>No</CButton>
                <CButton color="info" onClick={() => {
                  setConfirmPopup(false)
                  getQrCode()
                  setQrPopup(true)
                }}>Yes</CButton>{' '}
              </CModalFooter>
            </CModal>

            <CModal
              show={qrPopup}
              onClose={() => setQrPopup(false)}
              color="info"
            >
              <CModalHeader>
                <CModalTitle>QRCode for MachineID: {clickedMachine}</CModalTitle>
              </CModalHeader>
              <CModalBody style={{display: 'flex', justifyContent: 'center'}}>
                {qrValue ?
              <QRCode value={qrValue} size="150" />
              : null }
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setQrPopup(false)}>Cancel</CButton>
                <CButton color="info" >Print</CButton>{' '}
              </CModalFooter>
            </CModal>


          </CCardBody>
        </CCol>
      </CRow>
    </div>
  )
}
