import React, { useState } from 'react'

import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader
} from '@coreui/react'
import Customer from './customer'
import Machines from './machines'

export default function CustomerManagement() {

  return (
    <>
       <CCol xs="6" md="12" className="mb-4">
        <CCard>
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
                 <Customer/>
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