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
} from './../actions/roomActions'

export function create(userID, propertyID, data) {
  return dispatch => {
    dispatch(createBegin())

    return axios.post(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err))
    )
  }
}

export function edit(userID, propertyID, data) {
  return dispatch => {
    dispatch(editBegin())

    return axios.put(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err))
    )
  }
}

export function all(userID, propertyID, eager) {
  return dispatch => {
    dispatch(allBegin())

    return axios.get(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms${ eager ? '?eager=true' : ''}`).then(
      res => dispatch(allSuccess(res.data)),
      err => dispatch(allFailure(err))
    )
  }
}

export function get(userID, propertyID, roomID) {
  return dispatch => {
    dispatch(getBegin())

    return axios.get(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${roomID}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err))
    )
  }
}

export function remove(userID, propertyID, roomID) {
  return dispatch => {
    dispatch(removeBegin())

    return axios.delete(`${BASE_URL}/api/v1/users/${userID}/properties/${propertyID}/rooms/${roomID}`).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err))
    )
  }
}
