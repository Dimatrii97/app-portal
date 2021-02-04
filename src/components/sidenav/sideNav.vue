<template>
  <aside :class="[{ active: this.openSidebar }, 'sideBar']">
    <nav class="sideBar__navigation">
      <ul class="nav-list">
        <li class="nav-list__item">
          <V-Search title="Web Portal" className="nav-list__search" />
        </li>
        <li v-for="(navItem, i) in getnavlist" :key="i" class="nav-list__item">
          <router-link :to="navItem.to" class="nav-list__link">
            <span
              :class="['nav-list__icon', navItem.className]"
              :data-count="navItem.countNotification || ''"
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
import VSearch from '@/components/fields/FieldSearch.vue'
import { navlist, phone } from './navigarions'
export default {
  components: { VSearch },
  props: {
    size: Number,
    openSidebar: Boolean,
    taskOverlook: Number,
    messagesOverlook: Number
  },
  data() {
    return {
      navlist,
      phone
    }
  },
  computed: {
    getnavlist() {
      return this.size > 600 ? this.navlist : { ...this.navlist, ...this.phone }
    }
  },
  watch: {
    taskOverlook(value) {
      navlist.taskList.countNotification = value
    },
    messagesOverlook(value) {
      navlist.messages.countNotification = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/pages/userLayout';
</style>
