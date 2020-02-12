export const API_HOST = process.env.REACT_APP_API_HOST
export const AUTH_PROXY_PREFIX = '/auth'
export const BACKEND_PROXY_PREFIX = '/backend'

export const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ?
      `http://${API_HOST}` :
      `https://${API_HOST}${BACKEND_PROXY_PREFIX}`

export const AUTH_BASE_URL = `https://${API_HOST}${AUTH_PROXY_PREFIX}`

export const MAINTENANCE_REQUEST_CATEGORY_MAP = new Map([
      ['electricalAndLightning', { name: 'Electrical and lighting', color: '#D95A6E' }],
      ['ac', { name: 'AC', color: '#CBA22C' }],
      ['appliance', { name: 'Appliance', color: '#41AEA8' }],
      ['doorsAndLocks', { name: 'Doors and locks', color: '#6886BA' }],
      ['flooring', { name: 'Flooring', color: '#18A0FB' }],
      ['general', { name: 'General', color: '#1331F4' }],
      ['plumbingAndBath', { name: 'Plumbing and bath', color: '#2026A2' }],
      ['preventativeMaintenance', { name: 'Preventative maintenance', color: '#FFA7C9' }],
      ['pestManagement', { name: 'Pest management', color: '#FFD5C1' }],
      ['reidentExperience', { name: 'Resident experience', color: '#202832' }]
])
