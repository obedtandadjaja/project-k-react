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
  ALL_OPEN_BEGIN,
  ALL_OPEN_SUCCESS,
  ALL_OPEN_FAILURE,
  ALL_CLOSED_BEGIN,
  ALL_CLOSED_SUCCESS,
  ALL_CLOSED_FAILURE,
  REMOVE_BEGIN,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
} from '../actions/maintenanceRequestActions'

const initialState = Map({
    maintenanceRequests: [],
    openMaintenanceRequests: [],
    closedMaintenanceRequests: [],
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
  
    case ALL_OPEN_BEGIN:
      return state.merge({
        allOpenLoading: true,
      })
    
    case ALL_OPEN_SUCCESS:
      return state.merge({
        allOpenLoading: false,
        openMaintenanceRequests: action.payload,
      })
    
    case ALL_OPEN_FAILURE:
      return state.merge({
        allOpenLoading: false,
      })

    case ALL_CLOSED_BEGIN:
      return state.merge({
        allClosedLoading: true,
      })
    
    case ALL_CLOSED_SUCCESS:
      return state.merge({
        allClosedLoading: false,
        closedMaintenanceRequests: action.payload,
      })
    
    case ALL_CLOSED_FAILURE:
      return state.merge({
        allClosedLoading: false,
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
