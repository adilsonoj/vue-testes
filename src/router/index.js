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
        name: "Home",
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
    path: "/slide",
    name: "slide",
    component: () => import(/* webpackChunkName: "slide" */ "../pages/slide/slide"),
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
