<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 1: COMPANY -->
     <div class="vx-col lg:w-1/2 w-full">
      <vx-card title="Company Information (from backend)" class="mb-base">
         <!-- Information - Col 1 -->
          <div class="vx-row">
            <!-- Avatar Col -->
          <div class="vx-col w-1/4" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="company.logo" class="rounded w-full" />
            </div>
             <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'company-settings'}">Edit</vs-button>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table class="w-full">
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ company.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Manager Email</td>
                <td>{{ company.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Website</td>
                <td><a :href="company.website" target="_blank"> {{ company.website }}</a></td> 
              </tr>
                <tr>
                <td class="font-semibold">Reputation</td>
                 
            <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" :rating="Number(company.reputation)"></star-rating>

                <!-- <td>{{ company.reputation }}</td> -->
              </tr>
               <tr>
                <td class="font-semibold">Billing Address</td>
                <td>{{  company.billing_adress }}</td>
              </tr>
                <tr>
                <td class="font-semibold">Country</td>
                <td>{{ company.country }}</td>
              </tr>
            </table>
          </div>
          </div>
      </vx-card>
    </div>

 <!-- CARD 2: USER -->
    <div class="vx-col w-full lg:w-1/2 mb-base">
      <vx-card title="Account (from Vuex)" class="mb-base">

     
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col w-1/4" id="avatar-col">
            <div class="img-container mb-4">
              <img :src=" activeUserInfo.photoURL" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col w-1/2">
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{  activeUserInfo.displayName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{  activeUserInfo.email }}</td>
              </tr>
                  <tr>
                <td class="font-semibold">UserRole</td>
                <td>{{  activeUserInfo.role.displayname }}</td>
              </tr>
               <tr>
                <td class="font-semibold">Status</td>
                <td>{{  activeUserInfo.status }}</td>
              </tr>
                <tr>
                <td class="font-semibold">Company</td>
                <td>{{  activeUserInfo.company.name }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

         
          <!-- /Information - Col 2 -->
          <div class="vx-col flex-1" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
          </div>

        </div>

      </vx-card>
    </div>

  </div> 
  <div class="vx-row">
 
    <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
        <a href="/addcredits">  <statistics-card-line
            hideChart
            class="mb-base"
            icon="DollarSignIcon"
            statisticTitle="Credits"
            :statistic= numberofcredits
            color="success" /></a>
          
     </div>
     <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="CpuIcon"
            statisticTitle="ECU ROMS"
            :statistic= numberofecus />
          
     </div>
     <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="TruckIcon"
            statisticTitle="CARS"
            :statistic= numberofcars
            color="warning"  />
          
     </div>
        <div class="vx-col lg:w-1/2 w-full">
                <latest-news></latest-news>
        </div>
<!-- 
     <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="ShoppingBagIcon" statistic="97.5K" statisticTitle="Orders Received" :chartData="ordersRecevied.series" color="warning" type="area"></statistics-card-line>
      </div>  -->
    
    </div>

     
          

   
</div>
 
</template>

<script>
 
// import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '../ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'
import axios from '@/axios'
import StarRating from 'vue-star-rating'
import LatestNews from '@/-components/LatestNews.vue'

export default {
  data () {
    return {
      companylogo: '',
      numberofcars: 0,
      numberofecus: 0,
      numberofcredits: 0,
      subscribersGained: {},
      ordersRecevied: {},
      company: {},
      timelineData: [
        {
          color: 'primary',
          icon: 'PlusIcon',
          title: 'Client Meeting',
          desc: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time: '25 mins Ago'
        },
        {
          color: 'warning',
          icon: 'MailIcon',
          title: 'Email Newsletter',
          desc: 'Cupcake gummi bears soufflé caramels candy',
          time: '15 Days Ago'
        },
        {
          color: 'danger',
          icon: 'UsersIcon',
          title: 'Plan Webinar',
          desc: 'Candy ice cream cake. Halvah gummi bears',
          time: '20 days ago'
        },
        {
          color: 'success',
          icon: 'LayoutIcon',
          title: 'Launch Website',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.',
          time: '25 days ago'
        },
        {
          color: 'primary',
          icon: 'TvIcon',
          title: 'Marketing',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.',
          time: '28 days ago'
        }
      ],


      analyticsData,
     
    }
  },
  components: {
    //VueApexCharts,
    LatestNews,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline,
    StarRating

  },

   computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
   },
  created () {
  
 // Get Company from backend
    axios.get('/api/company/getcompany')
      .then((response) => { 
        this.company = response.data 
        if (!/^https?:\/\//i.test(this.company.website)) this.company.website = 'https://' + this.company.website //append URL with https if not present. Should be sufficient
        this.company.logo = process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_LOGO_FOLDER + this.company.logo //fix logo
        this.numberofcredits = this.company.credits;
        this.numberofcars = this.company.cars.length + 0;
        this.numberofecus = this.company.ecus.length + 0;
        this.$store.dispatch('updateCompanyInfo', this.company) //update store with latest data
        
        })
      .catch((error)   => { console.log(error) })
  


    //mock's
    this.$http.get('/api/card/card-statistics/subscribers')
      .then((response) => { this.subscribersGained = response.data })
      .catch((error)   => { console.log(error) })

      // Orders - Statistics
    //this.$http.get('/api/me')
     this.$http.get('/api/card/card-statistics/orders')
      .then((response) => { this.ordersRecevied = response.data })
      .catch((error)   => { console.log(error) })


    
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
