/* eslint-disable no-constant-condition */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
Vue.use(VueRouter);
import { getAccessToken } from "@/store/utils/JWT";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/user/login.vue"),
    meta: {
      layout: "empty",
      guest: true
    },
    beforeEnter: function(_, __, next) {
      if (getAccessToken() === null) {
        next();
      } else {
        next({ name: "home" });
      }
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/user/home.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/user/calendar.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/messagesList",
    name: "messagesList",
    component: () => import("../views/user/messagesList.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/message/:id",
    component: () => import("../views/user/message.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/newTasks",
    name: "newTasks",
    component: () => import("../views/user/newTasks.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/docs",
    name: "docs",
    component: () => import("../views/user/docs.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/admin/",
    name: "admin",
    component: () => import("../views/admin/admin.vue"),
    meta: {
      layout: "admin",
      requiresAuth: true
    },
    beforeEnter: async function(_, __, next) {
      Vue.prototype.$socket.client.query.token = getAccessToken();
      Vue.prototype.$socket.client.open();
      await store.getters["admin/readyRole"];
      if (store.getters["admin/isAdmin"]) {
        next();
      } else {
        next({ name: "login" });
      }
    }
  },
  {
    path: "/profile",
    component: () => import("../views/user/profile.vue"),
    meta: {
      layout: "user",
      requiresAuth: true
    }
  },
  {
    path: "/*",
    name: "all",
    component: () => import("../views/user/login.vue"),
    meta: {
      layout: "empty"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getAccessToken() === null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
