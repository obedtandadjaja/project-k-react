export const CREATE_BEGIN = 'USER_CREATE_BEGIN'
export const CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
export const CREATE_FAILURE = 'USER_CREATE_FAILURE'

export const createBegin = () => ({
  type: CREATE_BEGIN
})

export const createSuccess = payload => ({
  type: CREATE_SUCCESS,
  payload: payload
})

export const createFailure = error => ({
  type: CREATE_FAILURE,
  payload: { error }
})

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

export const REMOVE_BEGIN = 'USER_REMOVE_BEGIN'
export const REMOVE_SUCCESS = 'USER_REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'USER_REMOVE_FAILURE'

export const removeBegin = () => ({
  type: REMOVE_BEGIN
})

export const removeSuccess = payload => ({
  type: REMOVE_SUCCESS,
  payload: payload
})

export const removeFailure = error => ({
  type: REMOVE_FAILURE,
  payload: { error }
})
