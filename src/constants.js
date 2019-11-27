export const API_HOST = process.env.REACT_APP_API_HOST
export const AUTH_PROXY_PREFIX = '/auth'
export const BACKEND_PROXY_PREFIX = '/backend'

export const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ?
      `https://api.stage.obedt.com/backend` :
      `https://${API_HOST}${BACKEND_PROXY_PREFIX}`

export const AUTH_BASE_URL = `https://${API_HOST}${AUTH_PROXY_PREFIX}`
