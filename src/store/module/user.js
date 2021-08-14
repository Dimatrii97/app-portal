import * as authApi from '@/api/user'
import * as Token from '@/utils/token'

export default {
  namespaced: true,
  state: {
    check: false,
    user: {}
  },
  getters: {
    getUserHeaderInfo(state) {
      return { img: state.user.img, name: state.user.name }
    },
    getUserRange(state) {
      return state.user.range
    },
    getUserDepartment(state) {
      return state.user.department
    },
    getUserNameIdImg(state) {
      return { id: state.user.id, img: state.user.img, name: state.user.name }
    },
    getUserId(state) {
      return state.user.id
    },
    getUserFullData(state) {
      let { img, name, department, age, position, tel } = state.user
      return {
        img,
        name,
        info: [
          { nameRu: 'Отдел', value: department },
          { nameRu: 'Специальность', value: position },
          { nameRu: 'Дата рождения', value: age },
          { nameRu: 'Телефон', value: tel }
        ]
      }
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.check = true
    }
  },
  actions: {
    async login({ commit }, payload) {
      // eslint-disable-next-line no-unused-vars
      let { data, ok } = await authApi.login(payload)
      // TODO: повесить на ok
      Token.setTokens(data.token)
      console.log(data.user)
      commit('SET_USER', data.user)
      return true
    },
    async loadCurrentUser({ commit, state }) {
      if (!state.check) {
        let { data } = await authApi.current()
        commit('SET_USER', data)
        return true
      }
    },
    async loadUsersDepartment() {
      // eslint-disable-next-line no-unused-vars
      let { data, ok } = await authApi.usersDepartment()
      if (data.res) {
        return data
      } else {
        return false
      }
    }
  }
}
