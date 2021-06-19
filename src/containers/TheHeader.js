import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CInput,
  CSubheader,
  CImg,
  CBreadcrumb,
  CBreadcrumbItem,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import routes from '../routes'
import {
  useLocation
} from "react-router-dom";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
} from './index'

const TheHeader = (props) => {
  const dispatch = useDispatch()
  let location = useLocation();
  const sidebarShow = useSelector(state => state.sidebarShow)

  const [childRouteNameIndex, setChildRouteNameIndex] = React.useState(0)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  React.useEffect(() => {
    let childRouteCheck = location.pathname.split('').slice(1).findIndex((elem => elem == '/'))
    if (childRouteCheck) {
      setChildRouteNameIndex(childRouteCheck)
    } else {
      setChildRouteNameIndex()
    }
  })

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <CImg style={{height:'38px',width:'150px'}}
            src={'avatars/logo.jpg'}
            alt="admin@bootstrapmaster.com"
          />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CInput
            className="mr-sm-2"
            placeholder="Search"
            style={{ width: '200%' }}
          >
            {/* <CIcon name="cil-phone"  size="1xl"/> */}
          </CInput>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/> */}
        <TheHeaderDropdown />
      </CHeaderNav>
      <CSubheader className="px-3 justify-content-between">
        {/* <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        /> */}

        <CBreadcrumb style={{ border: 'none', padding: 0, margin: '12px' }}>
          <CBreadcrumbItem>
            <CLink to="/overview">Home</CLink>
          </CBreadcrumbItem>
          {childRouteNameIndex <= 0 ?
            <CBreadcrumbItem>
              <a style={{ textTransform: 'capitalize' }}>{location.pathname.slice(1)}</a>
            </CBreadcrumbItem>

            :
            <>
              <CBreadcrumbItem>
                <CLink to={location.pathname.includes('editCustomer') ? '/customermanagement' : location.pathname.includes('editServiceReques') ? '/servicerequest' : '/'}  style={{ textTransform: 'capitalize' }}>{location.pathname.slice(1, childRouteNameIndex + 1)}</CLink>
              </CBreadcrumbItem>
              <CBreadcrumbItem>
                <a style={{ textTransform: 'capitalize' }}>{location.pathname.slice(childRouteNameIndex + 2)}</a>
              </CBreadcrumbItem>
            </>
          }
        </CBreadcrumb>
      </CSubheader>

    </CHeader>
  )
}

export default TheHeader
