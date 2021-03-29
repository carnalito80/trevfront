/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'
import router from '@/router'


export default {
 
  // JWT
  loginJWT ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {
          console.log(response)
          // If there's user data in response
          if (response.data.userData) {
            
            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken)
            
            // Update user details
            commit('UPDATE_USER_INFO', response.data.userData, {root: true})

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken)  
            
          
            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }

        }).then(  response => { //we do this to catch up the async functions prior
          // Let's route the user
          router.push(router.currentRoute.query.to || '/')
        })
        .catch(error => { reject(error) })
    })
  },
  registerUserJWT ({ commit }, payload) {

    const { first_name, last_name, email, password, confirmPassword, info } = payload.userDetails

    return new Promise((resolve, reject) => {

      // Check confirm password
      if (password !== confirmPassword) {
        reject({message: 'Password doesn\'t match. Please try again.'})
      }

      jwt.registerUser(first_name, last_name, email, password, info)
        .then(response => {
          // Redirect User  

          router.push('/registry-confirmed')

          // if we want the user to be able to go directly.. 
          // router.push(router.currentRoute.query.to || '/')

          // Update data in localStorage
          // localStorage.setItem('accessToken', response.data.accessToken)
          // commit('UPDATE_USER_INFO', response.data.userData, {root: true})

          resolve(response)
        })
        .catch(error => {
          reject(error) 
        })
    })
  },
  fetchAccessToken () {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => { resolve(response) })
    })
  }
}
