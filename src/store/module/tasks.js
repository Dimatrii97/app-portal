/* eslint-disable no-unused-vars */
import Vue from 'vue'
import { getJWTPayload, getAccessToken } from '../utils/JWT'
import { normalizeState } from '../utils/normalize'
export default {
  namespaced: true,
  state: {
    tasks: [],
    AdditionalTask: {}
  },
  getters: {
    getTasks: state => state.tasks,
    getFindAdditional: state => id => {
      return state.AdditionalTask[id]
    },
    getCountOfUnreadTasks: state =>
      state.tasks.filter(task => !task.scanned).length,

    getClassNameforNavList: (_, getter) =>
      getter.getCountOfUnreadTasks ? 'once-circle' : ''
  },
  mutations: {
    SET_NEW_TASK(state, newTask) {
      Vue.set(newTask, 'scanned', newTask.scanned)
      state.tasks.push(newTask)
    },
    SET_ALL_TASKS(state, allTasks) {
      state.tasks = allTasks
    },
    SET_TASK_ADDITIONAL(state, tasksAdd) {
      tasksAdd.forEach(task => {
        normalizeState(state.AdditionalTask, task, task.id)
      })
    },
    DELETE_TASK(state, idTask) {
      let ind = state.tasks.findIndex(task => task.id === idTask)
      if (ind === -1) return
      state.tasks.splice(ind, 1)
      Vue.delete(state.AdditionalTask, idTask)
    },
    UPDATE_SCANNED_TASK(state, id) {
      state.tasks.forEach(task => {
        if (task.id == id) {
          task.scanned = true
        }
      })
    },
    UPDATE_SUBTASKS(state, { idTask, idSubtasks }) {
      let subtasks = state.AdditionalTask[idTask].subtasks
      for (let i = 0; i < idSubtasks.length; i++) {
        subtasks.find(sT => sT.id === idSubtasks[i]).status = true
      }
    }
  },
  actions: {
    setTask({ state }, data) {
      this._vm.$socket.client.emit('setTasks', data)
    },
    getTasks() {
      this._vm.$socket.client.emit('getTasks')
    },
    viewedTask({ commit }, id) {
      this._vm.$socket.client.emit('updateViewedTask', id)
      commit('UPDATE_SCANNED_TASK', id)
    },
    updateSubTask({ state }, id) {
      this._vm.$socket.client.emit('updateSubTask', id)
    },
    thereAreTaskInfo({ state, dispatch }, idTask) {
      let taskIdServer = idTask.filter(id => !state.AdditionalTask[id])
      if (taskIdServer.length) {
        dispatch('getTaskById', taskIdServer)
      }
    },

    getTaskById({ state }, id) {
      this._vm.$socket.client.emit('getTaskById', id)
    },
    completeTask({ state }, id) {
      this._vm.$socket.client.emit('completeTask', id)
    },
    socket_newTasksOnline({ commit }, newTask) {
      commit('SET_NEW_TASK', newTask)
    },
    socket_getAllTasks({ commit, state, rootGetters }, allTasks) {
      for (const task of allTasks) {
        let ind = task.users.findIndex(
          task => task.id === getJWTPayload(getAccessToken()).id
        )
        if (ind === -1) return
        task.users.splice(ind, 1)
      }

      commit('SET_ALL_TASKS', allTasks)
    },
    socket_setTaskAdditional({ commit, dispatch }, addInfo) {
      commit('SET_TASK_ADDITIONAL', addInfo)
    },
    socket_updatedSubtask({ commit }, payload) {
      commit('UPDATE_SUBTASKS', payload)
    },
    socket_closeTask({ commit }, { idTask }) {
      commit('DELETE_TASK', idTask)
    }
  }
}
