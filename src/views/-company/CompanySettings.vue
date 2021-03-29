<template>
  
  <vx-card no-shadow>

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="clogo" size="70px" class="mr-4 mb-4" />
      <div>
   
      <input id="fileUpload" type="file" name="filen"  accept="image/png, image/jpeg, image/gif" hidden @change="updatefile()">
        <vs-button  @click="chooseFiles()" class="mr-4 sm:mb-0 mb-2">Choose photo</vs-button>
        <vs-button :disabled='isDis'  @click="submitFile()" class="mr-4 sm:mb-0 mb-2">Upload</vs-button>
      
          <p v-if="file.name" class="text-success text-sm mt-2">file: {{ file.name }} </p>
          <p v-if="errormess" class="text-danger text-sm mt-2">file: {{ errormess }} </p>
          <p v-if="!errormess && !file.name" class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB </p>
        
      </div>
    </div>

    <!-- Info -->
    <form id="updateCompanyDetails">
      <vs-input disabled class="w-full mb-base" label-placeholder="Company Name" v-model="cname"></vs-input>
      <vs-input name="billing_adress" v-validate="'required'" class="w-full mb-base" label-placeholder="Billing Adress" v-model="cadress"></vs-input>
      <span class="text-danger text-sm" v-show="errors.has('billing_adress')">{{ errors.first('billing_adress') }}</span>
      <vs-input name="website"  v-validate="'url'" class="w-full" label-placeholder="Website" v-model="cweb"></vs-input>
        <span class="text-danger text-sm" v-show="errors.has('website')">{{ errors.first('website') }}</span>
      <vs-input name="phone" class="w-full my-base" label-placeholder="Phonenumber" v-model="cphone"></vs-input>
    
      <!-- Save & Reset Button -->
      <div class="flex flex-wrap items-center justify-end">
        <vs-button @click.prevent="submitForm" class="ml-auto mt-2">Save Changes</vs-button>
        <!-- <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button> -->
      </div>
    </form>
  </vx-card>
</template>

<script>

import axios from '@/axios'
export default {
  
  data () {
    return {
       clogo: JSON.parse(JSON.stringify(this.$store.state.AppActiveUser.company.logo)),
       cname: JSON.parse(JSON.stringify(this.$store.state.AppActiveUser.company.name)),
       cadress: JSON.parse(JSON.stringify(this.$store.state.AppActiveUser.company.billing_adress)),
       cweb: JSON.parse(JSON.stringify(this.$store.state.AppActiveUser.company.website)),
       cphone: JSON.parse(JSON.stringify(this.$store.state.AppActiveUser.company.phone)),
       file: '',
       errormess: '',
       isDis: true,
     
    }
  },
  methods:{
    chooseFiles() {
     document.getElementById("fileUpload").click();
    },
    updatefile() {
      if(document.getElementById("fileUpload").files[0].size > 810000)  {
      this.errormess = 'File too big: Max file size is 800Kb'
      this.isDis = true
      this.file = ''
      }
      else {
        this.file = document.getElementById("fileUpload").files[0]
        this.isDis = false
        this.errormess = ''

      } 
    },
   handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log('>>>> 1st element in files array >>>> ', this.file);
    },
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
       console.log('>>>> 1st element in files array >>>> ', this.file);
      console.log('>> formData >> ', formData);
            
      axios.post('/api/company/uploadlogo/',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
             this.$vs.notify({color:'success',title:'Upload Success',text:'Upload succeeded'})
          
           return 'succes';
        })
        .catch((error) => {
            this.$vs.notify({color:'danger',title:'Upload Failed',text:error})
         
           return(error)
        });

    },
     submitForm() {
      this.$validator.validateAll().then(result => {

        if(result) {
            let formData = new FormData(document.getElementById("updateCompanyDetails"));
            this.$vs.loading()
           axios.post('/api/company/updatecompanydetails',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => { 
          this.$vs.loading.close() 
           this.$vs.notify({color:'success',title:'Update Succeeded',text:response.text})
          })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({color:'danger',title:'Update Failed',text:error})
        })
        }else{
          // form have errors
        }
      })
     }
  },  
  computed: {
      
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    },
     activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
