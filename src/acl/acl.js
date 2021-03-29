import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

// eslint-disable-next-line prefer-const
let initialRole = 'anyone'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole

console.log(initialRole)

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    // lets convert the backend roles to frontend roles, obviously we will expand the frontend part
    admin  : new AclRule('admin').or('superadmin').generate(),
    editor : new AclRule('admin').or('superadmin').or('dealer').or('editor').generate(),
    user : new AclRule('consumer').or('tech').or('tester').or('tuner').or('dealer').or('editor').or('admin').or('superadmin').generate(),
    anyone : new AclRule('anyone').or('consumer').or('tech').or('tester').or('tuner').or('dealer').or('admin').or('superadmin').generate()
  }
})
