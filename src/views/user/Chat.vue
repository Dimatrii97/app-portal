<template>
  <section class="page">
    <h3 class="main-title">{{ this.$route.meta.title }}</h3>
    <div class="chat-content">
      <article :class="[{ aside: main }, 'substrate']">
        <V-Search
          v-if="!main"
          v-model="setSearchNameUsers"
          title="Пользователи"
          className="messages__search"
        />
        <ul class="messages__list" v-if="userMapping.length">
          <li v-for="(message, i) in userMapping" :key="i">
            <Message-Item :message="message" :main="main">
              <User-Img
                v-if="message.fromid === user.id"
                :src="user.name"
                class="sm"
              />
            </Message-Item>
          </li>
        </ul>
        <div v-else class="clearMess">
          Тут будут отоброжаться ваши сообщения
        </div>
      </article>
      <router-view :key="$route.fullPath" ref="messages"></router-view>
    </div>
  </section>
</template>

<script>
import MessageItem from '../../components/messages/message-item.vue'
import VSearch from '@/components/fields/FieldSearch.vue'
import UserImg from '@/components/ImgUser.vue'
import { hasOwnProperty } from '@/store/utils/helper'
import { saveUniqBy } from '@/utils/loadash'
import * as apiMessages from '@/api/messages.js'
import { emit, subscribe, unsubscribe } from '@/websocket/websocket.js'

import { mapGetters } from 'vuex'
export default {
  name: 'Messages-List',
  components: {
    VSearch,
    MessageItem,
    UserImg
  },
  props: {
    main: Boolean
  },

  data() {
    return {
      saveUniqBy: [],
      messList: [],
      messagesList: [],
      messServerList: [],
      text: ''
    }
  },

  computed: {
    ...mapGetters('user', { user: 'getUserNameIdImg' }),
    setSearchNameUsers: {
      get() {
        return this.text
      },
      set(search) {
        emit('searchUsersByName', search), (this.text = search)
      }
    },
    userMapping() {
      if (this.text) {
        return saveUniqBy(this.messagesList, this.searchList, 'id')
      } else {
        return this.messagesList
      }
    },
    messagesAndUsers() {
      if (this.searchUsersName) {
        return this.getMessagesAndAllUsers
      }
      return this.messUsers
    }
  },
  async created() {
    console.log(this.$route)
    this.messagesList = await apiMessages.last()
  },
  mounted() {
    subscribe('searchUsers', this.searchUsersName)
    if (this.$refs.messages) {
      subscribe('SetNewMess', this.$refs.messages.setNewMess)
      subscribe('updateAllScanned', this.$refs.messages.updateAllScanned)
      emit('updateViewedMess', this.$route.params.id)
      this.$once('hook:beforeDestroy', function() {
        unsubscribe('SetNewMess', this.setNewMess)
        unsubscribe('updateAllScanned', this.updateAllScanned)
      })
    }
    this.$once('hook:beforeDestroy', function() {
      unsubscribe('searchUsers', this.searchUsersName)
    })
  },
  methods: {
    isMessages(messageObj) {
      return hasOwnProperty(messageObj, 'message_id')
    },
    searchUsersName(users) {
      this.searchList = users
    }
    // searchUsersByName
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/pages/message';

.message__last.check {
  background-color: #518cf721;
  border-radius: 5px;
  color: $text-dark;
}

.messages {
  // .messages__search
  &__search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0 15px 0;
    font-size: 1.4rem;
    input {
      border: none;
      background-color: transparent;
      font-size: 1.2rem;
      flex-grow: 1;
    }
  }
}

.chat-content {
  display: flex;
  gap: 20px;
  .chat {
    flex: 2;
  }
}
.clearMess {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: calc(0.8rem + 6 * (100vw - 200px) / 880);
  color: $title;
  transform: translate(-50%, -50%);
}

.substrate {
  position: relative;
  min-height: 450px;
  flex: 1;
}
@include _979 {
  .aside.substrate {
    flex: 0;
  }
}
</style>
