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
} from '@coreui/react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

  const fields = ['name', 'type','description',]
  const override = css`
  display: block;
  margin: 0 auto;
`;

export default function EmployeeMangement() {
    const [info, setInfo] = useState(false)
    const [data, setData] = useState([
      {id: 0,  name: 'Employee', type: 'Employee Type',description:'Employee Desc',
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
    const  [loading,setLoading] = useState(false)

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
      setLoading(true)
      setTimeout(function(){  
         setLoading(false)
         setAlert(true)
       }, 3000);
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
      setLoading(true)
      setTimeout(function(){  
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
  const deleteHandler = () => {
    let element = [...data]
    let updatedData = {}
    updatedData.id = updateId
    console.log(updatedData.id);
    element = element.filter(item => item.id !==updatedData.id);
    setData(element)
    setEditModal(false)
    setLoading(true)
    setTimeout(function(){  
       setLoading(false)
       setDeleteAlert(true)
     }, 3000);
}

React.useEffect(() => {
  setLoading(true)
  setTimeout(function(){  
    setLoading(false)
  }, 2000);
},[])

  return (
    <>
     <div className="sweet-loading">
      <ClipLoader  loading={loading}  css={override} size={50} color='#2f4f4f'/>
    </div>
    <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
           Successfully Added!
          </CAlert>
          <CAlert color="success"show={editAlert} closeButton onClick={() => setEditAlert(false)} dismissible>
           Updated Successfully!
          </CAlert>

          <CAlert color="danger" show={deleteAlert} closeButton onClick={() => setDeleteAlert(false)} dismissible>
            Deleted Successfully!
          </CAlert>
       <CRow>
        <CCol xs="12" lg="12">
        {!loading ?  
          <CCard>
            {/* <CCardHeader>
             All
              <DocsLink name="CModal"/>
            </CCardHeader> */}
            <CCardBody>
              <CRow>
              <CCol xs="11">
              Employee Management
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

            </CCardBody>
          </CCard>
          : null }
        </CCol>
        <CModal 
              show={editModal} 
              onClose={() => setEditModal(!editModal)}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit Employee</CModalTitle>
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