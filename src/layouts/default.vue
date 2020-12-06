<template>
  <v-app dark>
    <NavigationDrawer :clipped="clipped" />
    <Header :clipped="clipped" />
    <v-main>
      <v-container>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: {
    NavigationDrawer,
    Header,
    Footer,
  },
  data() {
    return {
      clipped: true,
    };
  },
};
</script>
<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.slide-enter {
  opacity: 0;
}
.slide-leave-to {
  opacity: 0;
}
</style>
