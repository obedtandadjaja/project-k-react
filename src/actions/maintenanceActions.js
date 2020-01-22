export const CREATE_BEGIN = 'MAINTENANCE_CREATE_BEGIN'
export const CREATE_SUCCESS = 'MAINTENANCE_CREATE_SUCCESS'
export const CREATE_FAILURE = 'MAINTENANCE_CREATE_FAILURE'

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

export const EDIT_BEGIN = 'MAINTENANCE_EDIT_BEGIN'
export const EDIT_SUCCESS = 'MAINTENANCE_EDIT_SUCCESS'
export const EDIT_FAILURE = 'MAINTENANCE_EDIT_FAILURE'

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

export const GET_BEGIN = 'MAINTENANCE_GET_BEGIN'
export const GET_SUCCESS = 'MAINTENANCE_GET_SUCCESS'
export const GET_FAILURE = 'MAINTENANCE_GET_FAILURE'

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

export const ALL_BEGIN = 'MAINTENANCE_ALL_BEGIN'
export const ALL_SUCCESS = 'MAINTENANCE_ALL_SUCCESS'
export const ALL_FAILURE = 'MAINTENANCE_ALL_FAILURE'

export const allBegin = () => ({
  type: ALL_BEGIN
})

export const allSuccess = payload => ({
  type: ALL_SUCCESS,
  payload: payload
})

export const allFailure = error => ({
  type: ALL_FAILURE,
  payload: { error }
})

export const REMOVE_BEGIN = 'MAINTENANCE_REMOVE_BEGIN'
export const REMOVE_SUCCESS = 'MAINTENANCE_REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'MAINTENANCE_REMOVE_FAILURE'

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