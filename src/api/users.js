import API from './client'
import {
  editBegin,
  editSuccess,
  editFailure,
  getBegin,
  getSuccess,
  getFailure,
} from './../actions/userActions'

export function edit(data) {
  return dispatch => {
    dispatch(editBegin())

    return API.client.put(`/api/v1/users/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err.response))
    )
  }
}

export function get(userID) {
  return dispatch => {
    dispatch(getBegin())

    return API.client.get(`/api/v1/users/${userID}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err.response))
    )
  }
}
