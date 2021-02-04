/* eslint-disable no-unused-vars */
let promiseResolve
let promise = new Promise(resolve => {
  promiseResolve = resolve
})
export default {
  namespaced: true,
  state: {
    isAdmin: false,
    usersChek: false,
    users: [],
    department: [],
    position: []
  },

  getters: {
    isAdmin(state) {
      return state.isAdmin
    },
    readyRole() {
      return promise
    },
    getDepartment(state) {
      return state.department.map(item => item.department)
    },
    getPosition(state) {
      return state.position.map(item => item.position)
    }
  },

  mutations: {
    SET_USERS(state, users) {
      state.usersChek = true
      state.users = users
    },
    SET_DEPARTAMENT_USERS(state, department) {
      state.department = department
    },
    SET_POSITION_USERS(state, position) {
      state.position = position
    },
    SET_ADMIN(state) {
      state.isAdmin = true
      promiseResolve()
    }
  },

  actions: {
    addUser({ commit }, user) {
      this._vm.$socket.client.emit('adminNewUser', user)
    },
    getSocketAllDepartaments() {
      this._vm.$socket.client.emit('getDepartamentsUsers')
    },
    getSocketAllPosition(store, data) {
      this._vm.$socket.client.emit('getpositions', data)
    },
    addDepartment({ commit }, data) {
      this._vm.$socket.client.emit('addNewDepartment', data)
    },
    socket_allUsers({ commit }, users) {
      commit('SET_USERS', users)
    },
    socket_setDepartaments({ commit }, departament) {
      commit('SET_DEPARTAMENT_USERS', departament)
    },
    socket_setPosition({ commit }, position) {
      commit('SET_POSITION_USERS', position)
    },
    socket_setRoleAdmin({ commit }) {
      commit('SET_ADMIN')
    }
  }
}
