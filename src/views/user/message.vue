<template>
  <article class="chat">
    <div class="chat__header">
      <User-Img :src="interlocutor.name" />
      <div class="chat__header-text">
        <span>{{ interlocutor.name }}</span>
        <span class="chat__back" @click="back()">
          <a class="link" @click.prevent href="">Назад</a>
        </span>
      </div>
    </div>
    <div ref="mesContainer" class="chat__window">
      <Infinite-Loading direction="top" @infinite="infiniteHandler">
        <div slot="no-more">
          Сообщений больше нет
        </div>
        <div v-if="!messages.length" slot="no-results">
          Тут будет отоброжаться ваша переписка
        </div>
        <div v-else slot="no-results">
          Сообщений больше нет
        </div>
      </Infinite-Loading>
      <ul class="messages">
        <li
          v-for="(message, i) in messages"
          :class="[classMess(message.fromid), { inCheck: !message.scanned }]"
          :key="`${i}-message-${message.fromid}`"
          class="messages__item"
        >
          <User-img
            v-if="showImg(i)"
            :src="getImgMessage(message.fromid)"
          ></User-img>
          <span class="messages__text" v-html="message.text"></span>
        </li>
      </ul>
    </div>
    <div class="chat__control">
      <div class="chat__input">
        <i @click="downloadFile()" class="icon-append-file "></i>
        <Field-Contenteditable
          ref="field"
          class="chat__field"
          @input="textMess = $event.target.innerHTML"
          @keydown.enter.prevent="sendMess()"
          contenteditable="true"
          tabindex="-1"
        />

        <div class="icon-group">
          <Base-menu :top="-5" :left="25" offsetY="-100%" offsetX="-100%">
            <template #activator="{on}">
              <i v-on="on" class="icon-smile"></i>
            </template>
            <Base-smile @input="addSmile($event)"></Base-smile>
          </Base-menu>

          <i class="icon-voice"></i>
        </div>
      </div>
      <V-Btn @click="sendMess()" class="btn btn-primary icon"
        ><i class="icon-send"></i
      ></V-Btn>
    </div>
    <input ref="field-file" type="file" class="file-input" />
  </article>
</template>
<script>
import FieldContenteditable from '../../components/fields/FieldContenteditable.vue'
import BaseSmile from '../../components/base/base-smile.vue'
import BaseMenu from '../../components/base/base-menu.vue'
import InfiniteLoading from 'vue-infinite-loading'
import UserImg from '@/components/ImgUser.vue'
import * as apiMessages from '@/api/messages.js'
import * as apiUser from '@/api/user.js'
import { datePostgres } from '@/utils/dateType'
import { emit } from '@/websocket/websocket.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    InfiniteLoading,
    UserImg,
    BaseMenu,
    BaseSmile,
    FieldContenteditable
  },
  data() {
    return {
      id: null,
      messages: [],
      countMessage: 0,
      textMess: '',
      interlocutor: {}
    }
  },

  computed: {
    ...mapGetters('user', { user: 'getUserNameIdImg' })
  },
  created() {
    apiUser.getUserById(this.$route.params.id).then(el => {
      this.interlocutor = el
    })
    this.scrollEnd()
  },

  methods: {
    addSmile(smile) {
      this.textMess = this.textMess + smile
      this.$refs.field.innerHTML += smile

      let range = document.createRange()
      let sel = window.getSelection()
      this.$nextTick(() => {
        range.setStart(
          this.$refs.field.childNodes[0],
          this.$refs.field.childNodes[0].length
        )
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
        this.$refs.field.focus()
      })
    },

    downloadFile() {
      this.$refs['field-file'].click()
    },

    setNewMess(message) {
      let messUs =
        message.toid === this.user.id &&
        message.fromid === this.$route.params.id
      let messUs2 =
        message.toid === this.$route.params.id &&
        message.fromid === this.user.id

      if (messUs || messUs2) {
        this.messages.push(message)
        this.scrollEnd()
        if (this.$route.params.id === message.fromid) {
          emit('updateViewedMess', this.$route.params.id)
        }
      }
    },

    updateAllScanned() {
      this.messages = this.messages.map(el => {
        el.scanned = true
        return el
      })
    },
    infiniteHandler($state) {
      apiMessages
        .getMessages(this.$route.params.id, this.countMessage)
        .then(messages => {
          if (messages.length) {
            this.countMessage += 15

            this.messages.unshift(...messages.reverse())
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    },
    sendMess() {
      let date = datePostgres(new Date())
      const newMessage = {
        fromid: this.user.id,
        toid: this.$route.params.id,
        text: this.textMess,
        scanned: false,
        date
      }
      emit('newMessUsers', newMessage)
      this.$refs.field.innerHTML = ''
      this.scrollEnd()
    },
    async scrollEnd() {
      await this.$nextTick()
      this.$refs.mesContainer.scrollTop = this.$refs.mesContainer.scrollHeight
    },
    showImg(i) {
      if (i == 0) return true
      if (this.messages[i - 1].fromid === this.messages[i].fromid) return false
      return true
    },
    back() {
      this.$router.push('/chat')
    },
    genImg(id) {
      return id == this.user.id
        ? { img: this.user.img, name: this.user.name }
        : { img: this.interlocutor.img, name: this.interlocutor.name }
    },
    classMess(fromid) {
      return fromid == this.user.id ? 'messages__item_me' : 'messages__item_you'
    },
    getImgMessage(fromid) {
      return fromid == this.user.id ? this.user.name : this.interlocutor.name
    }
  }
}
</script>

<style lang="scss">
.inCheck {
  background-color: #518cf721;
  border-radius: 10px;
}
.file-input {
  opacity: 0;
  top: 50%;
  left: 0;
  width: 1px;
  position: absolute;
}

.chat {
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  height: 86vh;
  flex-direction: column;
  i {
    cursor: pointer;
  }
  // .chat__header
  &__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $text-dark;
    padding: 5px 0;
    // .chat__header-text
    &-text {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      padding: 0 10px;
      font-size: 1.2rem;
      color: rgb(110, 110, 110);
    }
  }
  // .chat__back
  &__back {
    .link {
      font-size: 1.2rem;
      color: $title;
    }
  }

  // .chat__window
  &__window {
    flex: 1;
    margin: 10px 0;
    overflow: auto;
    border-radius: 10px;
    padding: 10px 5px;
    @include _480 {
      height: calc(100vh - 198px);
    }
  }

  // chat__control
  &__control {
    display: flex;
    gap: 1rem;
    .icon-group {
      font-size: 1.6rem;
      color: rgb(119, 119, 119);
      display: flex;
      i:first-child {
        margin-right: 10px;
      }
    }
  }

  // .chat__input
  &__input {
    flex: 1;
    border: 1px solid $default;
    border-radius: 20px;
    padding: 5px 5px;
    display: flex;
    align-items: center;
    .icon-append-file {
      margin-right: 5px;
      font-size: 1.6rem;
      color: rgb(119, 119, 119);
    }
  }
  // .chat__field
  &__field {
    padding: 3px 0;
    max-height: 100px;
    flex: 1;
    font-size: 1.2rem;
    outline: none;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border: 1px solid rgba(0, 0, 0, 0.424);
      border-radius: 3px;
      padding: 10px 0;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.568);
      border-radius: 2px;
    }
  }
}

.messages {
  // .messages__item
  &__item {
    display: flex;
    align-items: center;
    transition: 0.5s;
    &_you {
      &.img {
        margin-right: 15px;
      }
    }
    &_me {
      flex-direction: row-reverse;
      &.img {
        margin-left: 15px;
      }
    }
  }
  // .messages__text
  &__text {
    padding: 15px 10px;
    border-radius: 10px;
    background-color: $bg-gray;
    margin: 5px 0;
    max-width: calc(50% - 20px);
    word-wrap: break-word;
    color: $text-dark;
    @include _480 {
      max-width: 100%;
    }
  }
}
</style>
