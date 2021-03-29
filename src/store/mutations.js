/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// import { acl } from '../acl/acl'

const mutations = {


  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE (state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON (state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE (state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN (state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH (state, width) {
    state.verticalNavMenuWidth = width
  },


  // VxAutoSuggest

  UPDATE_STARRED_PAGE (state, payload) {

    // find item index in search list state
    const index = state.navbarSearchAndPinList['pages'].data.findIndex((item) => item.url === payload.url)

    // update the main list
    state.navbarSearchAndPinList['pages'].data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList['pages'].data[index])
    } else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.url === payload.url)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED (state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages     = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE (state, list) {
    let downToUp                   = false
    const lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited      = state.starredPages.slice(0, 10)
    state.starredPages             = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },


  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY (state, val) { state.bodyOverlay       = val   },
  UPDATE_PRIMARY_COLOR (state, val)   { state.themePrimaryColor = val   },
  UPDATE_THEME (state, val)           { state.theme             = val   },
  UPDATE_WINDOW_WIDTH (state, width)  { state.windowWidth       = width },
  UPDATE_WINDOW_SCROLL_Y (state, val) { state.scrollY           = val   },


  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////
 

  RESET_USER_INFO (state) { 
    state.AppActiveUser.displayName = 'Teh Unown'
    state.AppActiveUser.photoURL = '/img/avatar-s-11.1a620230.jpg'
    state.AppActiveUser.status = 'offline'
    state.AppActiveUser.uid = 0
    state.AppActiveUser.userRole = 'user'
  },
  // Merge rather than replace so we don't lose observers
  // https://github.com/vuejs/vuex/issues/1118
  // Object.assign(state, state.getUserInfo())


  UPDATE_COMPANY_INFO (state, payload) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser
    for (const property of Object.keys(payload)) {

      if (payload[property] !== null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser.company[property] = payload[property]

        // Update key in localStorage
        userInfo.company[property] = payload[property]
      }


    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },

  // Updates user info in state and localstorage
  UPDATE_USER_INFO (state, payload) {

    // fix user stuff; Displayname and photo
    payload.displayName = 'Error in Name'
    if (payload.first_name && payload.last_name) payload.displayName = `${  payload.first_name  } ${  payload.last_name}`
    payload.photoURL = `${process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AVATAR_FOLDER  }error.jpg`
    if (payload.avatar) payload.photoURL = process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AVATAR_FOLDER +  payload.avatar
    // fix company stuff; logo
    if (payload.company && payload.company.logo) payload.company.logo = process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_LOGO_FOLDER + payload.company.logo
    // Get Data localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser

    for (const property of Object.keys(payload)) {

      if (payload[property] !== null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property]

        // Update key in localStorage
        userInfo[property] = payload[property]
      }


    }

    // Store data in localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    //this.$store.dispatch('updateUserRole', {aclChangeRole: this.$acl.change, userRole: userInfo.role.name})
    // console.log('UPDATE USER INFO:' + userInfo.role.name)
    // this._vm.$acl.change(userInfo.role.name)
   
    // console.log(`acl changed to:${ this._vm.$acl.get[0]}`)
  }
}

export default mutations

