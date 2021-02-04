<template>
  <div id="app">
    <component :is="getLayout"> </component>
  </div>
</template>
<script>
import userLayout from '@/layout/userLayout'
import adminLayout from '@/layout/adminLayout'
import emptyLayout from '@/layout/empty'
import bodyHidden from '@/plugins/mixins/body-hidden'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isOpenSidebar']),
    getLayout() {
      return this.$route.meta.layout + '-layout'
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
