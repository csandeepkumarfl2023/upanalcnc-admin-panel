import React, { useState } from 'react'

import {
  CBadge,
  CCard,
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
  CLink
} from '@coreui/react'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import PmService from '../../services/pmService';

const pmservice = new PmService()
export default function Pms() {
  const [info, setInfo] = useState(false)
  const [data, setData] = useState([])

  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [name, setName] = useState("")
  const [alert, setAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editAlert, setEditAlert] = useState(false)

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [loading, setLoading] = useState(false)

  const fields = ['name', 'type', 'description',]
  const override = css`
  width: 5em;
  height: 5em;
  display: block;
    position: absolute;
    top: 50%;
    margin-top: -4.05em;
    left: 55%;
    margin-left: -5em;
  `;

  const submitHandler = async () => {
    let currentData = {}
    currentData.id = Math.round(Math.random() * 10000000)
    currentData.description = description
    currentData.type = type
    currentData.name = name
    let res = await pmservice.postPm(currentData)
    setName('')
    setDescription('')
    setType('')
    getData()
    setInfo(!info)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setAlert(true)
    }, 3000);
  }
  const editBtnHandler = async() => {
    let updatedData = {}
    updatedData.id = updateId
    updatedData.description = description
    updatedData.type = type
    updatedData.name = name
    let res = await pmservice.putPm(updatedData, updateId)
    getData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setEditAlert(true)
    }, 3000);
  }
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
  const deleteHandler = async() => {
    let res = await pmservice.deletePm(updateId)
    getData()
    setEditModal(false)
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      setDeleteAlert(true)
    }, 3000);
  }

  const getData = async () => {
    let res = await pmservice.getAllPms()
    setData(res)
  }

  const addBtnHandler = async() => {
    setType("")
    setName("")
    setDescription("")
    setInfo(!info)
  }

  React.useEffect(() => {
    getData()
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000);
  }, [])

  return (
    <>
      <div className="sweet-loading">
        <ClipLoader loading={loading} css={override} size={50} color='#2f4f4f' />
      </div>
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
          {!loading ?
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol xs="11">
                    Pm
                  </CCol>
                  <CCol xs="1">
                    <CButton color="info" onClick={addBtnHandler}style={{height:'83%',width:'100%', textAlign:'center', marginLeft: '5%'}} className="mr-1">New</CButton>
                  </CCol>
                </CRow>
                <CDataTable
                  items={data}
                  fields={fields}
                  conditionalRowStyles={conditionalRowStyles}
                  itemsPerPage={2}
                  pagination
                  scopedSlots={{
                    'name':
                      (item) => (
                        <td>
                          <CLink><a onClick={() => {
                            setUpdateId(item.id)
                            setName(item.name)
                            setDescription(item.description)
                            setType(item.type)

                            setEditModal(!editModal)
                          }
                          }
                          >{item.name}</a></CLink>
                        </td>
                      )
                  }}

                />
                <CModal
                  show={info}
                  onClose={() => setInfo(!info)}
                  color="info"
                >
                  <CModalHeader closeButton>
                    <CModalTitle>Add New PM</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <CRow>

                      <CCol xs="10" md="6">
                        <CFormGroup >
                          <CLabel htmlFor="name">Name</CLabel>
                          <CInput type="text" id="name" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="10" md="6">
                        <CFormGroup >
                          <CLabel htmlFor="type">Type</CLabel>
                          <CInput type="text" id="type" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="10" md="6">
                        <CFormGroup >
                          <CLabel htmlFor="description">Description</CLabel>
                          <CInput type="text" id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </CFormGroup>
                      </CCol>
                    </CRow>

                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
                    <CButton color="info" onClick={submitHandler}>Submit</CButton>{' '}
                  </CModalFooter>
                </CModal>

              </CCardBody>
            </CCard>
            : null}
        </CCol>
        <CModal
          show={editModal}
          onClose={() => setEditModal(!editModal)}
          color="info"
        >
          <CModalHeader closeButton>
            <CModalTitle>Edit PM </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>

              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="name">Name</CLabel>
                  <CInput type="text" id="name" name="name" placeholder="name" value={name ? name : ''} onChange={(e) => setName(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="type">Type</CLabel>
                  <CInput type="text" id="type" name="type" placeholder="Type" value={type ? type : ''} onChange={(e) => setType(e.target.value)} />
                </CFormGroup>
              </CCol>
              <CCol xs="10" md="6">
                <CFormGroup >
                  <CLabel htmlFor="description">Description</CLabel>
                  <CInput type="text" id="description" name="description" placeholder="Description" value={description ? description : ''} onChange={(e) => setDescription(e.target.value)} />
                </CFormGroup>
              </CCol>
            </CRow>

          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={deleteHandler}>Delete</CButton>
            <CButton color="info" onClick={editBtnHandler}>Edit</CButton>{' '}
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}