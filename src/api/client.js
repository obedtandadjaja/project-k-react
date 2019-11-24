import axios from 'axios'
import jwtDecode from 'jwt-decode'

import store from './../store'
import { BACKEND_BASE_URL } from './../constants'
import { logout } from './../actions/authActions'

const { dispatch } = store

class APIClient {
  client = null
  sessionToken = localStorage.getItem('sessionToken')
  accessToken = localStorage.getItem('accessToken')

  constructor() {
    this.client = axios.create({
      baseURL: BACKEND_BASE_URL,
    })

    if (this.accessToken) {
      this.client.defaults.headers['Authorization'] = this.accessToken
    }
  }

  createRequestInterceptor() {
    const interceptor = axios.interceptors.request.use(
      config => {
        // if have access token but it has expired
        if (this.accessToken) {
          const { exp } = jwtDecode(this.accessToken)
          if (Date.now() < exp * 1000) {
            return config
          }
        }

        console.log('1')

        // if no access token and no session token then logout
        if (!this.sessionToken) {
          dispatch(logout())
          return false
        }

        console.log('2')

        // eject the current interceptor, else it will go on infinite loop
        axios.interceptors.response.eject(interceptor)

        // fetch access token
        return axios.post('/api/v1/token', {
          'session': this.sessionToken
        }).then(res => {
          this.accessToken = res.data.jwt
          return config
        }).catch(error => {
          dispatch(logout())
        }).finally(APIClient.createRequestInterceptor)
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  updateSessionToken(sessionToken) {
    this.sessionToken = sessionToken
  }

  updateAccessToken(accessToken) {
    this.accessToken = accessToken
    if (this.accessToken) {
      console.log('hello')
      this.client.defaults.headers['Authorization'] = accessToken
    } else {
      console.log('deleted')
      delete this.client.defaults.headers['Authorization']
    }
  }
}

export default new APIClient()
