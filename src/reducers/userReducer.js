import { Map } from 'immutable'
import {
  CREATE_BEGIN,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  EDIT_BEGIN,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  GET_BEGIN,
  GET_SUCCESS,
  GET_FAILURE,
  DELETE_BEGIN,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from './../actions/userActions'

const initialState = Map({
  user: {},
  createLoading: false,
  createError: false,
  editLoading: false,
  editError: false,
  getLoading: false,
  getError: false,
  deleteLoading: false,
  deleteError: false,
})

export default function userReducer(state=initialState, action) {
  switch(action.type) {
  case CREATE_BEGIN:
    return state.merge({
      createLoading: true
    })

  case CREATE_SUCCESS:
    return state.merge({
      createLoading: false,
      user: action.payload
    })

  case CREATE_FAILURE:
    return state.merge({
      createLoading: false
    })

  case EDIT_BEGIN:
    return state.merge({
      editLoading: true
    })

  case EDIT_SUCCESS:
    return state.merge({
      editLoading: false,
      user: action.payload
    })

  case EDIT_FAILURE:
    return state.merge({
      editLoading: false
    })

  case GET_BEGIN:
    return state.merge({
      getLoading: true
    })

  case GET_SUCCESS:
    return state.merge({
      getLoading: false,
      user: action.payload
    })

  case GET_FAILURE:
    return state.merge({
      getLoading: false
    })

  case DELETE_BEGIN:
    return state.merge({
      deleteLoading: true
    })

  case DELETE_SUCCESS:
    return state.merge({
      deleteLoading: false,
      user: action.payload
    })

  case DELETE_FAILURE:
    return state.merge({
      deleteLoading: false
    })

  default:
    return state
  }
}
