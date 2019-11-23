import { Map } from 'immutable'
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  LOGOUT,
} from './../actions/authActions'

const initialState = Map({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  getCurrentUserID: localStorage.getItem('userID'),
  currentUser: null,
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
    localStorage.setItem('userID', action.payload.user.id)

    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      refreshToken: action.payload.session,
      currentUserID: action.payload.user.id,
    })

  case LOGIN_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error.response,
    })

  case SIGNUP_BEGIN:
    return state.merge({
      loading: true
    })

  case SIGNUP_SUCCESS:
    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      refreshToken: action.payload.session,
    })

  case SIGNUP_FAILURE:
    return state.merge({
      loading: false,
      error: action.payload.error.response
    })

  case GET_CURRENT_USER_SUCCESS:
    return state.merge({
      currentUser: action.payload
    })

  case GET_CURRENT_USER_FAILURE:
    return state.merge({
      error: action.payload.error.response,
      currentUser: null,
    })

  case LOGOUT:
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userID')

    return state.merge({
      loading: false,
      accessToken: null,
      refreshToken: null,
      currentUserID: null,
    })

  default:
    return state
  }
}
