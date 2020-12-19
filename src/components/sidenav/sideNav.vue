<template>
  <aside :class="[{ active: this.isOpenSidebar }, 'sideBar']">
    <nav class="sideBar__navigation">
      <ul class="nav-list">
        <li class="nav-list__item">
          <V-Search title="Web Portal" className="nav-list__search" />
        </li>
        <li
          v-for="(navItem, i) in navlist"
          :key="i"
          @click="navClick(navItem.event)"
          class="nav-list__item"
        >
          <router-link :to="navItem.to" class="nav-list__link">
            <span
              :class="['nav-list__icon', navItem.className]"
              :data-count="navItem.dataAttribute"
            >
              <i :class="'icon-' + navItem.icon"></i>
            </span>
            <span class="nav-list__title">
              {{ navItem.ruName }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
import VSearch from "@/components/fields/FieldSearch.vue";
import { mapGetters, mapMutations } from "vuex";
import { cleanTokensData } from "@/store/utils/JWT";
export default {
  components: { VSearch },
  computed: {
    ...mapGetters(["isOpenSidebar"]),
    ...mapGetters("mapList", { navlist: "getNavlist" })
  },
  watch: {
    $route() {
      if (this.isOpenSidebar) {
        this.SET_SIDEBAR_OPEN(false);
      }
    }
  },

  methods: {
    ...mapMutations(["SET_SIDEBAR_OPEN"]),
    navClick(event) {
      if (event) this[event]();
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

<style lang="scss" scoped>
@import "@/assets/pages/userLayout";
</style>
