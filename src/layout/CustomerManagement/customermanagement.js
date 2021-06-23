import React, { useState } from 'react'

import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CAlert
} from '@coreui/react'
import Customer from './Customers/customer'
import Machines from './Machines/machines'

export default function CustomerManagement(props) {

  const [alert, setAlert] = useState(false)

  const showAlert = () => {
    if(props.location.state === 'Customer added')
    setAlert(true)
    if(props.location.state === 'Customer updated')
    setAlert(true)
    if(props.location.state === 'Machine added')
    setAlert(true)
    if(props.location.state === 'Machine updated')
    setAlert(true)
  }
  
  React.useEffect(() => {
    showAlert()
  },[])

  return (
    <>
     <CAlert color="success" show={alert} closeButton onClick={() => setAlert(false)} dismissible>
        {props.location.state} Successfully!
      </CAlert>
       <CCol xs="6" md="12" className="mb-4">
        <CCard  className="mt-2">
          <CCardBody>   
            <CTabs activeTab="customers">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="customers">
                    Customers
                  </CNavLink>
                </CNavItem>
                <CNavItem> 
                  <CNavLink data-tab="machines">
                    Machines
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="customers">
                 <Customer addAlert={() => showAlert()} />
                </CTabPane>
                <CTabPane data-tab="machines">  
                 <Machines />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}    