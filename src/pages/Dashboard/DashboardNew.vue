<template>
  <v-app>
    <v-app-bar v-if="mobile" app color="#385F73" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"
        ><v-icon class="text">{{ menuIcon }}</v-icon></v-app-bar-nav-icon
      >
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      color="#385F73"
      :mini-variant="mini && !mobile"
      mini-variant-width="56"
      :permanent="!mobile"
      app
      absolute
    >
      <v-list-item class="px-2" v-if="!mini">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>{{ mdiChevronDoubleRight }}</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../../assets/apple-touch-icon.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-title></v-list-item-title>
        <v-btn v-if="!mobile" icon @click.stop="mini = !mini">
          <v-icon color="white">{{ mdiChevronDoubleLeft }}</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="px-2" v-if="mini && !mobile">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon color="white">{{ mdiChevronDoubleRight }}</v-icon>
        </v-btn>
      </v-list-item>
      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="white">
          <Menu @drawer="drawer = !drawer" />

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.url"
          >
            <v-list-item-action>
              <v-icon class="text">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col align-self="center">
          <transition name="fade">
            <router-view name="dashboard-paciente"></router-view>
          </transition>
        </v-col>
      </v-row>
      <v-footer app class="py-3">
        <span class="ml-auto overline">Gymbrain &copy;2020</span>
      </v-footer>
    </v-container>
  </v-app>
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
  mdiMenu,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
} from "@mdi/js";
import Menu from "./components/Menu";

export default {
  components: {
    Menu,
  },

  data() {
    return {
      items: [
        {
          title: "Minha Ficha",
          icon: mdiClipboardText,
          url: "/dashboardNew/home",
        },
        {
          title: "Notificações",
          icon: mdiBell,
          url: "/dashboardNew/notificacaopaciente",
        },
        {
          title: "Plano de Tratamento",
          icon: mdiMedicalBag,
        },
        {
          title: "Meus Exames",
          icon: mdiClipboardPlus,
        },
        {
          title: "Histórico",
          icon: mdiHistory,
        },
        {
          title: "Impressao diagnóstica",
          icon: mdiChatPlus,
        },
        {
          title: "Minhas receitas",
          icon: mdiFilePlus,
        },
        {
          title: "Agenda",
          icon: mdiCalendarMonth,
        },
      ],
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
      menu: false,
      selectedItem: undefined,
      drawer: false,
      menuIcon: mdiMenu,
      mdiChevronDoubleLeft,
      mdiChevronDoubleRight,
      mini: true,

      open: false,
    };
  },
  methods: {
    computed: {
      mobile() {
        return this.$vuetify.breakpoint.mdAndDown;
      },
    },
  },
};
</script>

<style scoped>
.active {
  background-color: white;
  color: rgb(85, 85, 85);
}
.text {
  color: white;
}
</style>
