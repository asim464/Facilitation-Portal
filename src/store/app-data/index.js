import axiosIns from "@/libs/axios";

export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: null,
    navMenuItems: [],
  },
  getters: {
    getLoggedInUser: (state) => {
      return state.user;
    },
    hasPermission: (state) => (name) => {
      if (state.user) {
        return state.user.permissions.hasOwnProperty(name);
      }
      return false;
    },
    hasRole: (state) => (name) => {
      if (state.user.role_data.code_name === name) {
        return true;
      }
      return false;
    },
    isLoggedIn: (state) => state.isLoggedIn,
    getNavMenuItems: (state) => state.navMenuItems,
  },
  mutations: {
    login(state, data) {
      state.isLoggedIn = true;
      state.user = data.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUser(state, data) {
      state.user = data.user;
    },
    setNavMenuItems(state) {
      state.navMenuItems = [];

      if (state.user.permissions.hasOwnProperty("dashboard_show")) {
        state.navMenuItems.push({
          title: "Dashboard",
          route: "Dashboard",
          icon: "HomeIcon",
        });
      }

      if (state.user.permissions.hasOwnProperty("user_show")) {
        state.navMenuItems.push({
          title: "User",
          icon: "UserIcon",
          route: "User",
        });
      }

      // if (state.user.permissions.hasOwnProperty("role_show")) {
      //   state.navMenuItems.push({
      //     title: "Role",
      //     icon: "UsersIcon",
      //     route: "Role",
      //   });
      // }
    },
  },
  actions: {
    async login({ commit }, payload) {
      const res = await axiosIns.post("login", payload);
      if (res.status === 200) {
        commit("login", res.data);
        commit("setNavMenuItems");
      }
      return res;
    },
    async logout({ commit }) {
      const res = await axiosIns.post("logout");
      if (res.status === 204) {
        commit("logout");
      }
      return res;
    },
    async getCurrentUser({ commit }) {
      const res = await axiosIns.get("current");
      if (res.status === 200) {
        commit("login", res.data);
        commit("setNavMenuItems");
      }
    },
    async updateCurrentUser({ commit }) {
      const res = await axiosIns.get("current");
      if (res.status === 200) {
        commit("setUser", res.data);
      }
    },
    async uploadPetitionApplicationData({ commit }, payload) {
      const res = await axiosIns.post("uploadPetitionApplicationData", payload);
      return res;
    },
    async downloadPetitionApplicationData({ commit }) {
      const res = await axiosIns.get("downloadPetitionApplicationData");
      return res;
    },
    async getRoles({ commit }, { pageNumber }) {
      const res = await axiosIns.get(`roles/?page=${pageNumber}`);
      return res;
    },
    async updateProfile({ commit }, payload) {
      const pk = payload.pk;
      delete payload.pk;
      const res = await axiosIns.patch(`profile/${pk}`, payload);
      return res;
    },
    async changePassword({ commit }, payload) {
      const res = await axiosIns.post("changepassword", payload);
      return res;
    },
    async getRole({ commit }, { pk }) {
      const res = await axiosIns.get(`roles/${pk}/`);
      return res;
    },
    async createRole({ commit }, payload) {
      const res = await axiosIns.post("roles/", payload);
      return res;
    },
    async updateRole({ commit }, { payload, pk }) {
      const res = await axiosIns.put(`roles/${pk}/`, payload);
      return res;
    },
    async deleteRole({ commit }, { pk }) {
      const res = await axiosIns.delete(`roles/${pk}/`);
      return res;
    },
    async getPermissions({ commit }) {
      const res = await axiosIns.get("permissions");
      return res;
    },
    async getUser({ commit }, { pk }) {
      const res = await axiosIns.get(`users/${pk}/`);
      return res;
    },
    async getUsers({ commit }, { pageNumber, organization }) {
      let url = `users/?page=${pageNumber}`;
      if (organization) {
        url += `&organization=${organization}`;
      }
      const res = await axiosIns.get(url);
      return res;
    },
    async getUsersUnPaginated({ commit }, { organization }) {
      let url = `users-unpaginated/`;
      if (organization) {
        url += `?organization=${organization}`;
      }
      const res = await axiosIns.get(url);
      return res;
    },
    async updateUser({ commit }, { payload, pk }) {
      const res = await axiosIns.patch(`users/${pk}/`, payload);
      return res;
    },
    async getOrganizations({ commit }, { pageNumber }) {
      const res = await axiosIns.get(`organizations/?page=${pageNumber}`);
      return res;
    },
    async getOrganization({ commit }, { pk }) {
      const res = await axiosIns.get(`organizations/${pk}/`);
      return res;
    },
    async getDashboardData({ commit }) {
      const res = await axiosIns.get(`dashboard-data`);
      return res;
    },
  },
};
