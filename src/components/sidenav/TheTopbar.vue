<template>
  <div class="top-bar">
    <div class="top-bar__logo logo">
      <V-img :src="logo" class="logo__img" alt="logo" />
      <V-Search title="Web Portal" className="top-bar__search" />
    </div>
    <div class="top-bar__list" v-if="sizeDesktop">
      <div class="top-bar__profile profile">
        <V-menu bottom right offsetY="calc(100% + 10px)">
          <template #activator="{on}">
            <div v-on="on" class="profile__link">
              <span class="profile__name">{{ userFirstname }}</span>
              <User-Img class="profile__img sm" :src="user.name" />
              <span class="icon-container">
                <i class="icon-arrow-bottom"> </i>
              </span>
            </div>
          </template>
          <nav class="profile__nav">
            <ul class="profile__list">
              <router-link class="profile__item" to="/profile" tag="li">
                <div class="profile__img">
                  <User-Img class="profile__img sm" :src="user.name"></User-Img>
                </div>
                <a class="profile__link" href="">Профиль</a>
              </router-link>
              <router-link class="profile__item" to="/home" tag="li">
                <a class="profile__link" href="">Помощь</a>
              </router-link>
              <router-link class="profile__item" to="/" tag="li">
                <a class="profile__link" href="">Выйти</a>
              </router-link>
            </ul>
          </nav>
        </V-menu>
      </div>
    </div>
    <div v-else class="nav__toggle">
      <Burger-Menu :value="openSidebar" @change="$emit('input')" />
    </div>
  </div>
</template>

<script>
import VImg from '@/components/base/base-img'
import logo from '@/assets/img/logo.png'
import BurgerMenu from '@/components/controls/burger-menu.vue'
import VSearch from '@/components/fields/FieldSearch.vue'
import VMenu from '@/components/base/base-menu.vue'
import UserImg from '@/components/ImgUser.vue'
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/throttling'
export default {
  name: 'V-Topbar',
  components: {
    UserImg,
    VSearch,
    VMenu,
    BurgerMenu,
    VImg
  },
  props: {
    sizeDesktop: Boolean,
    openSidebar: Boolean
  },
  data() {
    return {
      logo,
      profileNav: false
    }
  },

  computed: {
    ...mapGetters('user', { user: 'getUserHeaderInfo' }),
    mouseDebounce() {
      return debounce(params => (this.profileNav = params), 400)
    },
    userFirstname() {
      return this.user.name ? this.user.name.split(' ')[0] : ''
    }
  },

  methods: {
    setShowProfile(params) {
      this.mouseDebounce(params)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/pages/userLayout';

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__logo,
  &__time {
    font-size: 1.4rem;
    color: $title;
    line-height: 51px;
  }
  &__search,
  &__list,
  &__logo {
    display: flex;
    align-items: center;
  }

  @include _768 {
    &__items {
      display: none;
    }
  }
  @include _979 {
    &__search {
      width: 200px;
    }
  }
}

.profile {
  position: relative;

  //.profile__name
  &__name {
    margin-right: 10px;
  }
  &__name,
  .icon-container {
    font-size: 1.3rem;
    color: $title;
  }
  //.profile__nav
  .profile__nav {
    background-color: #fff;
    padding: 5px 10px;
  }

  // .profile__item
  &__item {
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    color: $default;
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      .profile__link {
        color: $text-dark;
      }
      background-color: $bg-gray;
    }
  }
  // .profile__link
  &__link {
    color: $default;
    display: flex;
    align-items: center;
  }
  //.profile__img
  &__img {
    margin-right: 10px;
  }
}

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
