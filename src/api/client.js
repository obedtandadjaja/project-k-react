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

    this.createRequestInterceptor()
  }

  createRequestInterceptor() {
    const interceptor = this.client.interceptors.request.use(
      config => {
        // if have access token but it has expired
        if (this.accessToken) {
          const { exp } = jwtDecode(this.accessToken)
          if (Date.now() < exp * 1000) {
            return config
          }
        }

        // if no access token and no session token then logout
        if (!this.sessionToken) {
          dispatch(logout())
          return false
        }

        // eject the current interceptor, else it will go on infinite loop
        this.client.interceptors.request.eject(interceptor)

        // fetch access token
        return this.client.post('/api/v1/token', {
          session: this.sessionToken
        }).then(res => {
          this.updateAccessToken(res.data.jwt)
          config.headers['Authorization'] = res.data.jwt
          return Promise.resolve(config)
        }).catch(error => {
          dispatch(logout())
        }).finally(() => {
          this.createRequestInterceptor()
        })
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  updateSessionToken(sessionToken) {
    this.sessionToken = sessionToken
    localStorage.setItem('sessionToken', sessionToken)
  }

  updateAccessToken(accessToken) {
    this.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken)

    if (this.accessToken) {
      this.client.defaults.headers['Authorization'] = accessToken
    } else {
      delete this.client.defaults.headers['Authorization']
    }
  }
}

export default new APIClient()
