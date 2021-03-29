/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_USERS (state, users) {
    console.log(users)
  
    for (const key of Object.keys(users)) {
     
      if (users[key].avatar) users[key].avatar = process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AVATAR_FOLDER +  users[key].avatar
      if (users[key].email_verified_at) users[key].verified = true
      else users[key].verified = false
    }
    state.users = users
  },
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
  }
}
