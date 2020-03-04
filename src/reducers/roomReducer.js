import { Map } from 'immutable'
import {
  CREATE_BEGIN,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  CREATE_BATCH_BEGIN,
  CREATE_BATCH_SUCCESS,
  CREATE_BATCH_FAILURE,
  EDIT_BEGIN,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  GET_BEGIN,
  GET_SUCCESS,
  GET_FAILURE,
  ALL_BEGIN,
  ALL_SUCCESS,
  ALL_FAILURE,
  REMOVE_BEGIN,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
} from './../actions/roomActions'

const initialState = Map({
  room: null,
  rooms: [],
  createLoading: false,
  createError: null,
  createBatchLoading: false,
  createBatchError: null,
  editLoading: false,
  editError: null,
  getLoading: false,
  getError: null,
  removeLoading: false,
  removeError: null,
})

export default function roomReducer(state=initialState, action) {
  switch(action.type) {
  case CREATE_BEGIN:
    return state.merge({
      createLoading: true,
      createError: null,
    })

  case CREATE_SUCCESS:
    return state.merge({
      createLoading: false,
      createError: null,
      room: action.payload
    })

  case CREATE_FAILURE:
    return state.merge({
      createLoading: false,
      createError: action.payload.error,
    })

  case CREATE_BATCH_BEGIN:
    return state.merge({
      createBatchLoading: true,
      createBatchError: null,
    })

  case CREATE_BATCH_SUCCESS:
    return state.merge({
      createBatchLoading: false,
      createBatchError: null,
      rooms: action.payload
    })

  case CREATE_BATCH_FAILURE:
    return state.merge({
      createBatchLoading: false,
      createBatchError: action.payload.error,
    })

  case EDIT_BEGIN:
    return state.merge({
      editLoading: true,
      editError: null,
    })

  case EDIT_SUCCESS:
    return state.merge({
      editLoading: false,
      editError: null,
      room: action.payload
    })

  case EDIT_FAILURE:
    return state.merge({
      editLoading: false,
      editError: action.payload.error,
    })

  case GET_BEGIN:
    return state.merge({
      getLoading: true,
      getError: null,
    })

  case GET_SUCCESS:
    return state.merge({
      getLoading: false,
      getError: null,
      room: action.payload
    })

  case GET_FAILURE:
    return state.merge({
      getLoading: false,
      getError: action.payload.error,
    })

  case ALL_BEGIN:
    return state.merge({
      allLoading: true,
      allError: null,
    })

  case ALL_SUCCESS:
    return state.merge({
      allLoading: false,
      allError: null,
      rooms: action.payload
    })

  case ALL_FAILURE:
    return state.merge({
      allLoading: false,
      allError: action.payload.error,
    })

  case REMOVE_BEGIN:
    return state.merge({
      removeLoading: true,
      removeError: null,
    })

  case REMOVE_SUCCESS:
    return state.merge({
      removeLoading: false,
      removeError: null,
      room: action.payload
    })

  case REMOVE_FAILURE:
    return state.merge({
      removeLoading: false,
      removeError: action.payload.error,
    })

  default:
    return state
  }
}
