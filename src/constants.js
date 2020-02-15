export const API_HOST = process.env.REACT_APP_API_HOST
export const AUTH_PROXY_PREFIX = '/auth'
export const BACKEND_PROXY_PREFIX = '/backend'

export const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ?
      `http://${API_HOST}` :
      `https://${API_HOST}${BACKEND_PROXY_PREFIX}`

export const AUTH_BASE_URL = `https://${API_HOST}${AUTH_PROXY_PREFIX}`

// (@kenaszogara):
// https://www.schemecolor.com/modern-pie-chart.php
// https://www.schemecolor.com/flat-orange-blue-green-pie-chart.php#download
export const MAINTENANCE_REQUEST_CATEGORY_MAP = new Map([
      ['electricalAndLightning', { name: 'Electrical and lighting', color: '#F66D44' }],
      ['ac', { name: 'AC', color: '#FEAE65' }],
      ['appliance', { name: 'Appliance', color: '#E6F69D' }],
      ['doorsAndLocks', { name: 'Doors and locks', color: '#AADEA7' }],
      ['flooring', { name: 'Flooring', color: '#64C2A6' }],
      ['general', { name: 'General', color: '#2D87BB' }],
      ['plumbingAndBath', { name: 'Plumbing and bath', color: '#6050DC' }],
      ['preventativeMaintenance', { name: 'Preventative maintenance', color: '#D52DB7' }],
      ['pestManagement', { name: 'Pest management', color: '#FF2E7E' }],
      ['reidentExperience', { name: 'Resident experience', color: '#4ED1A1' }]
])

// https://jsramblings.com/how-to-use-media-queries-with-styled-components/
export const DEVICE_SIZE = {
      mobileS: `(max-width: 320px)`,
      mobileM: `(max-width: 375px`,
      mobileL: `(max-width: 425px)`,
      tablet: `(max-width: 768px)`,
      laptop: `(max-width: 1024px)`,
      laptopL: `(max-width: 1440px)`,
      desktop: `(max-width: 2560px)`,
}

// (@kenaszogara): color-scheme from this webpage
// https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
export const COLOR_SCHEME = {
      darkGrey: '#404040',
      grey: '#707070',
      darkBlue: '#091E42',
      white: '#FAFAFA',
      whitePale: '#F5F5F5',
      blue: '#2684FF',
      lightBlue: '#B3E3FF',
      green: '#4ED1A1',
      lightGreen: '#4CD3D6',
      purple: '#B18BE8'
}
