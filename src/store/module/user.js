import * as authApi from "@/api/user";
import { setTokens } from "@/store/utils/JWT";
import router from "@/router";
export default {
  namespaced: true,
  state: {
    check: false,
    user: {}
  },
  getters: {
    getUserHeaderInfo(state) {
      return { img: state.user.img, name: state.user.name };
    },
    getUserRange(state) {
      return state.user.range;
    },
    getUserDepartment(state) {
      return state.user.department;
    },
    getUserNameIdImg(state) {
      return { id: state.user.id, img: state.user.img, name: state.user.name };
    },
    getUserId(state) {
      return state.user.id;
    },
    getUserFullData(state) {
      let { img, name, department, age, position, tel } = state.user;
      return {
        img,
        name,
        info: [
          { nameRu: "Отдел", value: department },
          { nameRu: "Специальность", value: position },
          { nameRu: "Дата рождения", value: age },
          { nameRu: "Телефон", value: tel }
        ]
      };
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, payload) {
      let { token, user, is_admin } = await authApi.login(payload);
      if (token) {
        setTokens(token);
        commit("SET_USER", user);
        if (is_admin == 1) {
          commit("admin/SET_ADMIN", true, { root: true });
          router.push("/admin");
          return;
        }
        router.push("/home");
      }
    },
    getUser() {
      this._vm.$socket.client.emit("getUser");
    },
    socket_currentUser({ commit }, user) {
      commit("SET_USER", user);
    }
  }
};
