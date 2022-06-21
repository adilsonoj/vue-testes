import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Notificacao from "../pages/Notificacao/NotificacaoPaciente.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../pages/Dashboard/Dashboard.vue"
      ),
  },
  {
    path: "/dashboardLayout",
    name: "DashboardLayout",
    component: () =>
      import(
        /* webpackChunkName: "dashboardLayout" */ "../pages/Dashboard/DashboardLayout.vue"
      ),
  },
  {
    path: "/dashboardNew",
    name: "DashboardNew",
    component: () =>
      import(
        /* webpackChunkName: "dashboardNew" */ "../pages/Dashboard/DashboardNew.vue"
      ),
    children: [
      {
        path: "",
        components: {
          "dashboard-paciente": () =>
            import(
              /* webpackChunkName: "" */ "../pages/Dashboard/DashboardHome.vue"
            ),
        },
      },
      {
        path: "home",
        name: "Homes",
        components: {
          "dashboard-paciente": Home,
        },
      },
      {
        path: "notificacaopaciente",
        name: "NotificacaoPaciente",
        components: {
          "dashboard-paciente": Notificacao,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/Login/Login.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import(/* webpackChunkName: "users" */ "../pages/users/"),
  },
  {
    path: "/meet",
    name: "JitsiMeet",
    component: () => import(/* webpackChunkName: "meet" */ "../pages/Meet/"),
  },
  {
    path: "/upload",
    name: "Upload",
    component: () =>
      import(/* webpackChunkName: "upload" */ "../pages/upload/"),
  },
  {
    path: "/upload-spring",
    name: "Upload-spirng",
    component: () =>
      import(/* webpackChunkName: "-spirng" */ "../pages/upload/upload.vue"),
  },
  {
    path: "/upload-chave-spring",
    name: "Upload-chave-spirng",
    component: () =>
      import(/* webpackChunkName: "-spirng" */ "../pages/upload/uploadchave.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () =>
      import(/* webpackChunkName: "upload" */ "../pages/chat/chat"),
  },
  {
    path: "/slide",
    name: "slide",
    component: () => import(/* webpackChunkName: "slide" */ "../pages/slide/slide"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import(/* webpackChunkName: "slide" */ "../pages/calendar"),
  },
  {
    path: "/token",
    name: "token",
    component: () => import(/* webpackChunkName: "token" */ "../pages/token"),
  },
  {
    path: "/configure",
    name: "configure",
    component: () => import(/* webpackChunkName: "configure" */ "../pages/configure"),
  },
  {
    path: "/draggable",
    name: "draggable",
    component: () => import(/* webpackChunkName: "draggable" */ "../pages/draggable"),
  },
  {
    path: "/socket",
    name: "socket",
    component: () => import(/* webpackChunkName: "socket" */ "../pages/socket"),
  },
  {
    path: "/authApiSecretKey",
    name: "authApiSecretKey",
    component: () => import(/* webpackChunkName: "authApiSecretKey" */ "../pages/authApiSecretKey"),
  },
  {
    path: "/permissao-acesso",
    name: "permissao-acesso",
    component: () => import(/* webpackChunkName: "permissao-acesso" */ "../pages/permissaoAcesso"),
  },
  {
    path: "/glass",
    name: "glass",
    component: () => import(/* webpackChunkName: "glass" */ "../pages/glassefecty"),
  },
  {
    path: "/heatmap",
    name: "heatmap",
    component: () => import(/* webpackChunkName: "heatmap" */ "../pages/heatmap"),
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../pages/pageNotFound/"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
