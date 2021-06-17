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
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import MachineService from '../../../services/machineService';
import { useHistory } from "react-router-dom";

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


  const [alert, setAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editAlert, setEditAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
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
                    <td>{item.machine_controller}
                    </td>
                  ), 
                  'controllerModel':
                  (item) => (
                    <td>{item.machine_controller_model}
                    </td>
                  )
              }}

            />

          </CCardBody>
        </CCol>
      </CRow>
    </div>
  )
}
