<template>
  <v-menu :close-on-content-click="true" :nudge-width="100" offset-x>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-list-item link exact>
          <v-list-item-action>
            <v-icon class="text">{{ conta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text">{{
              conta.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="primary" size="56">
              <span class="white--text headline">MO</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Marcelo Oliveira</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          link
          v-for="item in conta.items"
          :key="item.title"
          @click.stop="$emit('drawer')"
        >
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block link to="/login">
          SAIR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { mdiAccountBox } from "@mdi/js";
export default {
  data() {
    return {
      conta: {
        title: "Conta",
        icon: mdiAccountBox,
        url: "/dashboardNew",
        items: [
          {
            title: "Minha Conta",
            url: "",
          },
          {
            title: "Alterar Senha",
            url: "",
          },
        ],
      },
    };
  },
};
</script>
<style scoped>
.text {
  color: white;
}
</style>
