<!-- =========================================================================================
  File Name: FormWizardValidation.vue
  Description: Form wizard with validation
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="Add a new Vehicle" >

    <p>It's important that you fill in these details right, for smoother sailing to so speak. If you are not sure about what you are doing, please <strong><router-link to="/contact">Contact Us</router-link></strong>.</p>

    <div class="mt-5">
      <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="null" finishButtonText="Submit">
          <!-- tab 1 content -->
       <tab-content title="Step 1: Vehicle type" class="mb-5" icon="feather icon-home" :before-change="validateStep1">

       
          <form data-vv-scope="step-1">
         
          <div class="vx-row">
            
            <div class="vx-col md:w-1/2 w-full">
                 <p>Please choose your type of vehicle:</p><br>
                 <div v-for="item in vehicle_options" :key="item.value">
                  <p> <vs-radio :disabled=item.disabled :vs-value=item.value v-model="vehicle_type">{{ item.text}} </vs-radio></p>
                 </div>
                   
                        
            </div> 
            <div class="vx-col md:w-1/2 w-full">
            <div v-if="vehicle_type == 'car'">
              <p>Please choose the Manufacturer:</p><br>

              <div v-for="item in car_options" :key="item.value">
                 <p> <vs-radio :disabled=item.disabled :vs-value=item.value v-model="car_type">{{ item.text}} </vs-radio></p>
              </div>
            </div>
            <div v-else>
               <span class="text-danger">This type of vehicle is not yet avaible</span>
            </div>
          
            </div>    
 
          </div>
          </form>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Step 2: Country" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
          <form data-vv-scope="step-2">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
              <p>Country of Origin:</p><br>
              <vs-input v-model="origin" :disabled=origin_disabled class="w-full mt-4" name="origin" v-validate="'required'" />
              <span class="text-danger text-sm">{{ errors.first('step-2.origin') }}</span>
              <br><p>Country of Registration:</p><br>
              <vs-input v-model="registration" class="w-full mt-4" name="registration" v-validate="'required'" />
              <span class="text-danger text-sm">{{ errors.first('step-2.registration') }}</span>
              <div v-if="origin != registration">
              <br><p>Grey import vehicle?:</p><br>
              <p><vs-radio v-model="greyimport"  vs-value=true >Yes</vs-radio> </p>
              <p><vs-radio v-model="greyimport" vs-value=false >No</vs-radio> </p>
              </div>  
            </div>
            <div class="vx-col md:w-1/2 w-full">
              <p>Chassi Number [VIN]:</p><br>
              <vs-input v-model="chassi" class="w-full mt-4" name="chassi" v-validate="'required'" placeholder="XXXXXX"/>
                <span class="text-danger text-sm">{{ errors.first('step-2.registration') }}</span>
                <span class="text-danger text-sm" v-show="errors.has('step-2.chassi')">{{ errors.first('step-2.chassi') }}</span>
              <br><p>Registration Number:</p><br>
              <vs-input v-model="reg_nr" class="w-full mt-4" name="reg_nr" v-validate="'required'" placeholder="XXXX-XXX"/>
                  <span class="text-danger text-sm" v-show="errors.has('step-2.reg_nr')">{{ errors.first('step-2.reg_nr') }}</span>
              <br><p>Legal Owner:</p><br>
              <vs-input v-model="owner" class="w-full mt-4" name="owner" v-validate="'required'" />
                  <span class="text-danger text-sm" v-show="errors.has('step-2.owner')">{{ errors.first('step-2.owner') }}</span>
            </div>
        
          </div>
          </form>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="Step 3: Basic Model Info" class="mb-5" icon="feather icon-image" :before-change="validateStep3">
          <form data-vv-scope="step-3">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
               <br><p>Choose the type of fuel:</p><br>
           <p><vs-radio v-model="combustion" vs-value="petrol" v-validate="'required'" >Petrol</vs-radio> </p>
           <p><vs-radio v-model="combustion" vs-value="diesel">Diesel</vs-radio> </p>
             <br><p>Select the type of transmission:</p><br>
           <p><vs-radio v-model="transmission" vs-value="gated" v-validate="'required'" >Gated</vs-radio> </p>
           <p><vs-radio v-model="transmission" vs-value="f1">F1</vs-radio> </p>
             
            </div>
            <div class="vx-col md:w-1/2 w-full">
            <br><p>Select Model name:</p>
              <vs-select v-model="car_model" class="w-full select-large mt-5" v-validate="'required'">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in car_models" class="w-full" />
              </vs-select>
                <span class="text-danger text-sm" v-show="errors.has('step-3.car_model')">{{ errors.first('step-3.car_model') }}</span>
               <br><p>Model Year:</p>
              <vs-select v-model="model_year" class="w-full select-large mt-5" v-validate="'required'">
                <vs-select-item :key="index" :text="year" v-for="(year,index) in year_options" class="w-full" />
              </vs-select>
              <span class="text-danger text-sm" v-show="errors.has('step-3.model_year')">{{ errors.first('step-3.model_year') }}</span>
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-select v-model="status" class="w-full select-large" label="Event Status">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions" class="w-full" />
              </vs-select>
            </div>
            <div class="vx-col md:w-1/2 w-full md:mt-8">
              <div class="demo-alignment">
                <span>Requirements:</span>
                <div class="flex">
                  <vs-checkbox>Staffing</vs-checkbox>
                  <vs-checkbox>Catering</vs-checkbox>
                </div>
              </div>
            </div>
          </div>
          </form>
        </tab-content>
        <tab-content title="Step 4: Current modifications" class="mb-5" icon="feather icon-home" :before-change="validateStep1">

       
          <form data-vv-scope="step-4">
         
          <div class="vx-row">
            
            <div class="vx-col md:w-1/2 w-full">
                 <p>Which exhaust does your vehicle have?</p><br>
                 <div v-for="item in exhaust_options" :key="item.value">
                  <p> <vs-radio :disabled=item.disabled :vs-value=item.value v-model="exhaust">{{ item.text}} </vs-radio></p>
                 </div>
                  <p>Does the vehicle have any modifications?</p><br>
                 <div v-for="item in modification_options" :key="item.value">
                  <p> <vs-radio :disabled=item.disabled :vs-value=item.value v-model="modifications">{{ item.text}} </vs-radio></p>
                 </div>  
                        
            </div> 
            <div class="vx-col md:w-1/2 w-full">
            <div v-if="vehicle_type == 'car'">
              <p>Is the car f1 paddleshift or Gated?</p><br>

              <div v-for="item in car_options" :key="item.value">
                 <p> <vs-radio :disabled=item.disabled :vs-value=item.value v-model="car_type">{{ item.text}} </vs-radio></p>
              </div>
            </div>
            <div v-else>
               <span class="text-danger">This type of vehicle is not yet avaible</span>
            </div>
          
            </div>    
 
          </div>
          </form>
        </tab-content>

      </form-wizard>
    </div>
   Manufacturer:                           Ferrari
            Country of Origin:                      Italy                                                                   [i]
            Fuel Type:                                      [Petrol]/Diesel                                                 [i]
            Country of Registration:        [USA], [EU],etc.
            Grey Import:                            Yes/[No]       
            Model Year                                      [1999]/2000/2001/2002/2003/2004/2005
            Model Name                                      360 Modena/[360 Spider]
            Transmission Type:                      F1/[Gated]
            Chassis Number [VIN]:           XXXXXX
            Registration Number:            XXXXXX
            Legal Owner:                            ________          
   
  </vx-card>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// For custom error message
import { Validator } from 'vee-validate'
// const dict = {
//   custom: {
//     chassi: {
//       required: 'First name is required',
//       alpha: 'First name may only contain alphabetic characters'
//     },
//     first_name: {
//       required: 'First name is required',
//       alpha: 'First name may only contain alphabetic characters'
//     },
//     last_name: {
//       required: 'Last name is required',
//       alpha: 'Last name may only contain alphabetic characters'
//     },
//     email: {
//       required: 'Email is required',
//       email: 'Please enter valid email'
//     },
//     job_title: {
//       required: 'Job title name is required',
//       alpha: 'Job title may only contain alphabetic characters'
//     },
//     proposal_title: {
//       required: 'Proposal title name is required',
//       alpha: 'Proposal title may only contain alphabetic characters'
//     },
//     event_name: {
//       required: 'Event name is required',
//       alpha: 'Event name may only contain alphabetic characters'
//     }
//   }
// }

// register custom messages
// Validator.localize('en', dict)

export default {
  data () {
    return {
      vehicle_type: 'car',
      vehicle_options: [ //we import these from a DB or whatever if needed.
      { text: 'ICE Car', value: 'car', disabled: false },
      { text: 'Electric Car', value: 'electric_car', disabled: true },
      { text: 'Boat', value: 'boat', disabled: true },
      { text: 'Motorbike', value: 'bike', disabled: true },
      { text: 'Tractor', value: 'tractor', disabled: true },
      ],
      car_type: 'ferrari',
      car_options: [
        { text: 'Ferrari', value: 'ferrari' },
        { text: 'Maserati', value: 'maserati' },
     
      ],
      origin: 'Italy',
      origin_disabled: true,
      registration: 'USA',
      greyimport: 'false',
      chassi: '',
      reg_nr: '',
      owner: '',
      combustion: 'petrol',
      transmission: 'gated',
      car_model: '',
      car_models : [],
      model_year: '1999',
      year_options: ['1999','2000','2001','2002','2003','2004','2005','2006'],
      exhaust: 'standard',
      exhaust_options: [
        { text: 'Factory Standard Non Sports Exhaust', value: 'standard' },
        { text: 'Factory Optional Sports Exhaust', value: 'factory_sport' },
        { text: 'Aftermarket Sports Exhaust (Modified)', value: 'modified' },
     
      ],
      air_inject: 'no',
      air_inject_options: [
        { text: 'Air Injection  (USA Only)', value: 'yes' },
        { text: 'Deleted Air Injection', value: 'deleted' },
        { text: 'No Air Injection fitted from Factory', value: 'no' },
      ],
      header_cats: 'no',
      header_cats_options: [
        { text: 'Header Cats', value: 'yes' },
        { text: 'Deleted Cats', value: 'deleted' },
        { text: 'No Header Cats fitted from Factory', value: 'no' },
      ],
      header_cats: 'no',
      header_cats_options: [
        { text: 'Header Cats', value: 'yes' },
        { text: 'Deleted Cats', value: 'deleted' },
        { text: 'No Header Cats fitted from Factory', value: 'no' },
      ],

      firstName: '',
      lastName: '',
      email: '',
      city: 'new-york',
      proposalTitle: '',
      jobTitle: '',
      textarea: '',
      eventName: '',
      eventLocation: 'san-francisco',
      status: 'plannning',
      cityOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' }
      ],
      statusOptions: [
        { text: 'Plannning', value: 'plannning' },
        { text: 'In Progress', value: 'in progress' },
        { text: 'Finished', value: 'finished' }
      ],
      LocationOptions: [
        { text: 'New York', value: 'new-york' },
        { text: 'Chicago', value: 'chicago' },
        { text: 'San Francisco', value: 'san-francisco' },
        { text: 'Boston', value: 'boston' }
      ]
    }
  }, 
  created () {
  this.updateCarModels(this.car_type);
  },
  watch: {
    car_type: function (val) {
      if (val != 'ferrari') {
        this.origin = '';
        this.origin_disabled = false;
      }
      else {
        this.origin = 'Italy';
        this.origin_disabled = true;
      }     
      this.updateCarModels(val);
    }
  },  
  
  methods: {
    updateCarModels(model) { 
      this.car_model = ''; //reset the chosen model
      if (model == 'ferrari') {
        this.car_models = [
       { text: '360 Modena', value: '360_modena', id: 0 },
        { text: '360 Spider', value: '360_spider', id: 1 },
        { text: '360 Challenge', value: '360_challenge', id: 2 },
        { text: '550 Barchetta', value: 'barchetta', id: 3 },
        ]
      }
      else if (model == 'maserati') {
        this.car_models = [
        { text: 'Ghibli ABS', value: 'ghibli_abs', id: 100 },
        { text: 'Ghibli GT', value: 'ghibli_gt', id: 101 },
        { text: 'Quattroporte', value: 'quattroporte', id: 102 },
        { text: '4200 Coupe', value: '4200', id: 103 },
        ]
      }

      else return 'error';
    },
    validateStep1 () {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
    validateStep2 () {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-2').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    },
    validateStep3 () {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-3').then(result => {
          if (result) {
            alert('Form submitted!')
            resolve(true)
          } else {
            reject('correct all values')
          }
        })
      })
    }
  },
  components: {
    FormWizard,
    TabContent
  }
}
</script>
