<template>
  <v-card
    elevation="24"
    max-width="360"
    max-height="600"
    class="mx-auto"
  >
    <v-carousel
      :continuous="false"
      :cycle="false"
      :show-arrows="true"
      hide-delimiter-background
      max-height="600"
      
    >
      <v-carousel-item
        v-for="(item, i) in slides"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
        :src="item.src"
      >
       
      </v-carousel-item>
    </v-carousel>
    
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        slides: [
          {
              src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
          },
           {
              src: require("@/assets/slide/2.jpg")
          },
           {
              src: require("@/assets/slide/3.jpg")
          },
           {
              src: require("@/assets/slide/4.jpg")
          },
           {
              src: require("@/assets/slide/5.jpg")
          },
        ],
      }
    },
  }
</script>

