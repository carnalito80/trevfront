<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0 m-4 opacity-75">
            <vx-card>
               
                    <div class="vx-row no-gutter">
                     
                        <div class="vx-col sm:w-full md:w-full lg:w-3/4 mx-auto self-center  d-theme-dark-bg">
                            <div class="px-8 pt-8 register-tabs-container">
                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4">Registry completed.</h4>
                                    <p>Registration complete. Please check your email for a confirmation mail, you will need to it activate your account.</p>
                                    <br>
                                    <p>Understood, take me back to <a href="/login/">login</a></p>
                                </div>

                                 
                               
                            </div>
                        </div>
                    </div>
             
            </vx-card>
        </div>
    </div>
</template>

<script>


export default {
 
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
