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
              <CButton block variant="ghost" color="info" onClick={() => setInfo(!info)} className="mr-1">New</CButton>
            </CCol>
            </CRow>
            <CDataTable
             items={data}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
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
            </CCardBody>
          </CCard>
        </CCol>
        </CRow>
    </>
  )
} 