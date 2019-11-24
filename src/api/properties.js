import API from './client'
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

    return API.client.post(`/api/v1/properties`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err.response))
    )
  }
}

export function edit(userID, data) {
  return dispatch => {
    dispatch(editBegin())

    return API.client.put(`/api/v1/properties/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function all(userID, eager) {
  return dispatch => {
    dispatch(allBegin())

    return API.client.get(`/api/v1/properties${ eager ? '?eager=true' : ''}`).then(
      res => dispatch(allSuccess(res.data)),
      err => dispatch(allFailure(err.response))
    )
  }
}

export function get(userID, propertyID, eager) {
  return dispatch => {
    dispatch(getBegin())

    return API.client.get(`/api/v1/properties/${propertyID}${ eager ? '?eager=true' : ''}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}

export function remove(userID, propertyID) {
  return dispatch => {
    dispatch(removeBegin())

    return API.client.delete(`/api/v1/properties/${propertyID}`).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err.response))
    )
  }
}
