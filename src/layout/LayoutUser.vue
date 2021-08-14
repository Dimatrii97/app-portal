<template>
  <div>
    <The-Sidebar
      v-bind="{ sizeDesktop, openSidebar, taskOverlook, messagesOverLook }"
      class="sidebar"
    />
    <div class="wrap__main__content">
      <The-Topbar
        v-bind="{ sizeDesktop, openSidebar }"
        @input="toggleSidebar()"
        class="conteiner-max"
      />
      <div class="conteiner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheTopbar from '@/components/sidenav/TheTopbar'
import TheSidebar from '@/components/sidenav/TheSidebar'
import { debounce } from '@/utils/throttling'

// import { mapGetters } from 'vuex'
// import { subscribe } from '@/websocket/websocket.js'

export default {
  name: 'LayoutUser',
  components: {
    TheSidebar,
    TheTopbar
  },
  data() {
    return {
      size: 0,
      maxWidth: 768,
      openSidebar: false,
      messagesOverLook: 0,
      taskOverlook: 0
    }
  },
  computed: {
    // ...mapGetters('tasks', { taskOverlook: 'getCountOfUnreadTasks' }),
    sizeDesktop() {
      return this.size > this.maxWidth
    }
  },

  created() {
    // TODO: Подключение soket
    // this.$socket.client.query.token = getAccessToken()
    // this.$socket.client.open();

    this.$store.dispatch('user/loadCurrentUser')
    // this.$store.dispatch('tasks/loadTasks')
    this.setSize()
    const setSize = debounce(this.setSize, 100)
    window.addEventListener('resize', setSize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', setSize)
    })
    // subscribe('good', this.hh)
  },
  methods: {
    setSize() {
      this.size = +window.innerWidth
      this.openSidebar = false
    },
    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    },
    hh() {
      console.log('222')
    }
  },
  watch: {
    $route() {
      if (this.openSidebar) {
        this.openSidebar = false
      }
    },
    openSidebar(value) {
      document.body.style.overflow = value ? 'hidden' : 'auto'
    }
  },

  mounted() {
    // this.$store.dispatch('messages/getSocketUserLastMess')
    // this.$store.dispatch('tasks/getTasks')
  }
}
</script>
