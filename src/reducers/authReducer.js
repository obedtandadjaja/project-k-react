import { Map } from 'immutable'
import API from './../api/client'
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from './../actions/authActions'

const initialState = Map({
  accessToken: localStorage.getItem('accessToken'),
  sessionToken: localStorage.getItem('sessionToken'),
  currentUserID: localStorage.getItem('userID'),
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
    API.updateAccessToken(action.payload.jwt)
    API.updateSessionToken(action.payload.session)

    localStorage.setItem('accessToken', action.payload.jwt)
    localStorage.setItem('sessionToken', action.payload.session)
    localStorage.setItem('userID', action.payload.user_id)

    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      sessionToken: action.payload.session,
      currentUserID: action.payload.user_id,
    })

  case LOGIN_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error,
    })

  case SIGNUP_BEGIN:
    return state.merge({
      loading: true
    })

  case SIGNUP_SUCCESS:
    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      sessionToken: action.payload.session,
    })

  case SIGNUP_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error.response
    })

  case LOGOUT:
    API.updateAccessToken(null)
    API.updateSessionToken(null)

    localStorage.removeItem('accessToken')
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('userID')

    return state.merge({
      loading: false,
      accessToken: null,
      sessionToken: null,
      currentUserID: null,
    })

  default:
    return state
  }
}
