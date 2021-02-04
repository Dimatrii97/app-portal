<template>
  <div>
    <the-sidebar
      v-bind="{ size, openSidebar, taskOverlook, messagesOverLook }"
      class="sidebar"
    ></the-sidebar>
    <div class="wrap__main__content">
      <the-topbar
        :size="size"
        @input="toggleSidebar()"
        class="conteiner-max"
      ></the-topbar>
      <div class="conteiner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import theTopbar from '@/components/sidenav/topbar'
import theSidebar from '@/components/sidenav/sideNav'
import { debounce } from '@/utils/throttling'
import { mapGetters } from 'vuex'
export default {
  components: {
    theTopbar,
    theSidebar
  },
  data() {
    return {
      size: 0,
      openSidebar: false,
      messagesOverLook: 0
    }
  },
  computed: {
    ...mapGetters('tasks', { taskOverlook: 'getCountOfUnreadTasks' })
  },

  created() {
    // TODO: Подключение soket
    // this.$socket.client.query.token = getAccessToken()
    // this.$socket.client.open()
    this.$store.dispatch('user/loadCurrentUser')

    const setSize = debounce(this.setSize, 100)
    window.addEventListener('resize', setSize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', setSize)
    })

    this.$store.dispatch('tasks/loadTasks')
  },
  methods: {
    setSize() {
      this.size = +window.innerWidth
    },
    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    }
  },
  watch: {
    $route() {
      if (this.openSidebar) {
        this.openSidebar = false
      }
    }
  },

  mounted() {
    // this.$store.dispatch('messages/getSocketUserLastMess')
    // this.$store.dispatch('tasks/getTasks')
  }
}
</script>
