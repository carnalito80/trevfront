
<template>
      
                   <vx-card title="Latest News" class="mt-base">
                    <ul v-if="!newserror" class="twitter-feeds-list">
                        <li class="twitter-feed" :class="{'mt-8': index}" v-for="(news, index) in latestnews" :key="news.id">
                            <!-- FEED HEADER -->
                            <div class="twitter-feed-header flex items-center">
                                <vs-avatar class="m-0" :src="fixAvatar(news.author_avatar)" size="35px" />
                                <div class="leading-tight ml-3">
                                    <p class="feed-author font-semibold">{{ news.title }}</p>
                                    <span class="flex items-center"><small>{{ news.author }}</small><feather-icon class="ml-1" icon="CheckIcon" svgClasses="h-3 w-3 bg-primary rounded-full text-white"></feather-icon></span>
                                </div>
                            </div>

                            <!-- FEED CONTENT -->
                            <p class="mt-4">{{ news.text }}</p>
                            <div class="tags-container" v-if="news.tags">
                                <span v-for="tag in news.tags" :key="tag" id="tag" class="mr-2 text-primary">#{{tag}}</span>
                            </div>
                            <small class="mt-3 inline-block">{{ news.post_date }}</small>
                        </li>
                    </ul>
                    <p v-else>News could not be fetched. Try again later </p>
                </vx-card>
  </template>              

<script>

import axios from '@/axios'
export default{
   name: 'latest-news',
  data () {
    return {
      newserror: false,
        latestnews: []
    }
  },
  created () {

    axios.get('/api/getnews')
      .then((response) => { 
        this.latestnews = response.data 

        
        
        })
      .catch((error)   => { 
        this.newserror = true;
        console.log(error) })

  


  
  },
  methods: {
  fixAvatar ($avatar) {
      if (!$avatar)  return process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AVATAR_FOLDER + 'error.jpg';
      else return process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_AVATAR_FOLDER + $avatar;
       
  },
  }
}  
</script>
