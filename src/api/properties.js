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
  allBegin,
  allSuccess,
  allFailure,
  removeBegin,
  removeSuccess,
  removeFailure,
} from './../actions/propertyActions'

export function create(userID, data) {
  return dispatch => {
    dispatch(createBegin())

    return axios.post(`${BASE_URL}/api/v1/users/${userID}/properties`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err.response))
    )
  }
}

export function edit(userID, data) {
  return dispatch => {
    dispatch(editBegin())

    return axios.put(`${BASE_URL}/api/v1/users/${userID}/properties/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function all(userID, eager) {
  return dispatch => {
    dispatch(allBegin())

    return axios.get(`${BASE_URL}/api/v1/users/${userID}/properties${ eager ? '?eager=true' : ''}`).then(
      res => dispatch(allSuccess(res.data)),
      err => dispatch(allFailure(err.response))
    )
  }
}

export function get(userID, propertyID, eager) {
  return dispatch => {
    dispatch(getBegin())

    return axios.get(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}${ eager ? '?eager=true' : ''}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}

export function remove(userID, propertyID) {
  return dispatch => {
    dispatch(removeBegin())

    return axios.delete(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}`).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err.response))
    )
  }
}
