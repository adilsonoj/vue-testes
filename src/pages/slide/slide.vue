<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Modal
        </v-btn>
      </template>
      <v-card color="#000">
        <v-carousel
          :continuous="false"
          :cycle="false"
          :show-arrows="true"
          hide-delimiter-background
          :height="'100%'"
        >
          <v-carousel-item v-for="(item, i) in slides" :key="i" :src="item.src">
          </v-carousel-item>
          <v-card-actions>
            <v-img :src="rodape" class="mb-10"></v-img>
          </v-card-actions>
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
          src: require("@/assets/tutorial/tutorial1.png"),
        },
        {
          src: require("@/assets/tutorial/tutorial2.png"),
        },
        {
          src: require("@/assets/tutorial/tutorial3.png"),
        },
        {
          src: require("@/assets/tutorial/tutorial4.png"),
        },
        {
          src: require("@/assets/tutorial/tutorial5.png"),
        },
        {
          src: require("@/assets/tutorial/tutorial6.png"),
        },
        {
          src: require("@/assets/tutorial/tutorial7.png"),
        },
      ],
      rodape: require("@/assets/tutorial/tutorial_title.png"),
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

