<template>
  <div id="app">
    <component :is="getLayout"> </component>
  </div>
</template>
<script>
import userLayout from "@/layout/userLayout";
import adminLayout from "@/layout/adminLayout";
import emptyLayout from "@/layout/empty";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isOpenSidebar"]),
    getLayout() {
      return this.$route.meta.layout + "-layout";
    }
  },
  components: {
    userLayout,
    emptyLayout,
    adminLayout
  },
  watch: {
    isOpenSidebar(newValue) {
      let body = document.querySelector("body");
      if (!newValue) {
        body.style = "overflow:auto;";
      } else body.style = "overflow:hidden;";
    }
  }
};
</script>
<style lang="scss">
@import "./assets/scss/global.scss";
</style>
