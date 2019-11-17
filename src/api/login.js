import axios from 'axios'

import { API_HOST } from './constants'
import {
  loginBegin,
  loginSuccess,
  loginFailure,
} from './../actions/authActions'

export function login(email, password) {
  return dispatch => {
    dispatch(loginBegin)

    return axios.post(`http://${API_HOST}/auth/api/v1/login`, { email, password}).then(
      res => dispatch(loginSuccess(res.data)),
      err => dispatch(loginFailure(err))
    )
  }
}
