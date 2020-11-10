<template>
  <v-card height="100vh" width="80">
    <v-navigation-drawer permanent width="100%">
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer
          dark
          mini-variant
          mini-variant-width="80"
          permanent
        >
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/women/75.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item-group v-model="selectedItem" color="black">
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                active-class="active"
                class="px-2"
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                  <span>Dash</span>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <!-- <v-list class="grow">
          <v-list-item v-for="link in links" :key="link" link>
            <v-list-item-title v-text="link"></v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-row>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mdiViewDashboard, mdiForum } from "@mdi/js";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: mdiViewDashboard },
        { title: "About", icon: mdiForum },
      ],
      links: ["Home", "Contacts", "Settings"],
      mini: true,
    };
  },
};
</script>

<style>
.active {
  background-color: white;
  --color: rgb(85, 85, 85);
}
</style>
