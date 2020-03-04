export const CREATE_BEGIN = 'ROOM_CREATE_BEGIN'
export const CREATE_SUCCESS = 'ROOM_CREATE_SUCCESS'
export const CREATE_FAILURE = 'ROOM_CREATE_FAILURE'

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

export const CREATE_BATCH_BEGIN = 'ROOM_CREATE_BATCH_BEGIN'
export const CREATE_BATCH_SUCCESS = 'ROOM_CREATE_BATCH_SUCCESS'
export const CREATE_BATCH_FAILURE = 'ROOM_CREATE_BATCH_FAILURE'

export const createBatchBegin = () => ({
  type: CREATE_BATCH_BEGIN
})

export const createBatchSuccess = payload => ({
  type: CREATE_BATCH_SUCCESS,
  payload: payload
})

export const createBatchFailure = error => ({
  type: CREATE_BATCH_FAILURE,
  payload: { error }
})

export const EDIT_BEGIN = 'ROOM_EDIT_BEGIN'
export const EDIT_SUCCESS = 'ROOM_EDIT_SUCCESS'
export const EDIT_FAILURE = 'ROOM_EDIT_FAILURE'

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

export const GET_BEGIN = 'ROOM_GET_BEGIN'
export const GET_SUCCESS = 'ROOM_GET_SUCCESS'
export const GET_FAILURE = 'ROOM_GET_FAILURE'

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

export const ALL_BEGIN = 'ROOM_ALL_BEGIN'
export const ALL_SUCCESS = 'ROOM_ALL_SUCCESS'
export const ALL_FAILURE = 'ROOM_ALL_FAILURE'

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

export const REMOVE_BEGIN = 'ROOM_REMOVE_BEGIN'
export const REMOVE_SUCCESS = 'ROOM_REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'ROOM_REMOVE_FAILURE'

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
