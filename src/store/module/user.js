import * as authApi from '@/api/user'
import * as Token from '@/utils/token'
// import router from '@/router'
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
    }
  },
  actions: {
    async login({ commit }, payload) {
      // eslint-disable-next-line no-unused-vars
      let { data, ok } = await authApi.login(payload)
      // TODO: повесить на ok
      if (data.res) {
        Token.setTokens(data.token)
        commit('SET_USER', data.user)
        return true
      } else {
        return data
      }

      // if (token) {
      //   setTokens(token)
      //   commit('SET_USER', user)
      //   if (is_admin == 1) {
      //     commit('admin/SET_ADMIN', true, { root: true })
      //     router.push('/admin')
      //     return
      //   }
      //   router.push('/home')
      // }
    },
    async loadCurrentUser({ commit }) {
      // eslint-disable-next-line no-unused-vars
      let { data, ok } = await authApi.current()
      if (data.res) {
        commit('SET_USER', data.user)
        return true
      } else {
        return data
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
