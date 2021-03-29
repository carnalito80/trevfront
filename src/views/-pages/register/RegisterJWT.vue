<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|alpha_spaces|min:2'"
      data-vv-validate-on="blur"
      label-placeholder="First Name"
      name="first_name"
      placeholder="First Name"
      v-model="first_name"
      class="w-full" />
     <span class="text-danger text-sm">{{ errors.first('first_name') }}</span>
    <vs-input
      v-validate="'required|alpha_spaces|min:2'"
      data-vv-validate-on="blur"
      label-placeholder="Last Name"
      name="last_name"
      placeholder="Last Name"
      v-model="last_name"
      class="w-full" />
     
    <span class="text-danger text-sm">{{ errors.first('last_name') }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:20'"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="password"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <vs-input
      type="password"
      v-validate="'min:6|max:20|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="confirm_password"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
    <vs-input
    type="text"
    name="info"
    style="display: none"
    />

    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox>
    <vs-button  type="border" to="/login" class="mt-6">Login</vs-button>
    <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">Register</vs-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      info: '',
      isTermsConditionAccepted: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.first_name !== '' && this.last_name !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    checkLogin () {
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
    registerUserJWt () {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return

      this.$vs.loading();

      const payload = {
        userDetails: {
          first_name: this.first_name,
          last_name: this. last_name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password,
          info: this.info
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('auth/registerUserJWT', payload).then(() => { this.$vs.loading.close() })
        .catch(error => {
          var errormess;
          this.$vs.loading.close();
          var errortitle = 'Error';
          var errorduration = 5000;
          if (error.message.search(400)) errormess = "Something went wrong with your submission (Error: 400)"; //clearly this is not supposed to happen, it means validation has failed
          if (error.message.search(500)) errormess = "Server Error. Try again later (Error: 500)"; //clearly this is not supposed to happen
          if (error.message.search(406)) {
            errormess = "An user with that email already exists. Did you register recently? Check your mail for the verification email."; //the one thing that normaly can go wrong.
            errortitle = "User already exists";
            errorduration = 10000;
          }
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
    // .then(routeUs => {
           
    //       const userRole = this.$store.state.AppActiveUser.userRole
    //       this.$acl.change(userRole)
          
         
    //     if (userRole === 'admin' || userRole === 'superadmin') this.$router.push(this.$router.currentRoute.query.to || '/admin')
    //     else  this.$router.push(this.$router.currentRoute.query.to ||  '/company/default')

    //    return
    //     })
  },
},
}
</script>
