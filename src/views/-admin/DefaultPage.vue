<!-- =========================================================================================
  File Name: DefaultPage.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                    <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
                    <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          <h1 class="mb-6 text-white">Welcome {{ activeUserInfo.first_name }},</h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">to our new system. This is a welcome page for <strong>admins</strong>.</p>
        </vx-card>
      </div>

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="UsersIcon" statistic="92.6k" statisticTitle="Subscribers Gained" :chartData="subscribersGained.series" type="area"></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="ShoppingBagIcon" statistic="97.5K" statisticTitle="Orders Received" :chartData="ordersRecevied.series" color="warning" type="area"></statistics-card-line>
      </div>
   
    </div>

    <div class="vx-row">
      <!-- CARD 9: COMPANY LIST -->
      <div class="vx-col w-full">
        <vx-card title="List of Companies">
          <div slot="no-body" class="mt-4">
            <vs-table :data="companyList" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ID.</vs-th>
                <vs-th>NAME</vs-th>
                <vs-th>OWNER</vs-th>
                <vs-th>TYPE</vs-th>
                <vs-th>LOCATION</vs-th>
                <vs-th>EMPLOYEES</vs-th>
                              
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    <span>#{{data[indextr].id}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].name">
                   <span>{{data[indextr].name}}</span>
                   </vs-td>
                  <!-- <vs-td :data="data[indextr].owner">
                            <vx-tooltip :text="data[indextr].owner" position="bottom">
                                <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                           </vx-tooltip> 
                      
                  </vs-td> -->
                  <vs-td :data="data[indextr].owner">
                    <span>Placeholder</span>
                    </vs-td> 
                   <vs-td :data="data[indextr].type">
                   <span>{{data[indextr].type}}</span>
                   </vs-td>
                  <vs-td :data="data[indextr].country">
                    <span>{{data[indextr].country}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].num_employees">
                    <span>{{data[indextr].num_employees}}</span>
                  </vs-td>
                 
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '../ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'
import axios from '@/axios'

export default {
  data () {
    return {
    
      subscribersGained: {},
      ordersRecevied: {},
      companyList: [],
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
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline
  },

   computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
   },
  created () {
  
      // Subscribers gained - Statistics

     
    this.$http.get('/api/card/card-statistics/subscribers')
      .then((response) => { this.subscribersGained = response.data })
      .catch((error)   => { console.log(error) })

      // Orders - Statistics
    //this.$http.get('/api/me')
     this.$http.get('/api/card/card-statistics/orders')
      .then((response) => { this.ordersRecevied = response.data })
      .catch((error)   => { console.log(error) })


      // CompanyList List from backend
    axios.get('/api/admin/getcompanies')
      .then((response) => { this.companyList = response.data })
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
