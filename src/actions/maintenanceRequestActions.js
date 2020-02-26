export const CREATE_BEGIN = 'MAINTENANCE_REQUEST_CREATE_BEGIN'
export const CREATE_SUCCESS = 'MAINTENANCE_REQUEST_CREATE_SUCCESS'
export const CREATE_FAILURE = 'MAINTENANCE_REQUEST_CREATE_FAILURE'

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

export const EDIT_BEGIN = 'MAINTENANCE_REQUEST_EDIT_BEGIN'
export const EDIT_SUCCESS = 'MAINTENANCE_REQUESTS_EDIT_SUCCESS'
export const EDIT_FAILURE = 'MAINTENANCE_REQUESTS_EDIT_FAILURE'

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

export const GET_BEGIN = 'MAINTENANCE_REQUESTS_GET_BEGIN'
export const GET_SUCCESS = 'MAINTENANCE_REQUESTS_GET_SUCCESS'
export const GET_FAILURE = 'MAINTENANCE_REQUESTS_GET_FAILURE'

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

export const ALL_BEGIN = 'MAINTENANCE_REQUESTS_ALL_BEGIN'
export const ALL_SUCCESS = 'MAINTENANCE_REQUESTS_ALL_SUCCESS'
export const ALL_FAILURE = 'MAINTENANCE_REQUESTS_ALL_FAILURE'

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

export const ALL_OPEN_BEGIN = 'MAINTENANCE_REQUESTS_ALL_OPEN_BEGIN'
export const ALL_OPEN_SUCCESS = 'MAINTENANCE_REQUESTS_ALL_OPEN_SUCCESS'
export const ALL_OPEN_FAILURE = 'MAINTENANCE_REQUESTS_ALL_OPEN_FAILURE'

export const allOpenBegin = () => ({
  type: ALL_OPEN_BEGIN
})

export const allOpenSuccess = payload => ({
  type: ALL_OPEN_SUCCESS,
  payload: payload
})

export const allOpenFailure = error => ({
  type: ALL_OPEN_FAILURE,
  payload: { error }
})

export const ALL_CLOSE_BEGIN = 'MAINTENANCE_REQUESTS_ALL_CLOSE_BEGIN'
export const ALL_CLOSE_SUCCESS = 'MAINTENANCE_REQUESTS_ALL_CLOSE_SUCCESS'
export const ALL_CLOSE_FAILURE = 'MAINTENANCE_REQUESTS_ALL_CLOSE_FAILURE'

export const allCloseBegin = () => ({
  type: ALL_CLOSE_BEGIN
})

export const allCloseSuccess = payload => ({
  type: ALL_CLOSE_SUCCESS,
  payload: payload
})

export const allCloseFailure = error => ({
  type: ALL_CLOSE_FAILURE,
  payload: { error }
})

export const REMOVE_BEGIN = 'MAINTENANCE_REQUESTS_REMOVE_BEGIN'
export const REMOVE_SUCCESS = 'MAINTENANCE_REQUESTS_REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'MAINTENANCE_REQUESTS_REMOVE_FAILURE'

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
