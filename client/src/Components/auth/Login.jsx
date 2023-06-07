import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

import { Link, useHistory} from "react-router-dom"


// contexts api
import { useState, useContext } from "react"
import { AuthContext } from '../../contexts/authContext';

// SET ALERT
import AlertMessage from '../Layout/AlertMessage';

const LoginForm = () => {

  // Router
  const history = useHistory();

  
  // call aip login
  const { loginUser } = useContext(AuthContext)

  const [LoginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const [alert, setAlert]  = useState(null)


  const { username, password } = LoginForm;

  const onChangeLoginForm = (e) => {
    setLoginForm({
      ...LoginForm,
      [e.target.name]: e.target.value
    })

  }

  const login = async e => {
    e.preventDefault()
    try {
      const loginData = await loginUser(LoginForm);
      console.log('login data', loginData);
      if (loginData.success) {
        // history.push('/home')
      } else {
         setAlert({
          type: 'danger',
          message: loginData.message
         })
         setTimeout(() => setAlert(null),2000)
      } 
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <MDBContainer fluid className="p-3 my-5">
      <form action="" onSubmit={login}>
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
          <AlertMessage info={alert} className='text-center'/>
            <MDBInput wrapper className='mb-4' label='Email address' id='formControlLg' type='text' name='username' size="lg" value={username}
              onChange={onChangeLoginForm}
            />
            <MDBInput wrapper className='mb-4' label='Password' id='formControlLg' type='password' size="lg" name='password' value={password}
              onChange={onChangeLoginForm}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <p>You don't have an account ? <Link to='/register'>Register here</Link></p>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with facebook
            </MDBBtn>
    
            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with twitter
            </MDBBtn>

          </MDBCol>

        </MDBRow>
      </form>

    </MDBContainer>
  )
}

export default LoginForm;