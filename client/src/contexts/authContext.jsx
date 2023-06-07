import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { authReducer } from "../reducers/authReducer";

// API
import { apiUrl, LOCAL_STORAGE_TOKE_NAME } from "./constants";
import { AuthReducerConstant } from "./constants";

// set token
import setAuthToken from "../utils/setAuthToken";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, AuthReducerConstant);
  // Authenticate user
  const loadUser = async () => {
    // nếu như có
    if (localStorage[LOCAL_STORAGE_TOKE_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKE_NAME])
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.user
          }
        })
      }

    } catch (e) {
      localStorage.removeItem(LOCAL_STORAGE_TOKE_NAME)
      setAuthToken(null)
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null }
      })
    }
  }

  useEffect(() => {
    loadUser();
  }, []);
  //Register
  const RegisterUser = async registerForm => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, registerForm)
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKE_NAME, response.data.accessToken)

        await loadUser();
        return response.data
      }
    } catch (e) {
      if (e.response.data) return e.response.data
      else return { success: false, message: e.message }
    }
  }
  // 
  // login
  const loginUser = async userForm => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm)
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKE_NAME, response.data.accessToken)

      await loadUser();
      return response.data
    } catch (e) {
      if (e.response.data) return e.response.data
      else return { success: false, message: e.message }
    }
  }


  const logOutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKE_NAME)
    dispatch({
      type: 'SET_AUTH',
      payload: {isAuthenticated: false, user: null}
    })
  }
  // context data
  const authContextData = { loginUser, RegisterUser ,logOutUser,authState}

  // return provider

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider