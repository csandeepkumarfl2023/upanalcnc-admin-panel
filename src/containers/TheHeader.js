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
import {
  useLocation 
} from "react-router-dom";

import {
  TheHeaderDropdown,
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
    console.log('breadc', location.pathname.slice(1))
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
        

    </CHeader>
  )
}

export default TheHeader
