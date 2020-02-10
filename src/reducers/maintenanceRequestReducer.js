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
  ALL_BEGIN,
  ALL_SUCCESS,
  ALL_FAILURE,
  REMOVE_BEGIN,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
} from '../actions/maintenanceRequestActions'

const initialState = Map({
    maintenanceRequests: [],
    maintenanceRequest: null,
    createLoading: false,
    createError: false,
    editLoading: false,
    editError: false,
    getLoading: false,
    getError: false,
    removeLoading: false,
    removeError: false,
  })

  export default function maintenanceReducer(state=initialState, action) {
    switch(action.type) {
    case CREATE_BEGIN:
      return state.merge({
        createLoading: true
      })
  
    case CREATE_SUCCESS:
      return state.merge({
        createLoading: false,
        maintenanceRequest: action.payload,
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
        maintenanceRequest: action.payload,
      })
  
    case EDIT_FAILURE:
      return state.merge({
        editLoading: false
      })
  
    case GET_BEGIN:
      return state.merge({
        getLoading: true,
      })
  
    case GET_SUCCESS:
      return state.merge({
        getLoading: false,
        maintenanceRequest: action.payload
      })
  
    case GET_FAILURE:
      return state.merge({
        getLoading: false,
      })
  
    case ALL_BEGIN:
      return state.merge({
        allLoading: true,
      })
  
    case ALL_SUCCESS:
      return state.merge({
        allLoading: false,
        maintenanceRequests: action.payload,
      })
  
    case ALL_FAILURE:
      return state.merge({
        allLoading: false,
      })
  
    case REMOVE_BEGIN:
      return state.merge({
        removeLoading: true
      })
    
    case REMOVE_SUCCESS:
      return state.merge({
        removeLoading: false,
        maintenanceRequest: action.payload
      })
  
    case REMOVE_FAILURE:
      return state.merge({
        removeLoading: false
      })
  
    default:
      return state
    }
  }
