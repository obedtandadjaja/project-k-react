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
} from './../actions/roomActions'

export function create(userID, propertyID, data) {
  return dispatch => {
    dispatch(createBegin())

    return API.client.post(`/api/v1/properties/${propertyID}/rooms`, data).then(
      res => {
        dispatch(createSuccess(res.data))
        return res.data
      },
      err => dispatch(createFailure(err.response))
    )
  }
}

export function edit(userID, propertyID, data) {
  return dispatch => {
    dispatch(editBegin())

    return API.client.put(`/api/v1/properties/${propertyID}/rooms/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function all(userID, propertyID, queryParams) {
  return dispatch => {
    dispatch(allBegin())

    return API.client.get(`/api/v1/properties/${propertyID}/rooms`, { params: queryParams }).then(
      res => dispatch(allSuccess(res.data)),
      err => dispatch(allFailure(err.response))
    )
  }
}

export function get(userID, propertyID, roomID, queryParams) {
  return dispatch => {
    dispatch(getBegin())

    return API.client.get(`/api/v1/properties/${propertyID}/rooms/${roomID}`, { params: queryParams }).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}

export function remove(userID, propertyID, roomID) {
  return dispatch => {
    dispatch(removeBegin())

    return API.client.delete(`/api/v1/properties/${propertyID}/rooms/${roomID}`).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err.response))
    )
  }
}
