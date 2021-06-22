import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import CommonService from '../services/commonService';

let commonService = new CommonService()
const TheHeaderDropdown = () => {
  const history = useHistory(); 
const [displayName, setDisplayName] = React.useState()

  const logoutHandler = async () => {
    await commonService.logout()
    history.push('/login');
  }

  const profileHandler = () => {
    history.push('/profile');
  }

  const getToken = async() => {
    let tokendata = await commonService.getToken()
    console.log(tokendata)
    if(tokendata && JSON.parse(tokendata).display_name ){
    setDisplayName(JSON.parse(tokendata).display_name)
    }
  }

  React.useEffect(() => {
    getToken()
  },[])

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg style={{ marginRight: '20px' }}
            src={'avatars/9.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
        <span style={{fontWeight: 'bold'}}>{displayName}</span> 
        {/* <CIcon name="cib-aurelia" style={{ color:'gray' }} customClasses="c-sidebar-nav-icon"/> */}
        <CImg style={{ marginLeft: '8px', height: '8px', width: '16px',marginTop: '2px' }}
            src={'images/arrow.png'}
            alt="arrow-down"
          />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem divider />
        <CDropdownItem>
          <CButton name="cil-lock-locked" className="mfe-2" onClick={logoutHandler}>Log Out</CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton name="cil-lock-locked" className="mfe-2" onClick={profileHandler}>My Profile</CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
