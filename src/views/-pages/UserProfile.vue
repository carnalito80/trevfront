<!-- =========================================================================================
  File Name: Profile.vue
  Description: Profile Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="profile-page">

        <!-- PROFILE HEADER -->
        <div class="profile-header">
            <div class="relative">
                <div class="cover-container rounded-t-lg">
                    <img :src="user_info.cover_img" alt="user-profile-cover" class="responsive block">
                </div>
                <div class="profile-img-container pointer-events-none">
                    <div>
                        <vs-avatar class="user-profile-img" :src="activeUserInfo.photoURL" size="85px" />
                    </div>
                   
                </div>
            </div>
          
            <!-- <vx-navbar> -->
            <!-- </vx-navbar> -->
        </div>
<br>
        <!-- COL AREA -->
         <div class="vx-row">
              <div class="vx-col w-full lg:w-1/4">
               <vx-card :title= "activeUserInfo.displayName" class="mt-base">
                    <!-- ACTION SLOT -->
                    <template slot="actions">
                        <feather-icon icon="MoreHorizontalIcon"></feather-icon>
                    </template>

                    <!-- USER BIO -->
                    <div class="user-bio">
                        <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.</p>
                    </div>

                    <!-- OTEHR DATA -->
                    <div class="mt-5">
                        <h6>Joined:</h6>
                        <p>November 15, 2015</p>
                    </div>

                    <div class="mt-5">
                        <h6>Lives:</h6>
                        <p>New York, USA</p>
                    </div>

                    <div class="mt-5">
                        <h6>Email:</h6>
                        <p>bucketful@fiendhead.org</p>
                    </div>

                    <div class="mt-5">
                        <h6>Website:</h6>
                        <p>www.pixinvent.com</p>
                    </div>

                    <div class="social-links flex mt-4">
                        <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="FacebookIcon"></feather-icon>
                        <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="TwitterIcon"></feather-icon>
                        <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="InstagramIcon"></feather-icon>
                    </div>
                </vx-card>
              </div>
                <div class="vx-col w-full lg:w-1/2">
                 <vx-card title="My Stuff" class="mt-base">
                     <div class="mt-5">
                        <h6>Cars:</h6>
                        <p>List</p>
                    </div>

                    <div class="mt-5">
                        <h6>Roms:</h6>
                        <p>list</p>
                    </div>

                    <div class="mt-5">
                        <h6>etc:</h6>
                        <p>bucketful@fiendhead.org</p>
                    </div>

                    <div class="mt-5">
                        <h6>Website:</h6>
                        <p>www.pixinvent.com</p>
                    </div>
                 </vx-card>
                </div>
                <div class="vx-col w-full lg:w-1/4">
                <latest-news></latest-news>
                   <!-- <vx-card title="Latest News" class="mt-base">
                    <ul class="twitter-feeds-list">
                        <li class="twitter-feed" :class="{'mt-8': index}" v-for="(feed, index) in twitterFeeds" :key="feed.id">
                        
                            <div class="twitter-feed-header flex items-center">
                                <vs-avatar class="m-0" :src="feed.authorAvatar" size="35px" />
                                <div class="leading-tight ml-3">
                                    <p class="feed-author font-semibold">{{ feed.authorDisplayName }}</p>
                                    <span class="flex items-center"><small>@{{ feed.authorUsername }}</small><feather-icon class="ml-1" icon="CheckIcon" svgClasses="h-3 w-3 bg-primary rounded-full text-white"></feather-icon></span>
                                </div>
                            </div>

                           
                            <p class="mt-4">{{ feed.content }}</p>
                            <div class="tags-container" v-if="feed.tags.length">
                                <span v-for="tag in feed.tags" :key="tag" id="tag" class="mr-2 text-primary">#{{tag}}</span>
                            </div>
                            <small class="mt-3 inline-block">{{ feed.time | date(true) }}</small>
                        </li>
                    </ul>
                </vx-card> -->
                </div>  
         </div>  
        

        
    </div>
</template>

<script>

import LatestNews from '@/-components/LatestNews.vue'

export default {
  data () {
    return {
      isNavOpen: false,
      userPoll: '',
      user_info: {
        profile_img: require('@/assets/images/profile/user-uploads/user-13.jpg'),
        cover_img: require('@/assets/images/intro.jpg')
      },
      latestnews: [],       
      suggestedPages: [
        { img: require('@/assets/images/profile/pages/page-09.jpg'), title: 'Rockose',      type: 'Company'          },
        { img: require('@/assets/images/profile/pages/page-08.jpg'), title: 'The Devil\'s', type: 'Clothing Store'   },
        { img: require('@/assets/images/profile/pages/page-03.jpg'), title: 'The Magician', type: 'Public Figure'    },
        { img: require('@/assets/images/profile/pages/page-02.jpg'), title: 'AC/DC',        type: 'Music'            },
        { img: require('@/assets/images/profile/pages/page-07.jpg'), title: 'eat hard',     type: 'restaurant / bar' },
        { img: require('@/assets/images/profile/pages/page-04.jpg'), title: 'B4B',          type: 'Beauty Store'     },
        { img: require('@/assets/images/profile/pages/page-05.jpg'), title: 'Kylie Jenner', type: 'Public Figure'    },
        { img: require('@/assets/images/profile/pages/page-01.jpg'), title: 'RDJ',          type: 'Actor'            },
        { img: require('@/assets/images/profile/pages/page-06.jpg'), title: 'Taylor Swift', type: 'Music'            }
      ],
 
      wasSidebarOpen: null
    }
  },
    components: {
   LatestNews,

  },

  computed: {
     activeUserInfo () {
      return this.$store.state.AppActiveUser
     },
    // mediaType () {
    //   return (media) => {
    //     if (media.img) {
    //       const ext = media.img.split('.').pop()
    //       if (this.mediaExtensions.img.includes(ext)) return 'image'
    //     } else if (media.sources && media.poster) {
    //       // other validations
    //       return 'video'
    //     }
    //   }
    // },
    // playerOptions () {
    //   return (media) => {
    //     return {
    //       height: '360',
    //       fluid: true,
    //       autoplay: false,
    //       muted: true,
    //       language: 'en',
    //       playbackRates: [0.7, 1.0, 1.5, 2.0],
    //       sources: media.sources,
    //       poster: media.poster
    //     }
    //   }
    // }
  },
  methods: {
    loadContent () {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-load-more-posts',
        scale: 0.45
      })
      setTimeout(() => {
        this.$vs.loading.close('#button-load-more-posts > .con-vs-loading')
      }, 3000)
    }
  },
 
  mounted () {
    this.wasSidebarOpen = this.$store.state.reduceButton
    this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
  },
  beforeDestroy () {
    if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";
</style>
