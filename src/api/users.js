import API from './client'
import {
  editBegin,
  editSuccess,
  editFailure,
  getBegin,
  getSuccess,
  getFailure,
} from './../actions/userActions'

export function edit(userID, propertyID, roomID, data) {
  return dispatch => {
    dispatch(editBegin())

    return API.client.put(`/api/v1/properties/${propertyID}/rooms/${roomID}/tenants/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function get(userID, propertyID, roomID, tenantID) {
  return dispatch => {
    dispatch(getBegin())

    return API.client.get(`/api/v1/properties/${propertyID}/rooms/${roomID}/tenants/${tenantID}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}
