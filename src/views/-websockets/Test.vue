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
    <h3>Websocket Test</h3>
    <p>status: {{status}} </p>
    <p>message: {{sentmessage}} </p>  
    <p>answer: {{answer}} </p>

    

   
</div>
 
</template>

<script>
 
// import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '../ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'
// import axios from '../../axioswebsocket'
//import socket from 'faye-websocket'


export default {
  data() {
    
      return {
      status: "offline",
      message: {},
      sentmessage: "",
      answer: {},
       //This will open the connection*
       ws : new WebSocket("ws://192.168.101.10:6001/app/nyckel")
      }
   
   },
    mounted() {
        this.myMethod()
    },
    methods:{
        myMethod() {
           let __this = this
            let self = this
            let that = this
            window.addEventListener('click', function() {
                console.log('this scope (function) >', this)
                    console.log('this scope (_this) >', _this)
                console.log('this scope (__Thisvuejs) >', __this)
                console.log('this scope (vuejs) >', self)
                console.log('this scope (vuejs) >', that)
            })
        }
    },
  created () {
    let _this = this // as in the parent as in data
   
    let mess = _this.message;
  

    // _this.ws.onopen = function(event) {
    //  _this.status = "connected";
    //  _this.ws.send(mess);
    // }

    
    _this.ws.onopen = function () {
      _this.message = {
        "event": 'bra-log-message',
        "channel": 'test-channel',
         "data": {
          "type" : 'disconnection',
          "time": '12:28:04',
          }
        }; 
   
        _this.status = "connected";
       _this.ws.send(mess);
         
  }

  _this.ws.onmessage = function (event)  {
_this.answer = event.data;
  }

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
