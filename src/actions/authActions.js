export const LOGIN_BEGIN = 'LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const loginBegin = () => ({
  type: LOGIN_BEGIN
})

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload: { payload }
})

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
})
