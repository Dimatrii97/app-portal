<template>
  <section class="page">
    <the-create-department></the-create-department>
    <the-create-user></the-create-user>
  </section>
</template>

<script>
import theCreateDepartment from "@/components/admin/createDepartment";
import theCreateUser from "@/components/admin/createUser";
export default {
  components: {
    theCreateDepartment,
    theCreateUser
  }
};
</script>

<style></style>
