<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Modal
        </v-btn>
      </template>
      <v-card>
        <v-carousel
          :continuous="false"
          :cycle="false"
          :show-arrows="true"
          hide-delimiter-background
          :height="'100%'"
        >
          <v-carousel-item v-for="(item, i) in slides" :key="i" :src="item.src">
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </v-row>
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

