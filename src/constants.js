export const API_HOST = process.env.REACT_APP_API_HOST
export const AUTH_PROXY_PREFIX = '/auth'
export const BACKEND_PROXY_PREFIX = '/backend'

export const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ?
      `http://${API_HOST}` :
      `https://${API_HOST}${BACKEND_PROXY_PREFIX}`

export const AUTH_BASE_URL = `https://${API_HOST}${AUTH_PROXY_PREFIX}`

export const MAINTENANCE_REQUEST_CATEGORY_LIST = [
      { id: 'electricalAndLighting', name: 'Electrical and lighting' },
      { id: 'ac', name: 'AC' },
      { id: 'appliance', name: 'Appliance' },
      { id: 'doorsAndLocks', name: 'Doors and locks' },
      { id: 'flooring', name: 'Flooring' },
      { id: 'general', name: 'General' },
      { id: 'plumbingAndBath', name: 'Plumbing and bath' },
      { id: 'preventativeMaintenance', name: 'Preventative maintenance' },
      { id: 'pestManagement', name: 'Pest management' },
      { id: 'residentExperience', name: 'Resident experience' },
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
