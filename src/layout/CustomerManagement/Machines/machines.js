import React, { useState } from 'react'

import {
  CSelect,
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
  CFormGroup,
  CLabel,
  CInput,
  CLink,
  CCard
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { css } from "@emotion/react";
import MachineService from '../../../services/machineService';
import { useHistory } from "react-router-dom";
import QRCode from 'qrcode.react';

const machineService = new MachineService()

const fields = ['machine_id', 'customerCode', 'machine_type', 'make', 'model', 'machineSerialNo', 'machineAge', 'controller', 'controllerModel', 'generateQRCode']
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

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [data, setData] = useState([])

  const getData = async () => {
    let res = await machineService.getAllMachines()
    setData(res.data)
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



  React.useEffect(() => {
    getData()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

  return (
    <div>
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
              <CCol xs="11" style={{ display: 'flex', alignItems: 'center' }}>
                <h5>
                  Machines
                </h5>
              </CCol>
              <CCol xs="1" style={{ display: 'flex', alignItems: 'center' }}>
                <CButton color="info" onClick={addMachineHandler} block>New</CButton>
              </CCol>
            </CRow>
            <CDataTable
              items={data}
              fields={fields}
              conditionalRowStyles={conditionalRowStyles}
              itemsPerPage={5}
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
                      <CIcon name="cil-user" style={{ color: 'gray' }} customClasses="c-sidebar-nav-icon" />
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
              <QRCode value={clickedMachine} size="150" />
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
