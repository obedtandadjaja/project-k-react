export const API_HOST = process.env.REACT_APP_API_HOST
export const INTERNAL_API_HOST = process.env.REACT_APP_INTERNAL_API_HOST
export const AUTH_PROXY_PREFIX = process.env.NODE_ENV === 'production' ? '/auth' : ''
export const BACKEND_PROXY_PREFIX = process.env.NODE_ENV === 'production' ? '/backend' : ''
