import axios from 'axios'

import { AUTH_BASE_URL } from './../constants'
import {
  loginBegin,
  loginSuccess,
  loginFailure,
} from './../actions/authActions'

export function login({ email, password }) {
  return dispatch => {
    dispatch(loginBegin())

    return axios.post(`${AUTH_BASE_URL}/api/v1/login`, { email, password }).then(
      res => {
        console.log(res.data)
        dispatch(loginSuccess(res.data))
      },
      err => dispatch(loginFailure(err))
    )
  }
}
