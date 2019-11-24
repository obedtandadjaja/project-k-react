export const EDIT_BEGIN = 'USER_EDIT_BEGIN'
export const EDIT_SUCCESS = 'USER_EDIT_SUCCESS'
export const EDIT_FAILURE = 'USER_EDIT_FAILURE'

export const editBegin = () => ({
  type: EDIT_BEGIN
})

export const editSuccess = payload => ({
  type: EDIT_SUCCESS,
  payload: payload
})

export const editFailure = error => ({
  type: EDIT_FAILURE,
  payload: { error }
})

export const GET_BEGIN = 'USER_GET_BEGIN'
export const GET_SUCCESS = 'USER_GET_SUCCESS'
export const GET_FAILURE = 'USER_GET_FAILURE'

export const getBegin = () => ({
  type: GET_BEGIN
})

export const getSuccess = payload => ({
  type: GET_SUCCESS,
  payload: payload
})

export const getFailure = error => ({
  type: GET_FAILURE,
  payload: { error }
})
