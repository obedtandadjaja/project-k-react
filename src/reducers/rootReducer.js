import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './authReducer'
import user from './userReducer'
import property from './propertyReducer'
import room from './roomReducer'
import tenant from './tenantReducer'
import maintenance_request from './maintenanceRequestReducer'

export default combineReducers({
  auth,
  user,
  property,
  room,
  tenant,
  maintenance_request,
  form: formReducer,
})
