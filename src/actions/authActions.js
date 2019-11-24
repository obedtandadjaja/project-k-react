export const LOGIN_BEGIN = 'LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const loginBegin = () => ({
  type: LOGIN_BEGIN
})

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload: payload
})

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
})

export const SIGNUP_BEGIN = 'SIGNUP_BEGIN'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signupBegin = () => ({
  type: SIGNUP_BEGIN
})

export const signupSuccess = payload => ({
  type: SIGNUP_SUCCESS,
  payload: payload
})

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: { error }
})

export const LOGOUT = 'LOGOUT'

export const logout = () => ({
  type: LOGOUT,
})
