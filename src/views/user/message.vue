<template>
  <section class="page">
    <h3 class="main-title">Личная переписка</h3>
    <article class="chat">
      <div class="chat__header">
        <User-Img :src="{ img: interlocutor.img, name: interlocutor.name }" />
        <div class="chat__header-text">
          <span>{{ interlocutor.name }}</span>
          <span @click="back()">
            <a @click.prevent href="">Назад</a>
          </span>
        </div>
      </div>
      <div ref="mesContainer" class="chat__window">
        <infinite-loading direction="top" @infinite="infiniteHandler">
          <div slot="no-more">
            Сообщений больше нет
          </div>
          <div v-if="!masseges.length" slot="no-results">
            Тут будет отоброжаться ваша переписка
          </div>
          <div v-else slot="no-results">
            Сообщений больше нет
          </div>
        </infinite-loading>
        <ul class="mess">
          <li
            :class="[classMess(mess.fromid), { check: !mess.scanned }]"
            v-for="(mess, i) in masseges"
            :key="i"
            class="mess__item"
          >
            <user-img v-if="showImg(i)" :src="genImg(mess.fromid)"></user-img>
            <span class="mess__text">{{ mess.text }}</span>
          </li>
        </ul>
      </div>
      <div class="chat__input">
        <textarea
          v-model="messText"
          @keyup.enter="sendMess"
          class="input"
          placeholder="Напишите сообщение..."
          type="text"
        ></textarea>
      </div>
    </article>
  </section>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
import UserImg from "@/components/ImgUser.vue";
import { getJWTPayload, getAccessToken } from "@/store/utils/JWT";
import { datePostgres } from "@/utils/dateType";
import { mapGetters } from "vuex";
export default {
  components: {
    InfiniteLoading,
    UserImg
  },

  data() {
    return {
      id: null,
      masseges: [],
      countMessage: 0,
      messText: ""
    };
  },

  computed: {
    ...mapGetters("user", { user: "getUserNameIdImg" }),
    interlocutor() {
      let interlocutor = this.$store.getters["users/findUserId"](
        this.$route.params.id
      );
      if (interlocutor) return interlocutor;
      this.$store.dispatch("users/getUserById", this.$route.params.id);
      return "";
    }
  },
  sockets: {
    SetNewMess(message) {
      if (
        message.toid === this.user.id &&
        message.fromid === this.$route.params.id
      ) {
        this.masseges.push(message);
        this.scrollEnd();
        this.$store.dispatch(
          "messages/updateViewedMess",
          this.$route.params.id
        );
      }
      if (
        message.toid === this.$route.params.id &&
        message.fromid === this.user.id
      ) {
        this.masseges.push(message);
        this.scrollEnd();
      }
    },
    updateAllScanned() {
      this.masseges = this.masseges.map(el => {
        el.scanned = true;
        return el;
      });
    }
  },
  mounted() {
    this.$store.dispatch("messages/updateViewedMess", this.$route.params.id);
  },

  methods: {
    infiniteHandler($state) {
      this.$http
        .post("http://localhost:5000/api/userMes/", {
          toid: this.$route.params.id,
          fromid: getJWTPayload(getAccessToken()).id,
          offset: this.countMessage
        })
        .then(mess => {
          return mess.json();
        })
        .then(mess => {
          if (mess.length) {
            this.countMessage += 15;
            this.masseges.unshift(...mess);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    sendMess() {
      if (this.messText) {
        let date = datePostgres(new Date());
        this.$store.dispatch("messages/newMessUsers", {
          fromid: this.user.id,
          toid: this.$route.params.id,
          text: this.messText,
          scanned: false,
          date
        });
        this.messText = "";
        this.scrollEnd();
      }
    },
    scrollEnd() {
      this.$nextTick(() => {
        this.$refs.mesContainer.scrollTop = this.$refs.mesContainer.scrollHeight;
      });
    },
    showImg(i) {
      if (i == 0) return true;
      if (this.masseges[i - 1].fromid === this.masseges[i].fromid) return false;
      return true;
    },
    back() {
      this.$router.push("/messagesList");
    },
    genImg(id) {
      return id == this.user.id
        ? { img: this.user.img, name: this.user.name }
        : { img: this.interlocutor.img, name: this.interlocutor.name };
    },
    classMess(fromid) {
      return fromid == this.user.id ? "mess__item_me" : "mess__item_you";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/pages/chat";
</style>
