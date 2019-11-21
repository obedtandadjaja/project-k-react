import axios from 'axios'

import { API_HOST, BACKEND_PROXY_PREFIX } from './../constants'
import {
  createBegin,
  createSuccess,
  createFailure,
  editBegin,
  editSuccess,
  editFailure,
  getBegin,
  getSuccess,
  getFailure,
  removeBegin,
  removeSuccess,
  removeFailure,
} from './../actions/userActions'

export function create(data) {
  return dispatch => {
    dispatch(createBegin())

    return axios.post(`http://${API_HOST}${BACKEND_PROXY_PREFIX}/api/v1/users`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err))
    )
  }
}

export function edit(data) {
  return dispatch => {
    dispatch(editBegin())

    return axios.put(`http://${API_HOST}${BACKEND_PROXY_PREFIX}/api/v1/users`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err))
    )
  }
}

export function get(data) {
  return dispatch => {
    dispatch(getBegin())

    return axios.get(`http://${API_HOST}${BACKEND_PROXY_PREFIX}/api/v1/users/${data}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err))
    )
  }
}

export function remove(data) {
  return dispatch => {
    dispatch(removeBegin())

    return axios.post(`http://${API_HOST}${BACKEND_PROXY_PREFIX}/api/v1/users`, data).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err))
    )
  }
}
