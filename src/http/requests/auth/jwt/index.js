import axios from '../../../axios/index.js'
import store from '../../../../store/store.js'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      //console.log(error)
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config

      // if (status === 401) {
      if (response && (response.status === 402 || response.status === 401)) { //we need a solution for fixing expired tokens. Backend currently does not handle refresh, you need two tokens for that.
        console.log('errror 401 or 402')
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          store.dispatch('auth/fetchAccessToken')
            .then((access_token) => {
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(access_token)
            })
        }
        
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(access_token => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      }
     
      return Promise.reject(error)
    })
  },
  login (email, pwd) {
    return axios.post('/api/login', {
      email,
      password: pwd
    }).catch((error) => {
      // Error 😨
      if (error.response) {
        console.log(error.response)  
        return false
      }
    })
  },
  registerUser (f_name, l_name, mail, pwd) {
   
    return axios.post('/api/register', {
      first_name: f_name,
      last_name: l_name,
      email: mail,
      password: pwd })
  },
  refreshToken () {
    return axios.post('/api/refresh-token', {accessToken: localStorage.getItem('accessToken')})
  }
}
