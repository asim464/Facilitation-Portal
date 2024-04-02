import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/auth/Login.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/dashboard/Dashboard.vue"),
      meta: {
        pageTitle: "Dashboard",
        breadcrumb: [
          {
            text: "Dashboard",
            active: true,
          },
        ],
        requiresAuth: true,
      },
    },
    {
      path: "/user",
      name: "User",
      component: () => import("@/views/user/User.vue"),
      meta: {
        pageTitle: "User",
        breadcrumb: [
          {
            text: "User",
            active: true,
          },
        ],
        requiresAuth: true,
        permission: "user_show",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/Profile/Profile.vue"),
      meta: {
        pageTitle: "Profile",
        breadcrumb: [
          {
            text: "Profile",
          },
        ],
        requiresAuth: true,
      },
    },
    // {
    //   path: "/role",
    //   name: "Role",
    //   component: () => import("@/views/role/Role.vue"),
    //   meta: {
    //     pageTitle: "Role",
    //     breadcrumb: [
    //       {
    //         text: "Role",
    //         active: true,
    //       },
    //     ],
    //     requiresAuth: true,
    //     permission: "role_show",
    //   },
    // },
    {
      path: "",
      redirect: "/dashboard",
    },
    {
      path: "*",
      redirect: "/login",
    },
  ],
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
