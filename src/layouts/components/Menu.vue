<template>
  <v-menu
    :close-on-content-click="true"
    :nudge-width="100"
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
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
            <v-list-item-subtitle>Perfil acesso</v-list-item-subtitle>
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
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text link to="/login">
          SAIR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { mdiAccount, mdiLock } from "@mdi/js";
export default {
  data() {
    return {
      conta: {
        title: "Conta",

        url: "/account",
        items: [
          {
            title: "Minha Conta",
            icon: mdiAccount,
            url: "",
          },
          {
            title: "Alterar Senha",
            icon: mdiLock,
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
