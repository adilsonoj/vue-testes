<template>
  <v-card
    elevation="24"
    :max-width="mobile ? 360 : 1080"
    :max-height="mobile ? 600 : 1800"
    class="mx-auto"
  >
    <v-carousel
      :continuous="false"
      :cycle="false"
      :show-arrows="true"
      hide-delimiter-background
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
  data() {
    return {
      slides: [
        {
          src: require("@/assets/tutorial/1.jpeg"),
        },
        {
          src: require("@/assets/tutorial/2.jpeg"),
        },
        {
          src: require("@/assets/tutorial/3.jpeg"),
        },
        {
          src: require("@/assets/tutorial/4.jpeg"),
        },
        {
          src: require("@/assets/tutorial/5.jpeg"),
        },
      ],
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

