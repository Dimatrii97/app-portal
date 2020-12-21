<template>
  <div class="top-bar">
    <div class="top-bar__logo logo">
      <figure class="logo__img">
        <img src="@/assets/img/logo.png" alt="" />
      </figure>
      <V-Search title="Web Portal" className="top-bar__search" />
    </div>

    <div class="top-bar__list" v-if="isSizeDesktop">
      <div class="top-bar__time">
        <h3 class="topBar__time">{{ getTime | localRuHMDM }}</h3>
      </div>
      <div
        @mouseout="setShowProfile(false)"
        @mouseover="setShowProfile(true)"
        class="top-bar__profile profile"
      >
        <i class="icon-user"></i>
        <transition name="menu-up">
          <nav v-if="profileNav" class="profile__nav">
            <ul class="profile__list">
              <router-link class="profile__item" to="/profile" tag="li">
                <div class="profile__img">
                  <User-Img
                    class="profile__img"
                    className="sm"
                    :src="{ img: user.img, name: user.name }"
                  ></User-Img>
                </div>
                <a class="profile__link" href="">Профиль</a>
              </router-link>
              <router-link class="profile__item" to="/home" tag="li">
                <a class="profile__link" href="">Помощь</a>
              </router-link>
              <li class="profile__item" @click="outUser()">
                <a class="profile__link" href="">Выйти</a>
              </li>
            </ul>
          </nav>
        </transition>
      </div>
    </div>
    <div v-else class="nav__toggle">
      <button type="button" class="nav__toggle__button">
        <div
          @click="isShowSideNav()"
          :class="['menu-btn', { open: isOpenSidebar }]"
        >
          <div class="menu-btn__burger"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import VSearch from "@/components/fields/FieldSearch.vue";
import UserImg from "@/components/ImgUser.vue";
import { mapGetters, mapMutations } from "vuex";
import { cleanTokensData } from "@/store/utils/JWT";
import { debounce } from "@/utils/throttling";
export default {
  components: {
    UserImg,
    VSearch
  },

  data() {
    return {
      date: null,
      resizeTimer: null,
      profileNav: false
    };
  },

  computed: {
    ...mapGetters("user", { user: "getUserHeaderInfo" }),
    ...mapGetters(["isSizeDesktop", "isOpenSidebar", "getTime"]),
    resizeDebounce() {
      return debounce(this.setSize, 100);
    },
    mouseDebounce() {
      return debounce(params => (this.profileNav = params), 400);
    }
  },

  created() {
    this.$store.dispatch("user/getUser");
    this.setSize();
    window.addEventListener("resize", this.resizeDebounce);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeDebounce);
  },

  methods: {
    ...mapMutations(["SET_SIDEBAR_OPEN"]),

    isShowSideNav() {
      this.SET_SIDEBAR_OPEN(!this.isOpenSidebar);
    },
    setShowProfile(params) {
      this.mouseDebounce(params);
    },

    setSize() {
      this.$store.dispatch("setSize", +window.innerWidth);
    },
    outUser() {
      cleanTokensData();
      this.$socket.disconnected;
      this.$router.push("/login").then(() => {
        document.location.reload();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/pages/userLayout";
.menu-up-enter-active,
.menu-up-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}
.menu-up-enter,
.menu-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
