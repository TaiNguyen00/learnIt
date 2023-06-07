import { AuthContext } from '../../contexts/authContext';
import { useContext, useState } from 'react';


import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';

import { Link } from "react-router-dom"
import AlertMessage from '../Layout/AlertMessage';


import {useHistory} from "react-router-dom"
const RegisterForm = () => {
  const { RegisterUser } = useContext(AuthContext)

  const history = useHistory();

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    comfirmPassword: ''
  })

  const [alert, setAlert] = useState(null)
  const { username, password, comfirmPassword } = registerForm;

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value
    })
  }

  const register = async event => {
    event.preventDefault()
    if (password !== comfirmPassword) {
      setAlert({
        type: 'danger',
        message: 'Password do not match'
      })
      setTimeout(() => setAlert(null), 2000)
    }

    try {
      const registerData = await RegisterUser(registerForm)
      if(!registerData.success) {
        setAlert({
          type: 'danger',
          message: registerData.message
        })
        setTimeout(() => setAlert(null), 2000)
      }
      if (registerData.success) {
        history.push("/login")
      }
      console.log('register data', registerData)
    } catch (e) {
      console.log(e)
    }
  }
  console.log('username', username);
  console.log('password', password)
  return (
    <>
      <MDBContainer className="my-5">
        <form action='' onSubmit={register}>
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100 custom-img-login' />
              </MDBCol>

              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>
                  <AlertMessage info={alert}  className='text-center'/>
                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" name='username' value={username}
                    onChange={onChangeRegisterForm} />
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name='password' value={password}
                    onChange={onChangeRegisterForm} />
                  <MDBInput wrapperClass='mb-4' label='Comfirm Password' id='formControlLg' type='password' size="lg" name='comfirmPassword' value={comfirmPassword}
                    onChange={onChangeRegisterForm} />

                  <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>

                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>You have an account? <Link to='/login'>Sign in here</Link></p>

                  <div className='d-flex flex-row justify-content-start'>
                    <a href="" className="small text-muted me-1">Terms of use.</a>
                    <a href="" className="small text-muted">Privacy policy</a>
                  </div>

                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </form>
      </MDBContainer>
    </>
  )
}

export default RegisterForm