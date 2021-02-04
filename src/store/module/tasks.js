/* eslint-disable no-unused-vars */
import * as apiTask from '@/api/task.js'
import { getJWTPayload, getAccessToken } from '../utils/JWT'
import { normalizeState } from '../utils/normalize'
// TODO: можно сделать нормализе task и sub
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
      state.tasks.push(newTask)
    },
    SET_TASKS(state, allTasks) {
      state.tasks = allTasks
    },
    DELETE_TASK(state, idTask) {
      state.tasks = state.tasks.filter(task => task.id !== idTask)
    },
    // TODO: вряд-ли vue навешает observer на task obj
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
    async loadTasks({ commit }) {
      let { data, ok } = await apiTask.all()
      console.log(data, '333')
      if (data.res) {
        commit('SET_TASKS', data.tasks)
      }
    },
    async loadById({ commit }, id) {
      let { data, ok } = await apiTask.byId(id)
      if (data.res) {
        return data.task
      }
    },

    completeTask({ state }, id) {
      this._vm.$socket.client.emit('completeTask', id)
    },
    socket_newTasksOnline({ commit }, newTask) {
      commit('SET_NEW_TASK', newTask)
    },
    socket_updatedSubtask({ commit }, payload) {
      commit('UPDATE_SUBTASKS', payload)
    },
    socket_closeTask({ commit }, { idTask }) {
      commit('DELETE_TASK', idTask)
    }
  }
}
