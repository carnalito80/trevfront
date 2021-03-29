<template>
  <div>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Password"
        v-model="password"
        class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
        <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button  type="border" @click="registerUser">Register</vs-button>
      <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
    </div>
  </div>
</template>

<script>
// import router from '/router'
export default {
  data () {
    return {
      email: 'admin@kenntoft.se',
      password: 'secret',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    checkLogin () {
      // check if function even exists,
      if (typeof this.$store.state.auth.isUserLoggedIn() !== "function") { 
        return true
      }
            // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    loginJWT () {

      if (!this.checkLogin()) return

      // Loading
      this.$vs.loading()

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        }
      }

      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => { this.$vs.loading.close() })
        .catch(error => {
          this.$vs.loading.close()
          var errormess;
          var errortitle = 'Error';
          var errorduration = 5000;
          if (error.message.search(401)) errormess = "Wrong email/password"; //clearly this is not supposed to happen, it means validation has failed
          else if (error.message.search(500)) errormess = "Server Error. Try again later (Error: 500)"; //clearly this is not supposed to happen
        

          this.$vs.notify({
            progress: 'auto',
            duration: errorduration,
            title: errortitle,
            text: errormess,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
      //   .then(routeUs => {
           
      //     const userRole = this.$store.state.AppActiveUser.userRole
      //     this.$acl.change(userRole)
          
         
      //   if (userRole === 'admin' || userRole === 'superadmin') this.$router.push(this.$router.currentRoute.query.to || '/admin')
      //   else  this.$router.push(this.$router.currentRoute.query.to ||  '/company/default')

      //  return
      //   })
    },
    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/register').catch(() => {})
    }
  }
}

</script>

