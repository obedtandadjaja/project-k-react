export const API_HOST = process.env.REACT_APP_API_HOST
export const AUTH_PROXY_PREFIX = '/auth'
export const BACKEND_PROXY_PREFIX = '/backend'

export const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ?
      `http://${API_HOST}` :
      `https://${API_HOST}${BACKEND_PROXY_PREFIX}`

export const AUTH_BASE_URL = `https://${API_HOST}${AUTH_PROXY_PREFIX}`

export const MAINTENANCE_REQUEST_CATEGORY_LIST = [
      { id: 'Electrical and lighting', name: 'Electrical and lighting' },
      { id: 'AC', name: 'AC' },
      { id: 'Appliance', name: 'Appliance' },
      { id: 'Doors and locks', name: 'Doors and locks' },
      { id: 'Flooring', name: 'Flooring' },
      { id: 'General', name: 'General' },
      { id: 'Plumbing and bath', name: 'Plumbing and bath' },
      { id: 'Preventative maintenance', name: 'Preventative maintenance' },
      { id: 'Pest management', name: 'Pest management' },
      { id: 'Resident experience', name: 'Resident experience' },
]

export const MAINTENANCE_REQUEST_CATEGORY_LIST_COLOR = [
      '#D95A6E',
      '#CBA22C',
      '#41AEA8',
      '#6886BA',
      '#18A0FB',
      '#1331F4',
      '#2026A2',
      '#FFA7C9',
      '#FFD5C1',
      '#202832',
]
