/* eslint-disable no-unused-vars */
import uniqBy from "lodash.uniqby";
import Vue from "vue";
import { normalizeState } from "../utils/normalize";
import { hasOwnProperty } from "../utils/helper";

export default {
  namespaced: true,
  state: {
    newMess: false,
    lastMessages: {}
  },

  getters: {
    sortUserMessage: (state, _, __, rootGetters) => users => {
      return users
        .map(user => ({
          ...state.lastMessages[user.user_id],
          ...user
        }))
        .sort((a, b) => b.message_id - a.message_id);
    },
    UsersMessagesId: (_, getters, __, rootGetters) => {
      return rootGetters["users/findUsersByNameId"](
        getters.lastMessagesIdArray
      );
    },
    getUsersmess: (_, getters, __, rootGetters) => {
      let usersAndMessages = getters.sortUserMessage(getters.UsersMessagesId);
      let foundUsers = rootGetters["users/usersFromServer"];
      return foundUsers.length
        ? uniqBy([...usersAndMessages, ...foundUsers], "user_id")
        : usersAndMessages;
    },

    countOfUnreadMessages(state, getter, __, rootGetters) {
      let total = getter.lastMessagesArray.filter(
        el => el.toid == rootGetters["user/getUserId"] && !el.scanned
      ).length;
      if (total > 0) return total;
    },

    getClassNameforNavList(state, getter) {
      return getter.countOfUnreadMessages ? "once-circle" : "";
    },
    lastMessagesIdArray(state) {
      return Object.keys(state.lastMessages);
    },

    lastMessagesArray(state) {
      return Object.values(state.lastMessages);
    }
  },

  mutations: {
    SET_LAST_MESSAGES(state, lastMessagesUser) {
      lastMessagesUser.forEach(({ id: UserId, mess }) => {
        normalizeState(state.lastMessages, mess, UserId, "message_id");
      });
    },
    UPDATE_LAST_MESS(state, { message, id }) {
      Vue.set(state.lastMessages, id, message);
    },
    UPDATE_LOCAL_VIEWED_MESS(state, id) {
      if (state.lastMessages[id].toid !== id)
        state.lastMessages[id].scanned = true;
    },
    UPDATE_LOCAL_VIEWED_MESS_OF_SOCKET(state, id) {
      state.lastMessages[id].scanned = true;
    }
  },

  actions: {
    updateViewedMess({ state, commit, rootGetters }, id) {
      if (
        state.lastMessages[id] &&
        state.lastMessages[id].toid === rootGetters["user/getUserId"]
      ) {
        this._vm.$socket.client.emit("updateViewedMess", id);
      }
    },
    getSocketUserLastMess() {
      this._vm.$socket.client.emit("getUserLastMess");
    },
    newMessUsers({ commit, state }, body) {
      this._vm.$socket.client.emit("newMessUsers", body);
    },
    socket_setUserLastMess({ commit }, UserLastMess) {
      commit("SET_LAST_MESSAGES", UserLastMess);
      commit(
        "users/SET_USERS",
        UserLastMess.map(userMess => {
          let { mess, ...user } = userMess;
          return user;
        }),
        { root: true }
      );
    },
    socket_setNewMess({ commit, dispatch, rootState, rootGetters }, message) {
      console.log("Получение нового сообщения");
      let idCurrentUser = rootGetters["user/getUserId"];
      let nameNewLastMessage =
        idCurrentUser === message.fromid ? message.toid : message.fromid;
      console.log(!hasOwnProperty(rootState.users.users, nameNewLastMessage));
      if (!hasOwnProperty(rootState.users.users, nameNewLastMessage)) {
        console.log("рефреш всех последних сообщений");
        this._vm.$socket.client.emit("getUserLastMess");
      } else {
        console.log("else update");
        commit("UPDATE_LAST_MESS", { message, id: nameNewLastMessage });
      }
    },
    socket_updateScanned({ commit, state }, id) {
      commit("UPDATE_LOCAL_VIEWED_MESS_OF_SOCKET", id);
    }
  }
};
