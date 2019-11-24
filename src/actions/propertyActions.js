export const CREATE_BEGIN = 'PROPERTY_CREATE_BEGIN'
export const CREATE_SUCCESS = 'PROPERTY_CREATE_SUCCESS'
export const CREATE_FAILURE = 'PROPERTY_CREATE_FAILURE'

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

export const EDIT_BEGIN = 'PROPERTY_EDIT_BEGIN'
export const EDIT_SUCCESS = 'PROPERTY_EDIT_SUCCESS'
export const EDIT_FAILURE = 'PROPERTY_EDIT_FAILURE'

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

export const GET_BEGIN = 'PROPERTY_GET_BEGIN'
export const GET_SUCCESS = 'PROPERTY_GET_SUCCESS'
export const GET_FAILURE = 'PROPERTY_GET_FAILURE'

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

export const ALL_BEGIN = 'PROPERTY_ALL_BEGIN'
export const ALL_SUCCESS = 'PROPERTY_ALL_SUCCESS'
export const ALL_FAILURE = 'PROPERTY_ALL_FAILURE'

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

export const REMOVE_BEGIN = 'PROPERTY_REMOVE_BEGIN'
export const REMOVE_SUCCESS = 'PROPERTY_REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'PROPERTY_REMOVE_FAILURE'

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
