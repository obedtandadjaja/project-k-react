import axios from 'axios'

import { API_HOST } from './constants'
import {
  signupBegin,
  signupSuccess,
  signupFailure,
} from './../actions/authActions'

export function signup(email, password) {
  return dispatch => {
    dispatch(signupBegin)

    return axios.post(`http://${API_HOST}/auth/api/v1/credentials`, { email, password}).then(
      res => dispatch(signupSuccess(res.data)),
      err => dispatch(signupFailure(err))
    )
  }
}
