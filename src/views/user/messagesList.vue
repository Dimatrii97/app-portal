<template>
  <section class="page">
    <h3 class="main-title">Сообщения</h3>
    <article class="substrate">
      <v-search
        title="Пользователи"
        v-model="setSearchNameUsers"
        className="messages__search"
      />
      <ul class="messages__list" v-if="getUsersmess.length">
        <router-link
          v-for="(messageInfo, i) in getUsersmess"
          :key="i"
          :to="'/message/' + messageInfo.user_id"
          tag="li"
          class="message__link"
        >
          <user-img
            :src="{ img: messageInfo.img, name: messageInfo.name }"
            class="message__img"
          ></user-img>
          <div class="message__info">
            <div class="message__header">
              <span class="message__header-name"> {{ messageInfo.name }}</span>
              <span v-if="isMessages(messageInfo)" class="message__time">
                {{ getInterval(messageInfo.date) }}
              </span>
            </div>
            <div
              v-if="isMessages(messageInfo)"
              :class="['message__last', { check: !messageInfo.scanned }]"
            >
              <div class="message__user">
                <user-img
                  v-if="messageInfo.fromid == user.id"
                  :src="user"
                  className="sm"
                ></user-img>
                <p class="message__text">
                  {{ messageInfo.text }}
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </ul>
      <div v-else class="clearMess">
        Тут будут отоброжаться ваши сообщения
      </div>
    </article>
  </section>
</template>

<script>
import vSearch from "@/components/fields/v-search.vue";
import userImg from "@/components/Permanent/img-user";
import { hasOwnProperty } from "@/store/utils/helper";
import { mapGetters, mapState, mapMutations } from "vuex";
import { differenceInCalendarDays } from "date-fns";
import { dM } from "@/plugins/dateFilers";
export default {
  components: {
    userImg,
    vSearch
  },

  data() {
    return {
      messList: [],
      messServerList: []
    };
  },

  computed: {
    ...mapState("users", ["searchUsersName"]),
    ...mapGetters("messages", ["getUsersmess"]),
    ...mapGetters("user", { user: "getUserNameIdImg" }),
    setSearchNameUsers: {
      get() {
        return this.searchUsersName;
      },
      set(searchField) {
        this.SET_SEARCH_USERS(searchField);
        this.$store.dispatch("users/searchUsersByName", searchField);
      }
    },
    messagesAndUsers() {
      if (this.searchUsersName) {
        return this.getMessagesAndAllUsers;
      }
      return this.messUsers;
    }
  },
  methods: {
    ...mapMutations("users", ["SET_SEARCH_USERS"]),
    getInterval(date) {
      let lastMess = new Date(date);
      let difference = differenceInCalendarDays(new Date(), lastMess);
      switch (true) {
        case difference == 0: {
          return "Сегодня";
        }

        case difference == 1: {
          return "Вчера";
        }

        case difference > 30: {
          return dM(lastMess);
        }

        default:
          return difference + "д. назад";
      }
    },
    isMessages(messageObj) {
      return hasOwnProperty(messageObj, "message_id");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/pages/message";
.clearMess {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1.5rem;
  color: $title;
  transform: translate(-50%, -50%);
}
.substrate {
  position: relative;
  min-height: 450px;
}
</style>
