import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AdminService from '../../../src/services/adminService'
import CommonService from '../../services/commonService'

const loginService = new AdminService()
const commonService = new CommonService()

const Login = (props) => {


  const loginHandler = async (e) => {
    e.preventDefault()
    console.log('loginn');

    let data = {
      username: "1",
      password: "welcome",
      client_app_type: "EMPLOYEE"
    }
    try {
      let res = await loginService.postLogin(data)
      if (res) {
        let userToken = res.data.data
        await commonService.setToken(JSON.stringify(userToken))
        //  props.history.push('/overview')
      }
      props.history.push('/overview')
    }
    catch (err) {
      console.log(err.message);
    }
  }

  React.useEffect(() => {
    document.querySelectorAll('.input').forEach(item => {
      item.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById("loginBtn").click();
         }
      })
    })
  },[])

  return (

    <div className="c-app c-default-layout flex-row align-items-center">

      <CContainer>

        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" className="input" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" className="input"/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6" className="text-center">
                        {/* <CButton color="primary" className="px-4" onClick={loginHandler} style={{ marginLeft: "120px" }}>Login</CButton> */}
                        <button id="loginBtn" type="button" style={{ backgroundColor: '#321FDB', outline: 'none', border: 'none', borderRadius: '4px', color: 'white' }} className="px-4 py-2" onClick={(e) => loginHandler(e)}>Login</button>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">Forgot password?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}> */}
              <CCard className="d-md-down-none" style={{ width: '44%', flexDirection: 'row',alignItems: 'center' }}>
                <CCardBody className="text-center">
                  <div>
                    {/* <h5>Upanal CNC Solutions</h5> */}
                    <CImg style={{ height: '70%', width: '70%' }}
                      src={'avatars/logo.jpg'}
                      alt="admin@bootstrapmaster.com"
                    />
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
