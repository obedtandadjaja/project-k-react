import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './authReducer'
import user from './userReducer'

export default combineReducers({
  auth,
  user,
  form: formReducer,
})
