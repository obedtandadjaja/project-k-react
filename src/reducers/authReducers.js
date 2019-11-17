import { Map } from 'immutable'
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './../actions/authActions'

const initialState = Map({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  credentialId: null,
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

  default:
    return state
  }
}
