import axios from 'axios'

import { BACKEND_BASE_URL as BASE_URL } from './../constants'
import {
  loginBegin,
  loginSuccess,
  loginFailure,
} from './../actions/authActions'

export function login({ email, password }) {
  return dispatch => {
    dispatch(loginBegin())

    return axios.post(`${BASE_URL}/api/v1/login`, { email, password })
      .then(res => dispatch(loginSuccess(res.data)))
      .catch(err => dispatch(loginFailure(err.response)))
  }
}
