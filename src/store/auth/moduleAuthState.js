/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


//import auth from '@/auth/authService'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import acl from '../../acl/acl'
//import axios from '../../http/axios/index.js'

export default {
  isUserLoggedIn: () => {
    console.log('checking if user is logged in...')
    let thetoken = false
    let theuser = false
    if (localStorage.getItem('accessToken')) {
      if (localStorage.getItem('accessToken').length > 10) thetoken = true
    }
    console.log(`token: ${  thetoken}`)
    if (!thetoken) return false
    if (localStorage.getItem('userInfo')) {
      if (localStorage.getItem('userInfo').id !== 0) theuser = true
    }
    console.log(`user: ${  theuser}`)
    if (!theuser) return false
    
    console.log('so we have the local info, but can we access to backend?')
    return true // below can be used to check if we can reach the backend or not
    
  // axios.get('/api/me')
  //     .then((response) => {
  //       // Success 🎉
  //       console.log(response)
  //       return true
  //     })
  //     .catch((error) => {
  //       // Error 😨
  //       if (error.response) {
  //         console.log(error.response)  
  //         return false
  //       } else if (error.request) {
  //         /*
  //            * The request was made but no response was received, `error.request`
  //            * is an instance of XMLHttpRequest in the browser and an instance
  //            * of http.ClientRequest in Node.js
  //            */
  //         console.log(error.request)
  //         return false
  //       } else {
  //         // Something happened in setting up the request and triggered an Error
  //         console.log('Error', error.message)
  //         return false
  //       }
        
  //     })
   
  }
  
  
}
