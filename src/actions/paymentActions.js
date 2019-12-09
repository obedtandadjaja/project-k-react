export const CREATE_BEGIN = 'PAYMENT_CREATE_BEGIN'
export const CREATE_SUCCESS = 'PAYMENT_CREATE_SUCCESS'
export const CREATE_FAILURE = 'PAYMENT_CREATE_FAILURE'

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

export const EDIT_BEGIN = 'PAYMENT_EDIT_BEGIN'
export const EDIT_SUCCESS = 'PAYMENT_EDIT_SUCCESS'
export const EDIT_FAILURE = 'PAYMENT_EDIT_FAILURE'

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

export const GET_BEGIN = 'PAYMENT_GET_BEGIN'
export const GET_SUCCESS = 'PAYMENT_GET_SUCCESS'
export const GET_FAILURE = 'PAYMENT_GET_FAILURE'

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

export const REMOVE_BEGIN = 'PAYMENT_REMOVE_BEGIN'
export const REMOVE_SUCCESS = 'PAYMENT_REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'PAYMENT_REMOVE_FAILURE'

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
