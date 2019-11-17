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
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  credentialUuid: null, // need to pull this out of jwt
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
    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      refreshToken: action.payload.session,
    })

  case LOGIN_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error
    })

  case SIGNUP_BEGIN:
    return state.merge({
      loading: true
    })

  case SIGNUP_SUCCESS:
    return state.merge({
      loading: false,
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
