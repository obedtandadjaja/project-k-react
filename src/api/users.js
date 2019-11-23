import axios from 'axios'

import { BACKEND_BASE_URL as BASE_URL } from './../constants'
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
import {
  getCurrentUserSuccess,
  getCurrentUserFailure,
} from './../actions/authActions'

export function create(data) {
  return dispatch => {
    dispatch(createBegin())

    return axios.post(`${BASE_URL}/api/v1/users`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err))
    )
  }
}

export function edit(data) {
  return dispatch => {
    dispatch(editBegin())

    return axios.put(`${BASE_URL}/api/v1/users/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err))
    )
  }
}

export function get(userID) {
  return dispatch => {
    dispatch(getBegin())

    return axios.get(`${BASE_URL}/api/v1/users/${userID}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err))
    )
  }
}

export function getCurrentUser(userID) {
  return dispatch => {
    return axios.get(`${BASE_URL}/api/v1/users/${userID}`).then(
      res => dispatch(getCurrentUserSuccess(res.data)),
      err => dispatch(getCurrentUserFailure(err))
    )
  }
}

export function remove(data) {
  return dispatch => {
    dispatch(removeBegin())

    return axios.post(`${BASE_URL}/api/v1/users`, data).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err))
    )
  }
}
