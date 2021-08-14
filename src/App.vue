<template>
  <div id="app">
    <component :is="getLayout"> </component>
  </div>
</template>
<script>
import userLayout from '@/layout/LayoutUser'
import adminLayout from '@/layout/LayoutAdmin'
import emptyLayout from '@/layout/LayoutEmpty'
import bodyHidden from '@/plugins/mixins/body-hidden'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      ff: []
    }
  },
  computed: {
    ...mapGetters(['isOpenSidebar']),
    getLayout() {
      let layout = this.$route.meta.layout || 'empty'
      return layout + '-layout'
    }
  },
  mixins: [bodyHidden],
  components: {
    userLayout,
    emptyLayout,
    adminLayout
  },
  watch: {
    isOpenSidebar() {
      this.bodyOverflowToggle()
    }
  }
}
</script>
<style lang="scss">
@import './assets/scss/global.scss';
</style>
