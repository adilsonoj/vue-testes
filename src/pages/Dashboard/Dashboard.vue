<template>
  <div class="d-flex flex-row" style="height: 100vh">
    <v-card color="#385F73" class="card">
      <div class="logo">
        <v-img src="../../assets/apple-touch-icon.png"></v-img>
      </div>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="150"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <div
            class="btn"
            v-bind="attrs"
            v-on="on"
            :class="{
              active: isActive == conta.title,
              active: isActive == conta.title,
            }"
            @click="action(conta)"
          >
            <v-icon
              :class="[isActive == conta.title ? 'icon-active' : 'icon']"
              >{{ conta.icon }}</v-icon
            >
            <span>{{ conta.title }}</span>
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

              <!-- <v-list-item-action>
              <v-btn>
                SAIR
              </v-btn>
            </v-list-item-action> -->
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item link v-for="item in conta.items" :key="item.title">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn block @click="menu = false"> SAIR </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <div
        class="btn"
        v-for="item in items"
        :key="item.title"
        :class="{
          active: isActive == item.title,
          active: isActive == item.title,
        }"
        @click="action(item)"
      >
        <v-icon :class="[isActive == item.title ? 'icon-active' : 'icon']">
          {{ item.icon }}
        </v-icon>
        <span>{{ item.title }}</span>
      </div>
    </v-card>

    <div class="dashboard-content">
      <div class="container-logo">
        <!-- <img :src="require('@/assets/logo.webp')" class="logo-background" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdiAccountBox,
  mdiBell,
  mdiClipboardText,
  mdiMedicalBag,
  mdiClipboardPlus,
  mdiChatPlus,
  mdiFilePlus,
  mdiHistory,
  mdiCalendarMonth,
} from "@mdi/js";

export default {
  data() {
    return {
      items: [
        { title: "Minha Ficha", icon: mdiClipboardText },
        { title: "Notificações", icon: mdiBell },
        { title: "Plano de Tratamento", icon: mdiMedicalBag },
        { title: "Meus Exames", icon: mdiClipboardPlus },
        { title: "Histórico", icon: mdiHistory },
        { title: "Impressao diagnóstica", icon: mdiChatPlus },
        { title: "Minhas receitas", icon: mdiFilePlus },
        { title: "Agenda", icon: mdiCalendarMonth },
      ],
      conta: {
        title: "Conta",
        icon: mdiAccountBox,
        items: [
          { title: "Minha Conta", link: "" },
          { title: "Notificações", link: "" },
          { title: "Alterar Senha", link: "" },
        ],
      },
      isActive: false,
      menu: false,
    };
  },
  methods: {
    action(item) {
      this.isActive = item.title;
    },
  },
  computed: {
    active() {
      return this.isActive ? "active" : "";
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100px;
  min-width: 80px;
  overflow-y: scroll;
}
.logo {
  height: 85px;
  border-bottom: solid 1px cadetblue;
}
.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 85px;
  border-bottom: solid 1px cadetblue;
  color: white;
  font-size: 0.8rem;
}
.btn:hover {
  background-color: white;
  cursor: pointer;
  color: rgb(85, 85, 85);
}

.btn:hover .icon {
  color: rgb(85, 85, 85);
}
.active {
  background-color: white;
  color: rgb(85, 85, 85);
}
.icon-active {
  color: rgb(85, 85, 85);
}
.icon {
  color: white;
}
.dashboard {
  display: flex;
  flex-direction: row;
  align-content: center;
}
.dashboard-content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.logo-background {
  max-width: 100%;
  padding: 0 16px 0 16px;
}
.container-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
