/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
// import tasks from './module/tasks'
import user from './module/user'
// import users from './module/users'
// import admin from './module/admin'
import docs from './module/docs'
import mapList from './module/mapList'

Vue.use(Vuex)

let news
export default new Vuex.Store({
  state: {
    maxWidth: 600,
    navbarSnow: false,
    sizeDesktop: true,
    size: null,
    interval: null,
    time: null
  },
  getters: {
    isShowNavbar: state => state.navbarSnow,
    isSizeDesktop(state) {
      return state.size > 768
    },
    getNews: state => state.news,
    isOpenSidebar: state => state.navbarSnow,
    getTime: state => state.time,
    getSize: state => state.size
  },
  mutations: {
    SET_SIZE(state, params) {
      state.size = params
    },
    SET_SIDEBAR_OPEN(state, params) {
      state.navbarSnow = params
    },
    // SET_TIME(state) {
    //   state.time = new Date()
    // },
    // SET_INTERVAL(state) {
    //   state.interval = setInterval(() => {
    //     this.commit('SET_TIME')
    //   }, 1000)
    // },
    DELETE_INTERVAL(state) {
      if (state.interval) {
        clearInterval(state.interval)
        state.time = null
      }
    }
  },
  actions: {
    setSize({ commit, getters, state, dispatch }, value) {
      commit('SET_SIZE', value)
      commit('SET_SIDEBAR_OPEN', false)
      commit('DELETE_INTERVAL')
      if (getters.isSizeDesktop) {
        commit('SET_INTERVAL')
      }
    }
  },
  modules: { user, mapList, docs }
})
