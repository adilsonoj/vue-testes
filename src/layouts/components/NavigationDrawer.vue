<template>
  <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import EventBus from "../../../config/eventBus";
export default {
  props: ["clipped"],

  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Login",
          to: "/login",
        },
        {
          icon: "mdi-alert-octagon",
          title: "404",
          to: "/404",
        },
        {
          icon: "mdi-account-plus",
          title: "Usuários",
          to: "/users",
        },
        {
          icon: "mdi-chat",
          title: "Meet",
          to: "/meet",
        },
        {
          icon: "mdi-cloud-upload",
          title: "Upload",
          to: "/upload",
        },
        {
          icon: "mdi-cloud-upload",
          title: "Upload-spring",
          to: "/upload-spring",
        },
        {
          icon: "mdi-play-box-outline",
          title: "Slide",
          to: "/slide",
        },
        {
          icon: "mdi-calendar",
          title: "Calendar",
          to: "/calendar",
        },
        {
          icon: "mdi-calendar",
          title: "Socket",
          to: "/socket",
        },
      ],
    };
  },
  mounted() {
    EventBus.$on("DRAWER", () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>

<style></style>
