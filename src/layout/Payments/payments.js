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
  CDataTable,
  CRow,
  CButton,
  CFormGroup,
  CLabel,
  CInput,
} from '@coreui/react'


const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'on-site': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  const fields = ['name', 'type','description',]

export default function Payments() {
    const [info, setInfo] = useState(false)
    const [data, setData] = useState([
      {id: 0,  name: 'Payment', type: 'Payment Type',description:'Payment Desc',
     },
    ])

    const [description,setDescription] = useState("")
    const [type,setType] = useState("")
    const [name,setName] = useState("")
    const [alert,setAlert] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editAlert,setEditAlert] = useState(false)

    const [deleteAlert,setDeleteAlert] = useState(false)
    const [updateId, setUpdateId] = useState()

    const submitHandler = () => {
      let currentData = {}
      currentData.id = Math.round(Math.random() * 10000000)
      currentData.description=description
      currentData.type=type
      currentData.name=name
      let allData = [...data]
      allData.push(currentData)
      setData(allData)
      console.log('alldata',allData);
      setInfo(!info)
      setAlert(true)
  }
  const editBtnHandler = () => {   
    let updatedData = {}
      updatedData.id = updateId
      updatedData.description=description
      updatedData.type=type
      updatedData.name=name
      console.log('updatedData', updatedData)
      let filteredArr = data.filter(function( obj ) {
        return obj.id !== updateId;
      });
      console.log(filteredArr)
      setData([...filteredArr, updatedData])

      setEditModal(false)
      setEditAlert(true)
     
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
  const deleteHandler = () => {
    let element = [...data]
    let updatedData = {}
    updatedData.id = updateId
    console.log(updatedData.id);
    element = element.filter(item => item.id !==updatedData.id);
    setData(element)
    setEditModal(false)

    setDeleteAlert(true)
}
  return (
    <>
   <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            {/* <CCardHeader>
             All
              <DocsLink name="CModal"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
              <CCol xs="11">
              Payments
              </CCol>
              <CCol xs="1">
              <CButton  color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
        items={data}
        fields={fields}
        conditionalRowStyles={conditionalRowStyles}
        itemsPerPage={5}
        pagination
        scopedSlots = {{
          'name':
            (item)=>(
              <td>
             <a  onClick={()=>{
              setUpdateId(item.id)
               setName(item.name)
               setDescription(item.description)
               setType(item.type)
              
                setEditModal(!editModal)}
             }
                >{item.name}</a>
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
                <CModalTitle>Add New</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>

            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="name">Name</CLabel>
                <CInput type="text" id="name" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="type">Type</CLabel>
                <CInput type="text" id="type" name="type" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                <CInput type="text" id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>

              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
                <CButton color="info" onClick={submitHandler}>Submit</CButton>{' '}
              </CModalFooter>
            </CModal>
            <CModal show={alert} variant="success" onClose={() => setAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setAlert(false)}>Successfully Added!</CModalHeader>
          </CModal>
          <CModal show={editAlert} variant="success" onClose={() => setEditAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setEditAlert(false)}>Updated Successfully</CModalHeader>
          </CModal>

          <CModal show={deleteAlert} variant="success" onClose={() => setDeleteAlert(false)} dismissible>
            <CModalHeader closeButton onClick={() => setDeleteAlert(false)}>Deleted Successfully</CModalHeader>
          </CModal>
            </CCardBody>
          </CCard>
        </CCol>
        <CModal 
              show={editModal} 
              onClose={() => setEditModal(!editModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Payments</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CRow>

            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="name">Name</CLabel>
                <CInput type="text" id="name" name="name" placeholder="name" value={name?name:''} onChange={(e) => setName(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>
            <CRow>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="type">Type</CLabel>
                <CInput type="text" id="type" name="type" placeholder="Type" value={type?type:''} onChange={(e) => setType(e.target.value)}/>
              </CFormGroup>
            </CCol>
            <CCol xs="10" md="6">
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                <CInput type="text" id="description" name="description" placeholder="Description" value={description?description:''} onChange={(e) => setDescription(e.target.value)}/>
              </CFormGroup>
            </CCol>
            </CRow>

              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={ deleteHandler}>Delete</CButton>
                <CButton color="info" onClick={editBtnHandler}>Edit</CButton>{' '}
              </CModalFooter>
            </CModal>
        </CRow>
    </>
  )
} 