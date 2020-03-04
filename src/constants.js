export const API_HOST = process.env.REACT_APP_API_HOST

export const BACKEND_BASE_URL = API_HOST

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

export const DEVICE_SIZE = {
      mobileS: `(max-width: 320px)`,
      mobileM: `(max-width: 375px`,
      mobileL: `(max-width: 425px)`,
      tablet: `(max-width: 768px)`,
      laptop: `(max-width: 1024px)`,
      laptopL: `(max-width: 1440px)`,
      desktop: `(max-width: 2560px)`,
}

export const COLOR_SCHEME = {
      darkGray: '#404040',
      gray: '#707070',
      darkBlue: '#091E42',
      white: '#FAFAFA',
      whitePale: '#F5F5F5',
      blue: '#2684FF',
      lightBlue: '#B3E3FF',
      green: '#4ED1A1',
      lightGreen: '#4CD3D6',
      purple: '#B18BE8'
}
