import axios from 'axios'

import { API_HOST, BACKEND_PROXY_PREFIX } from './../constants'
import {
  signupBegin,
  signupSuccess,
  signupFailure,
} from './../actions/authActions'

export function signup({ email, password }) {
  return dispatch => {
    dispatch(signupBegin)

    return axios.post(
      `http://${API_HOST}${BACKEND_PROXY_PREFIX}/api/v1/users/signup`,
      { email, password}
    ).then(
      res => dispatch(signupSuccess(res.data)),
      err => dispatch(signupFailure(err))
    )
  }
}
