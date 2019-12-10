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
  removeBegin,
  removeSuccess,
  removeFailure,
} from './../actions/tenantActions'

export function create(userID, propertyID, roomID, data) {
  return dispatch => {
    dispatch(createBegin())

    return API.client.post(`/api/v1/properties/${propertyID}/rooms/${roomID}/tenants`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err.response))
    )
  }
}

export function edit(userID, propertyID, roomID, data) {
  return dispatch => {
    dispatch(editBegin())

    return API.client.put(`/api/v1/properties/${propertyID}/rooms/${roomID}/tenants/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function get(userID, propertyID, roomID, tenantID, queryParams) {
  return dispatch => {
    dispatch(getBegin())

    return API.client.get(`/api/v1/properties/${propertyID}/rooms/${roomID}/tenants/${tenantID}`, { params: queryParams }).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}

export function remove(userID, propertyID, roomID, tenantID) {
  return dispatch => {
    dispatch(removeBegin())

    return API.client.delete(`/api/v1/properties/${propertyID}/rooms/${roomID}/tenants/${tenantID}`).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err.response))
    )
  }
}
