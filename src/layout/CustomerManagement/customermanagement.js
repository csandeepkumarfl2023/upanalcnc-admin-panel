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

export default function Overview() {

  return (
    <>
       <CCol xs="12" md="6" className="mb-4">
        <CCard>
          <CCardBody>
            <CTabs activeTab="home">
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
                  {`1.`}
                </CTabPane>
                <CTabPane data-tab="machines">
                  {`2. `}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}    