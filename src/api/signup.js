import axios from 'axios'

import { BACKEND_BASE_URL as BASE_URL } from './../constants'
import {
  signupBegin,
  signupSuccess,
  signupFailure,
} from './../actions/authActions'

export function signup({ email, password }) {
  return dispatch => {
    dispatch(signupBegin)

    return axios.post(
      `${BASE_URL}/api/v1/signup`,
      { email, password}
    ).then(
      res => dispatch(signupSuccess(res.data)),
      err => dispatch(signupFailure(err.response))
    )
  }
}
