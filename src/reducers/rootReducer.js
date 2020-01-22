import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './authReducer'
import user from './userReducer'
import property from './propertyReducer'
import room from './roomReducer'
import tenant from './tenantReducer'
import maintenance from './maintenanceReducer'

export default combineReducers({
  auth,
  user,
  property,
  room,
  tenant,
  maintenance,
  form: formReducer,
})
