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

export function create(userID, propertyID, roomID, data) {
  return dispatch => {
    dispatch(createBegin())

    return axios.post(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${roomID}/users`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err.response))
    )
  }
}

export function edit(userID, propertyID, roomID, data) {
  return dispatch => {
    dispatch(editBegin())

    return axios.put(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${roomID}/users/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function get(userID, propertyID, roomID, tenantID) {
  return dispatch => {
    dispatch(getBegin())

    return axios.get(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${roomID}/users/${tenantID}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}

export function getCurrentUser(userID) {
  return dispatch => {
    return axios.get(`${BASE_URL}/api/v1/users/${userID}`).then(
      res => dispatch(getCurrentUserSuccess(res.data)),
      err => dispatch(getCurrentUserFailure(err.response))
    )
  }
}

export function remove(userID, propertyID, roomID, tenantID) {
  return dispatch => {
    dispatch(removeBegin())

    return axios.delete(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${roomID}/users/${tenantID}`).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err.response))
    )
  }
}
