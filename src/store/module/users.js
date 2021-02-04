/* eslint-disable no-unused-vars */
import { normalizeState } from '../utils/normalize'
import { checkForStrMatching, findLocalUsersByIdName } from '../utils/helper'
export default {
  namespaced: true,
  state: {
    users: {},
    searchUsersName: '',
    idUsersSearchServer: []
  },
  getters: {
    getRangeLevelUsers: (_, getters, __, rootGetters) => {
      return getters.getUsersFromMyDepartment.filter(
        user => user.range <= rootGetters['user/getUserRange']
      )
    },
    getUsersFromMyDepartment: (_, getters, __, rootGetters) => {
      return getters.usersArray.filter(
        user => user.department === rootGetters['user/getUserDepartment']
      )
    },
    findUserId: state => id => {
      if (Array.isArray(id)) {
        return id.map(id => state.users[id]).filter(el => el)
      } else return state.users[id]
    },
    findUsersByNameId: state => id => {
      if (Array.isArray(id)) {
        return findLocalUsersByIdName(id, state.searchUsersName, state.users)
      } else {
        if (checkForStrMatching(state.users[id].name, state.searchUsersName))
          return state.users[id]
      }
    },
    usersFromServer: state => {
      return state.searchUsersName
        ? state.idUsersSearchServer.map(id => state.users[id])
        : []
    },

    usersArray(state) {
      return Object.values(state.users)
    }
  },
  mutations: {
    SET_USERS(state, users) {
      Array.isArray(users)
        ? users.forEach(user => {
            normalizeState(state.users, user, user.id, 'user_id')
          })
        : normalizeState(state.users, users, users.id, 'user_id')
    },
    SET_SEARCH_USERS(state, name) {
      state.searchUsersName = name
    },
    SET_ID_USERS_FOUND(state, idUsers) {
      state.idUsersSearchServer = idUsers
    }
  },
  actions: {
    getUsersDepartment({ state }, data) {
      this._vm.$socket.client.emit('getUsersDepartment')
    },
    getUserById({ state }, id) {
      this._vm.$socket.client.emit('getUserById', id)
    },
    thereAreUsers({ state, dispatch }, id) {
      if (Array.isArray(id)) {
        let userId = id.filter(id => !state.users[id])
        if (userId.length) {
          dispatch('getUserById', userId)
        }
      } else if (!state.users[id]) dispatch('getUserById', id)
    },
    searchUsersByName({ commit }, name) {
      this._vm.$socket.client.emit('searchUsersByName', name)
    },
    socket_currentUsers({ commit }, users) {
      commit('SET_USERS', users)
    },
    socket_searchUsers({ commit, dispatch }, users) {
      if (users.length) {
        commit(
          'SET_ID_USERS_FOUND',
          users.map(el => el.id)
        )
        commit('SET_USERS', users)
      } else {
        dispatch('searchUsersByName', '')
      }
    }
  }
}
