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
} from './../actions/authActions'

const initialState = Map({
  isAuthenticated: Boolean(localStorage.getItem('refreshToken')),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  userID: localStorage.getItem('userID'),
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
    localStorage.setItem('userID', action.payload.userID)

    return state.merge({
      loading: false,
      accessToken: action.payload.jwt,
      refreshToken: action.payload.session,
      userID: action.payload.user.id,
      currentUser: action.payload.user,
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

  case GET_CURRENT_USER_SUCCESS:
    return state.merge({
      currentUser: action.payload
    })

  case GET_CURRENT_USER_FAILURE:
    return state.merge({
      error: action.payload.error,
      currentUser: null,
    })

  default:
    return state
  }
}
