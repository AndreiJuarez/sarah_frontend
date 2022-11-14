<script>
export default {
  name: "App",
  data: function () {
    return {
    };
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ path: `/` })
    }
  }
};
</script>

<template>
  <RouterView />
</template>

<style>

</style>
