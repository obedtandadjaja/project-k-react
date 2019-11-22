import { Map } from 'immutable'
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './../actions/authActions'

const initialState = Map({
  isAuthenticated: Boolean(localStorage.getItem('refreshToken')),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  credentialUUID: localStorage.getItem('credentialUUID'),
  loading: false,
  error: null,
})

export default function authReducer(state=initialState, action) {
  switch (action.type) {
  case LOGIN_BEGIN:
    return state.merge({
      loading: true
    })

  case LOGIN_SUCCESS:
    localStorage.setItem('accessToken', action.payload.jwt)
    localStorage.setItem('refreshToken', action.payload.session)
    localStorage.setItem('credentialUUID', action.payload.credential_uuid)

    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      refreshToken: action.payload.session,
      credentialUUID: action.payload.session,
      isAuthenticated: Boolean(action.payload.session),
    })

  case LOGIN_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error,
      isAuthenticated: false,
    })

  case SIGNUP_BEGIN:
    return state.merge({
      loading: true
    })

  case SIGNUP_SUCCESS:
    return state.merge({
      loading: false,
      isAuthenticated: Boolean(action.payload.session),
      accessToken: action.payload.jwt,
      refreshToken: action.payload.session,
    })

  case SIGNUP_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error
    })

  default:
    return state
  }
}
