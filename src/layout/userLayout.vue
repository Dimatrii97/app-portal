<template>
  <div>
    <the-sidebar class="sidebar"></the-sidebar>
    <div class="wrap__main__content">
      <the-topbar class="conteiner-max"></the-topbar>
      <div class="conteiner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import theTopbar from "@/components/sidenav/topbar";
import theSidebar from "@/components/sidenav/sideNav";
import { getAccessToken } from "@/store/utils/JWT";
export default {
  components: {
    theTopbar,
    theSidebar
  },

  created() {
    this.$socket.client.query.token = getAccessToken();
    this.$socket.client.open();
  },

  mounted() {
    this.$store.dispatch("messages/getSocketUserLastMess");
    this.$store.dispatch("tasks/getTasks");
  }
};
</script>
