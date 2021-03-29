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

export default {
  isUserLoggedIn: () => {
    console.log('checking if user is logged in')
    let thetoken = false
    let theuser = false
    if (localStorage.getItem('accessToken')) {
      if (localStorage.getItem('accessToken').length > 10) thetoken = true
    }
    if (localStorage.getItem('userInfo')) {
      if (localStorage.getItem('userInfo').id !== 0) theuser = true
    }
    console.log(`theuser: ${  theuser  } and thetoken: ${  thetoken}`)

    if (thetoken && theuser) {
      // console.log('update acl?')
      // console.log(acl);
      // if (acl.get[0] !== localStorage.getItem('userInfo').userRole) acl.change(localStorage.getItem('userInfo').userRole)
      return true

    } else return false
    // console.log(localStorage.getItem('userInfo') && localStorage.getItem('accessToken'))
    // //return (localStorage.getItem('userInfo') && auth.isAuthenticated())
    // return (localStorage.getItem('userInfo'))
  }
}
