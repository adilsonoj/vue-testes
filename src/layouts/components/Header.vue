<template>
  <v-app-bar :clipped-left="clipped" fixed app :color="color">
    <v-app-bar-nav-icon @click.stop="drawer" />
    <v-img
      src="../../assets/logo.png"
      alt="Vuetify.js"
      max-width="20"
      class="ml-5"
    />
    <v-toolbar-title class="ml-5" v-text="title" />
    <v-spacer />
    <v-btn icon @click="color = '#4bcbcc'" color="#4bcbcc">
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>
    <v-btn icon @click="color = '#0081cb'" color="#0081cb">
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>
    <v-btn icon @click="color = 'teal'" color="teal">
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>
    <v-btn icon @click="color = '#8d8d8d'" color="#8d8d8d">
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>
    <v-btn icon @click="color = ''">
      <v-icon>mdi-water-off</v-icon>
    </v-btn>
    <Menu />
  </v-app-bar>
</template>

<script>
import Menu from "./Menu";
import EventBus from "../../../config/eventBus";
export default {
  name: "header",
  components: {
    Menu,
  },
  props: {
    clipped: Boolean,
  },
  data() {
    return {
      title: "NOME APP",
      color: "",
    };
  },
  methods: {
    drawer() {
      EventBus.$emit("DRAWER");
    },
  },
};
</script>

<style></style>
